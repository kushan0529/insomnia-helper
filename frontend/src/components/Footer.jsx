import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Globe, Mail, MessageSquare, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-ink border-t border-white/5 pt-24 pb-12 px-6 md:px-12 z-10 overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-g/30 to-transparent" />
      
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {/* Col 1: Brand */}
        <div className="space-y-8">
          <Link to="/home" className="flex items-center gap-3 group">
            <span className="font-heading text-2xl font-bold text-g tracking-wider group-hover:drop-shadow-[0_0_8px_rgba(201,168,76,0.3)] transition-all">
              🌙 Insomnia<em className="text-white not-italic opacity-80">Helper</em>
            </span>
          </Link>
          <p className="font-body text-[14px] text-[#8892B0] leading-relaxed italic opacity-80">
            A high-fidelity sanctuary for the modern mind. Combining clinical science with community truth to reclaim the night.
          </p>
          <div className="flex gap-4">
            {[Globe, Mail, MessageSquare].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#4A5370] hover:border-g/50 hover:text-g hover:bg-g/10 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: NAVIGATION */}
        <div className="flex flex-col gap-8">
          <h4 className="text-[10px] font-bold text-g tracking-[4px] uppercase">Navigation</h4>
          <div className="flex flex-col gap-4">
            {[
              { n: 'The Sanctuary', p: '/home' },
              { n: 'Programs', p: '/programs' },
              { n: 'Deep Breathing', p: '/breathe' },
              { n: 'Audio Library', p: '/audio' },
              { n: 'Mood Tracking', p: '/mood' }
            ].map(l => (
              <Link key={l.n} to={l.p} className="text-[13px] text-[#8892B0] hover:text-white transition-colors font-medium tracking-wide flex items-center gap-2 group">
                 <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                 {l.n}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3: THE CIRCLE */}
        <div className="flex flex-col gap-8">
          <h4 className="text-[10px] font-bold text-g tracking-[4px] uppercase">The Circle</h4>
          <div className="flex flex-col gap-4">
            {[
              { n: 'Sanctuary Rooms', p: '/rooms' },
              { n: 'Collective Voices', p: '/stories' },
              { n: 'Shadow Talk', p: '/shadow-talk' },
              { n: 'Community Groups', p: '/groups' },
              { n: 'Join Now', p: '/register' }
            ].map(l => (
              <Link key={l.n} to={l.p} className="text-[13px] text-[#8892B0] hover:text-white transition-colors font-medium tracking-wide flex items-center gap-2 group">
                 <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                 {l.n}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 4: TOOLS */}
        <div className="flex flex-col gap-8">
          <h4 className="text-[10px] font-bold text-g tracking-[4px] uppercase">Personal Space</h4>
          <div className="flex flex-col gap-4">
            {[
              { n: 'Internal Journal', p: '/journal' },
              { n: 'Sleep Logs', p: '/sleep-log' },
              { n: 'My Profile', p: '/profile' },
              { n: 'Member Settings', p: '/settings' },
              { n: 'Activity Dashboard', p: '/dashboard' }
            ].map(l => (
              <Link key={l.n} to={l.p} className="text-[13px] text-[#8892B0] hover:text-white transition-colors font-medium tracking-wide flex items-center gap-2 group">
                 <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                 {l.n}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-[1240px] mx-auto border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[11px] text-[#4A5370] font-bold tracking-[2px] uppercase">© 2026 Insomnia Helper · Built for the Night</p>
        <div className="flex gap-8">
          {['Privacy Protected', 'Terms of Use', 'Ethical AI'].map(l => (
            <span key={l} className="text-[11px] text-[#4A5370] font-bold tracking-[2px] cursor-default uppercase">{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
