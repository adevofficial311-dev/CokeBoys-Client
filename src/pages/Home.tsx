import { Link } from 'react-router';
import { Search, PenTool, MessageSquare, ArrowRight, Zap } from 'lucide-react';
import { HeroSection } from '../components/matrix/HeroSection';
import { KeySystemSection } from '../components/matrix/KeySystemSection';
import { ExecutorSection } from '../components/matrix/ExecutorSection';
import { VideosSection } from '../components/matrix/VideosSection';

export function Home() {
  const handleScrollToKeys = () => {
    const el = document.getElementById('keys-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full flex-1 flex flex-col space-y-4 pt-4">
      {/* Matrix Client Hero */}
      <HeroSection onScrollToKeys={handleScrollToKeys} />
      
      {/* CokeBoys Macro Hub Hero */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col items-center text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-tight max-w-4xl mb-6 break-words">
          MASTER YOUR BUILDS.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cb-yellow via-cb-yellow-hover to-cb-red">
            DOMINATE BLOXFRUITS.
          </span>
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg text-cb-text-muted max-w-2xl mb-10 leading-relaxed break-words">
          The ultimate macro & loadout repository. Discover one-shot combos, infinite combos, and share your custom macros with the CokeBoys community.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
          <Link 
            to="/macros"
            className="w-full sm:w-auto bg-cb-yellow hover:bg-cb-yellow-hover text-black font-extrabold text-base transition-all rounded-xl h-13 px-8 inline-flex items-center justify-center gap-2 shadow-lg shadow-cb-yellow/20 active:scale-95"
          >
            <span>Explore Macros</span>
            <ArrowRight size={18} />
          </Link>
          
          <button 
            onClick={() => document.getElementById('videos-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto bg-cb-surface hover:bg-cb-surface-hover text-white hover:text-cb-yellow border border-cb-border hover:border-cb-yellow/50 font-bold text-base transition-all rounded-xl h-13 px-8 inline-flex items-center justify-center gap-2 active:scale-95"
          >
            <Zap size={18} className="text-cb-yellow" />
            <span>Watch Showcase</span>
          </button>
        </div>
      </section>

      {/* Keys and Executors */}
      <KeySystemSection />
      <ExecutorSection />

      {/* Features Grid */}
      <section className="w-full bg-cb-surface/60 backdrop-blur-sm border-t border-b border-cb-border py-20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-3">
              Engineered For Best Experience 
            </h2>
            <p className="text-cb-text-muted text-base max-w-xl mx-auto">
              Everything you need to optimize your execution, test new mechanics, and destroy anything in your path.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-cb-bg/80 border border-cb-border rounded-2xl p-7 flex flex-col items-start transition-all hover:border-cb-yellow/50 group shadow-md">
              <div className="w-12 h-12 bg-cb-surface border border-cb-border group-hover:border-cb-yellow/40 rounded-xl flex items-center justify-center mb-5 transition-colors">
                <Search className="text-cb-yellow" size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">Filtered Search</h3>
              <p className="text-cb-text-muted text-sm leading-relaxed">
                Quickly locate combos customized for your Fruit, Sword, Melee, and Gun loadout with full sorting.
              </p>
            </div>
            <div className="bg-cb-bg/80 border border-cb-border rounded-2xl p-7 flex flex-col items-start transition-all hover:border-cb-red/50 group shadow-md">
              <div className="w-12 h-12 bg-cb-surface border border-cb-border group-hover:border-cb-red/40 rounded-xl flex items-center justify-center mb-5 transition-colors">
                <PenTool className="text-cb-red" size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">Instant Publishing</h3>
              <p className="text-cb-text-muted text-sm leading-relaxed">
                Submit and broadcast your macros in seconds. Include YouTube video guide embeds, bounty boost badges, and direct JSON schemas.
              </p>
            </div>
            <div className="bg-cb-bg/80 border border-cb-border rounded-2xl p-7 flex flex-col items-start transition-all hover:border-cb-yellow/50 group shadow-md">
              <div className="w-12 h-12 bg-cb-surface border border-cb-border group-hover:border-cb-yellow/40 rounded-xl flex items-center justify-center mb-5 transition-colors">
                <MessageSquare className="text-cb-yellow" size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">Discussion & Feedback</h3>
              <p className="text-cb-text-muted text-sm leading-relaxed">
                Engage directly with creators. Give feedback on timing, recommend keybind tweaks, and help refine optimal macros.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <VideosSection />
      
      {/* Small padding at bottom before footer */}
      <div className="pb-12"></div>
    </div>
  );
}
