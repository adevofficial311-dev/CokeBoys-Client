import { config } from '../config/env.js';
import { XMLParser } from 'fast-xml-parser';

export interface VideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  videoUrl: string;
  description?: string;
}

const DEFAULT_CHANNEL_ID = 'UCQkZM4HnzC6PJOs7WQZwAEA';
const CACHE_DURATION = 5 * 60 * 1000;
let cachedVideos: VideoItem[] = [];
let cachedAt = 0;

function getChannelRssUrl(): string {
  const channelId = config.youtubeChannelId?.trim() || DEFAULT_CHANNEL_ID;
  return `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
}

async function fetchFromYouTubeRSS(): Promise<VideoItem[]> {
  const rssUrl = getChannelRssUrl();
  console.log(`[YouTube] Fetching RSS feed: ${rssUrl}`);
  
  const response = await fetch(rssUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Accept': 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8'
    }
  });

  if (!response.ok) {
    throw new Error(`YouTube RSS feed returned HTTP ${response.status}`);
  }

  const xmlData = await response.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_"
  });
  const parsed = parser.parse(xmlData);

  const entries = parsed.feed?.entry;
  if (!entries) {
    throw new Error('No entries found in YouTube RSS feed.');
  }

  const items = Array.isArray(entries) ? entries : [entries];
  const videos: VideoItem[] = items.map((item: any) => {
    const videoId = item["yt:videoId"];
    return {
      id: videoId,
      title: item.title,
      thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      publishedAt: item.published || new Date().toISOString(),
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      description: item["media:group"]?.["media:description"] || ""
    };
  });

  const latestVideos = videos.slice(0, 12);
  
  if (latestVideos.length === 0) {
    throw new Error('No videos were found in YouTube page data.');
  }

  console.log(`[YouTube] Loaded ${latestVideos.length} videos from RSS.`);
  return latestVideos;
}

export async function fetchChannelVideos(): Promise<{
  videos: VideoItem[];
  source: 'page' | 'cache' | 'fallback' | 'rss';
  lastUpdated: string;
}> {
  const now = Date.now();

  if (cachedVideos.length > 0 && now - cachedAt < CACHE_DURATION) {
    return {
      videos: cachedVideos,
      source: 'cache',
      lastUpdated: new Date(cachedAt).toISOString(),
    };
  }

  try {
    const videos = await fetchFromYouTubeRSS();
    cachedVideos = videos;
    cachedAt = Date.now();
    return {
      videos,
      source: 'rss',
      lastUpdated: new Date(cachedAt).toISOString(),
    };
  } catch (error) {
    console.error('[YouTube] Fetch failed:', error);
    if (cachedVideos.length > 0) {
      return {
        videos: cachedVideos,
        source: 'cache',
        lastUpdated: new Date(cachedAt).toISOString(),
      };
    }
    return {
      videos: [],
      source: 'fallback',
      lastUpdated: new Date().toISOString(),
    };
  }
}
