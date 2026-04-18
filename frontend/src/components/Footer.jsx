import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Globe, Mail, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-black/92 backdrop-blur-md border-t border-white/10 pt-16 pb-8 px-6 md:px-12 z-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Col 1: Logo + info */}
        <div className="space-y-6">
          <Link to="/home" className="flex items-center gap-2">
            <Moon className="text-fc-gold" size={20} />
            <span className="font-heading text-[20px] text-fc-gold tracking-widest uppercase">INSOMNIA HELPER</span>
          </Link>
          <p className="font-body text-[13px] text-white/60 leading-relaxed mt-2 uppercase tracking-wide">
            Support for those who can't sleep.
          </p>
          <div className="space-y-1 mt-6">
            <p className="font-body text-[13px] text-white/50 uppercase">help@insomniahelper.com</p>
            <p className="font-body text-[13px] text-white/50 uppercase">+1 (555) 781-3000</p>
          </div>
          <div className="flex gap-4 mt-4">
            {[Globe, Mail, MessageSquare].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-fc-gold hover:text-fc-gold transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Info */}
        <div className="flex flex-col gap-6">
          <h4 className="font-heading text-[13px] text-fc-gold tracking-[0.2em] uppercase">INFO</h4>
          <div className="flex flex-col gap-3">
            {['Home', 'About', 'Programs', 'Events', 'Blog', 'Contact'].map(link => (
              <Link key={link} to="#" className="font-body text-[13px] text-white/60 hover:text-fc-gold transition-colors uppercase tracking-widest">{link}</Link>
            ))}
          </div>
        </div>

        {/* Col 3: Community */}
        <div className="flex flex-col gap-6">
          <h4 className="font-heading text-[13px] text-fc-gold tracking-[0.2em] uppercase">THE CIRCLE</h4>
          <div className="flex flex-col gap-3">
            {['Support Rooms', 'Peer Match', 'Story Board', 'Night Owl Rooms', 'Join Now'].map(link => (
              <Link key={link} to="#" className="font-body text-[13px] text-white/60 hover:text-fc-gold transition-colors uppercase tracking-widest">{link}</Link>
            ))}
          </div>
        </div>

        {/* Col 4: Resources */}
        <div className="flex flex-col gap-6">
          <h4 className="font-heading text-[13px] text-fc-gold tracking-[0.2em] uppercase">RESOURCES</h4>
          <div className="flex flex-col gap-3">
            {['CBT-I Program', 'Audio Library', 'Sleep Journal', 'Trigger Logs', 'Dashboard'].map(link => (
              <Link key={link} to="#" className="font-body text-[13px] text-white/60 hover:text-fc-gold transition-colors uppercase tracking-widest">{link}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-[1200px] mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-heading text-[12px] text-white/40 tracking-[0.1em]">COPYRIGHT © 2026 INSOMNIA HELPER</p>
        <div className="flex gap-6">
          {['PRIVACY', 'TERMS', 'COOKIES'].map(l => (
            <Link key={l} to="#" className="font-body text-[12px] text-white/40 hover:text-fc-gold transition-colors tracking-widest">{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
