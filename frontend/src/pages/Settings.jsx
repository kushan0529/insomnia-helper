import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Eye, Lock, Sliders, LogOut, Shield, Zap, Sparkles } from 'lucide-react';

const Settings = () => {
  return (
    <div className="max-w-[840px] mx-auto px-6 py-12">
      <header className="mb-12 text-center">
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-g mb-3 block">Personalization</span>
        <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 italic">
          Sanctuary <span className="text-g">Settings</span>
        </h1>
        <p className="text-[#8892B0] text-sm md:text-[15px] leading-relaxed max-w-[480px] mx-auto font-body italic">
          Harmonize your environment. Configure how you experience your journey to rest.
        </p>
      </header>

      <div className="space-y-4">
        {[
          { icon: <Shield size={20} />, title: "Privacy Vault", desc: "Manage your anonymous identity and data encryption.", active: true },
          { icon: <Bell size={20} />, title: "Gentle Reminders", desc: "Nudges for breathing sessions and sleep schedules.", active: false },
          { icon: <Eye size={20} />, title: "Aesthetic Mode", desc: "Toggle between high-cinematic and focused interfaces.", active: true },
          { icon: <Zap size={20} />, title: "Instant Access", desc: "Enable quick-actions for high-stress moments.", active: false }
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 flex items-center justify-between group hover:border-g/30 transition-all cursor-pointer border-white/5"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-s1 border border-white/5 flex items-center justify-center text-[#4A5370] group-hover:text-g transition-colors">
                {item.icon}
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-white tracking-wide">{item.title}</h3>
                <p className="font-body text-[#8892B0] text-[13px] italic">{item.desc}</p>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${item.active ? 'bg-g shadow-[0_0_15px_rgba(201,168,76,0.2)]' : 'bg-white/5'}`}>
               <motion.div 
                 animate={{ x: item.active ? 24 : 4 }}
                 className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm`} 
               />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 pt-12 border-t border-white/5 flex flex-col items-center gap-6">
         <button className="flex items-center gap-2 text-[#8892B0] font-bold tracking-[3px] text-[11px] uppercase hover:text-red-400 transition-all group">
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> Sign out of everything
         </button>
         
         <div className="text-[10px] text-[#4A5370] font-bold uppercase tracking-[2px] text-center max-w-[300px] leading-loose">
           Insomnia Helper Version 2.4.0 — Premium Cinematic Edition
         </div>
      </div>
    </div>
  );
};

export default Settings;
