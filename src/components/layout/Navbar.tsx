import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useAuthProfile } from '../../context/AuthProfileContext';
import { soundEngine } from '../../utils/audioEngine';

export function Navbar({ setProfileOpen, setAdminOpen }: { setProfileOpen: (v: boolean) => void, setAdminOpen: (v: boolean) => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { profile, isAdmin } = useAuthProfile();
  
  const isHome = location.pathname === '/';

  const handleScroll = (id: string) => {
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
    soundEngine.playClick();
  };

  const navLinks = [
    { name: 'Keys', id: 'keys-section' },
    { name: 'Status', id: 'executors-section' },
    { name: 'Showcase', id: 'videos-section' }
  ];

  const appLinks = [
    { name: 'Macros Hub', path: '/macros' },
    { name: 'Publish Macro', path: '/publish' },
  ];

  return (
    <nav className="h-[72px] bg-cb-bg/90 backdrop-blur-md border-b border-cb-border flex items-center px-3 sm:px-6 lg:px-8 shrink-0 sticky top-0 z-50 transition-all">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto gap-2">
        <Link to="/" onClick={() => { window.scrollTo(0, 0); soundEngine.playClick(); }} className="text-xl sm:text-2xl font-display font-black tracking-tight flex items-center gap-1 group shrink-0">
          <span className="text-white">COKE</span>
          <span className="text-cb-yellow">BOYS</span>
        </Link>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <button key={link.name} onClick={() => handleScroll(link.id)} className="text-xs lg:text-sm font-medium px-3.5 py-2 rounded-lg transition-all text-cb-text-muted hover:text-white hover:bg-cb-surface cursor-pointer">
              {link.name}
            </button>
          ))}
          {appLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link key={link.name} to={link.path} onClick={() => soundEngine.playClick()} className={`text-xs lg:text-sm font-medium px-3.5 py-2 rounded-lg transition-all ${isActive ? 'bg-cb-yellow text-black font-semibold' : 'text-cb-text-muted hover:text-white hover:bg-cb-surface'}`}>
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Profile & Admin Buttons */}
        <div className="flex items-center gap-2">
            <button onClick={() => { soundEngine.playClick(); setAdminOpen(true); }} className={`p-2 rounded-lg border flex items-center gap-1 ${isAdmin ? 'bg-emerald-900 border-emerald-700 text-emerald-400' : 'bg-cb-surface border-cb-border text-cb-text-muted'}`}>
                <ShieldCheck size={16} />
            </button>
            <button onClick={() => { soundEngine.playClick(); setProfileOpen(true); }} className="flex items-center gap-2 px-3 py-1 bg-cb-surface border border-cb-border rounded-full">
                <img src={profile.avatar} className="w-6 h-6 rounded-full" />
                <span className="text-xs text-white hidden sm:inline">{profile.username}</span>
            </button>
            <button className="md:hidden p-2 text-cb-text-muted" onClick={() => { soundEngine.playClick(); setMobileOpen(!mobileOpen); }}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-cb-bg/95 backdrop-blur-xl border-b border-cb-border md:hidden p-5 flex flex-col gap-3 shadow-2xl">
          {navLinks.map((link) => (
            <button key={link.name} onClick={() => handleScroll(link.id)} className="text-base font-medium text-cb-text-muted hover:text-white p-2 text-left">
              {link.name}
            </button>
          ))}
          {appLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => { soundEngine.playClick(); setMobileOpen(false); }} className="text-base font-medium text-cb-text-muted hover:text-white p-2">
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
