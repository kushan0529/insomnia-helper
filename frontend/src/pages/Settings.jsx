
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Eye, Lock, Sliders, LogOut } from 'lucide-react';

const Settings = () => {
  return (
    <div className="min-h-screen relative z-10 pt-[100px] px-6 max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="font-heading text-5xl text-white tracking-widest uppercase">System <span className="text-fc-gold">Overhaul</span></h1>
        <p className="font-body text-white/40 uppercase tracking-[0.3em] text-xs mt-2">Modify the parameters of your existence.</p>
      </header>

      <div className="space-y-6">
        {[
          { icon: <Lock />, title: "SECURITY", desc: "Encryption keys and credential management.", active: true },
          { icon: <Bell />, title: "ALERTS", desc: "Notification signals and emergency frequencies.", active: false },
          { icon: <Eye />, title: "VISIBILITY", desc: "Control how the shadows see your activity.", active: true },
          { icon: <Sliders />, title: "COMPONENTS", desc: "Interface density and cinematic processing.", active: false }
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#1C1C1C] border border-white/5 p-6 rounded-xl flex items-center justify-between group hover:border-fc-gold/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-lg bg-black/40 text-white/30 group-hover:text-fc-gold transition-colors">
                {item.icon}
              </div>
              <div>
                <h3 className="font-heading text-xl text-white tracking-widest">{item.title}</h3>
                <p className="font-body text-white/30 text-xs">{item.desc}</p>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full relative transition-colors ${item.active ? 'bg-fc-gold' : 'bg-white/5'}`}>
               <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${item.active ? 'right-1' : 'left-1'}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 pt-12 border-t border-white/5 flex justify-center">
         <button className="flex items-center gap-2 text-fc-red font-heading tracking-[0.3em] text-sm hover:brightness-125 transition-all">
            <LogOut size={16} /> TERMINATE SESSION
         </button>
      </div>
    </div>
  );
};

export default Settings;
