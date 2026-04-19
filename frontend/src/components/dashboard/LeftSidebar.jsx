import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../pages/Dashboard.module.css';

const LeftSidebar = () => {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: 'The Feed', icon: '🏠', path: '/dashboard' },
    { label: 'Support Rooms', icon: '🌙', path: '/rooms' },
    { label: 'My Stories', icon: '📖', path: '/stories' },
    { label: 'Sleep Log', icon: '😴', path: '/sleep-log' },
    { label: 'Private Journal', icon: '🔒', path: '/journal' },
    { label: 'CBT Program', icon: '🧠', path: '/programs' },
    { label: 'Audio Library', icon: '🎵', path: '/audio' },
    { label: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  return (
    <aside className={styles.leftSidebar}>
      <div className={styles.profileCard}>
        <div className={styles.avatarCircle}>
          {user?.username?.[0]?.toUpperCase() || 'U'}
        </div>
        <div className="font-heading text-lg text-fc-white mb-1">
          {user?.username || 'GUEST'}
        </div>
        <div className="flex gap-2 mb-4">
          <span className="bg-fc-red/80 px-2 py-0.5 rounded text-[10px] font-mono uppercase">
            {user?.sleepIssueCategory || 'General'}
          </span>
          {user?.isAnonymous && (
             <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-mono uppercase opacity-50">
               ANONYMOUS
             </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center border-t border-white/10 pt-4">
          <div>
            <div className="text-fc-gold font-heading text-sm">12</div>
            <div className="text-[9px] opacity-40">POSTS</div>
          </div>
          <div className="border-x border-white/10">
            <div className="text-fc-gold font-heading text-sm">4</div>
            <div className="text-[9px] opacity-40">STREAK</div>
          </div>
          <div>
            <div className="text-fc-gold font-heading text-sm">⚡</div>
            <div className="text-[9px] opacity-40">MOOD</div>
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        {navLinks.map((link) => (
          <div
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`${styles.navLink} ${location.pathname === link.path ? styles.navLinkActive : ''}`}
          >
            <span>{link.icon}</span>
            <span>{link.label.toUpperCase()}</span>
          </div>
        ))}
      </nav>

      <div className="mt-10 border-t border-white/10 pt-8">
        <div className="font-heading text-[11px] text-fc-red tracking-[0.2em] mb-4">
          AWAKE RIGHT NOW
        </div>
        <div className="flex -space-x-3">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="relative w-8 h-8 rounded-full bg-fc-grey border-2 border-fc-black overflow-hidden">
               <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-black shadow-sm" />
            </div>
          ))}
          <div className="w-8 h-8 rounded-full bg-white/5 border-2 border-fc-black flex items-center justify-center text-[9px] font-heading">
            +24
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
