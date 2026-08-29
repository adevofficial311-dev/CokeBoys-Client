export interface Macro {
  id: string;
  creator_name: string;
  title: string;
  fruit?: string;
  sword?: string;
  melee?: string;
  gun?: string;
  macro_type: string;
  bounty_boost?: string;
  video_url?: string;
  macro_json: string;
  notes?: string;
  comment_count: number;
  view_count: number;
  views?: string[];
  likes?: string[];
  created_at: number;
  updated_at: number;
}

export interface Comment {
  id: string;
  macro_id: string;
  creator_name: string;
  creator_avatar?: string;
  content: string;
  created_at: number;
}


export interface ExecutorData {
  working: string[];
  notWorking: string[];
  lastUpdated?: string;
  source?: 'api' | 'fallback';
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  videoUrl: string;
  description?: string;

  // Optional compatibility fields
  duration?: string;
  viewCount?: string;
  rawViews?: number;
}

export interface VideoResponse {
  videos: YouTubeVideo[];
  channelUrl: string;

  // RSS + server-side cache
  source: 'rss' | 'cache' | 'fallback';

  lastUpdated?: string;
}

export type MusicTrack =
  | 'welcome'
  | 'main'
  | 'status'
  | 'videos';

export interface AudioSettings {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  activeTrack: MusicTrack;
  synthMode: boolean;
}
