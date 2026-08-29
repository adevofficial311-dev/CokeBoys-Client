import { Outlet, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { SongPlayer } from './SongPlayer';
import { Charizard } from '../ui/Charizard';
import { FontChangerModal } from '../ui/FontChangerModal';
import { ProfileModal } from '../ui/ProfileModal';
import { AdminLoginModal } from '../ui/AdminLoginModal';
import { AtmosphericBackground } from '../matrix/AtmosphericBackground';
import { PikachuEasterEgg } from '../matrix/PikachuEasterEgg';
import { Footer } from '../matrix/Footer';

export function MacroLayout() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    // 1. Web Protection
    const protectSite = (e: MouseEvent | KeyboardEvent) => {
      if (e.type === 'contextmenu') e.preventDefault();
      
      if (e.type === 'keydown') {
        const ke = e as KeyboardEvent;
        if (
          ke.key === 'F12' || 
          (ke.ctrlKey && ke.shiftKey && (ke.key === 'I' || ke.key === 'i' || ke.key === 'J' || ke.key === 'j' || ke.key === 'C' || ke.key === 'c')) ||
          (ke.ctrlKey && (ke.key === 'U' || ke.key === 'u'))
        ) {
          ke.preventDefault();
        }
      }
    };
    document.addEventListener('contextmenu', protectSite as any);
    document.addEventListener('keydown', protectSite as any);

    return () => {
      document.removeEventListener('contextmenu', protectSite as any);
      document.removeEventListener('keydown', protectSite as any);
    };
  }, []);

  return (
    <div className="min-h-screen bg-cb-bg text-cb-text relative overflow-x-hidden selection:bg-cb-yellow selection:text-black">
      <AtmosphericBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar setProfileOpen={setProfileOpen} setAdminOpen={setAdminOpen} />
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
        <SongPlayer />
        <Charizard />
        <PikachuEasterEgg />
        <FontChangerModal />
        <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
        <AdminLoginModal isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
        <Footer />
      </div>
    </div>
  );
}
