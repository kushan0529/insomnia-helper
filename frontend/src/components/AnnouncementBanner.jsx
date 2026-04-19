import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(!localStorage.getItem('ih_banner_dismissed'));

  const dismiss = () => {
    localStorage.setItem('ih_banner_dismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="w-full py-3 px-10 flex justify-center items-center gap-5 relative z-[2000] border-b"
      style={{ 
        background: 'rgba(201,168,76,0.12)', 
        borderBottomColor: 'rgba(201,168,76,0.22)' 
      }}
    >
      <p className="text-[13px] font-medium text-center font-body text-white">
        <span className="text-[#C9A84C] font-bold uppercase tracking-wider mr-2">🌙 Spring Wellness Meetup</span> 
        — Hyderabad · April 24, 2026 · <span className="opacity-80">Real people. Real rooms. No one fights alone.</span>
      </p>
      <button 
        onClick={dismiss}
        className="text-white hover:text-[#C9A84C] transition-colors p-1"
        aria-label="Dismiss banner"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default AnnouncementBanner;
