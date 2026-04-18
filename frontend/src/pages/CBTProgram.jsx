import React from 'react';
import FightClubBanner from '../components/FightClubBanner';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2 } from 'lucide-react';

const CBTProgram = () => {
  const weeks = [
    { number: 1, title: 'BASELINE', desc: 'Sleep Diary & Patterns. Identify the copy of a copy.', status: 'completed' },
    { number: 2, title: 'RESTRICTION', desc: 'Lock the window. Strict bed timings.', status: 'current' },
    { number: 3, title: 'STIMULUS', desc: 'Bed = Sleep. Nothing else allowed.', status: 'locked' },
    { number: 4, title: 'COGNITIVE', desc: 'Challenge the night-time lies.', status: 'locked' },
    { number: 5, title: 'RELAXATION', desc: 'Muscle release. Progressive calm.', status: 'locked' },
    { number: 6, title: 'RELAPSE', desc: 'Maintaining the underground gain.', status: 'locked' },
  ];

  return (
    <div className="bg-fc-black min-h-screen pt-20 pb-20 overflow-hidden">
      <FightClubBanner 
        imageUrl="https://source.unsplash.com/1600x500/?clock,dark,night,insomnia"
        title="REWIRE THE BRAIN"
        subtitle="A 6-week cinematic progression to reclaim your humanity. Step by step, minute by minute."
        quote="First rule of CBT-I: You trust the process."
      />

      <div className="max-w-7xl mx-auto px-6 mt-20 relative">
        {/* Film Strip Border */}
        <div className="absolute top-0 bottom-0 left-0 w-8 border-r-2 border-dashed border-fc-white/20 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-0 w-8 border-l-2 border-dashed border-fc-white/20 hidden md:block" />

        <div className="space-y-12 py-10">
          {weeks.map((w, i) => (
            <motion.div 
              key={i}
              initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row items-center gap-8 p-8 border ${
                w.status === 'completed' ? 'bg-fc-gold/5 border-fc-gold/30' :
                w.status === 'current' ? 'bg-fc-red/5 border-fc-red/40 shadow-[0_0_30px_rgba(139,0,0,0.1)]' :
                'bg-fc-black border-fc-white/5 opacity-50'
              }`}
            >
              <div className="flex-shrink-0 w-24 h-24 border-2 border-fc-white/10 flex items-center justify-center relative">
                 <span className="font-heading text-4xl text-fc-white/20">{w.number}</span>
                 {w.status === 'completed' && <CheckCircle2 className="absolute text-fc-gold" size={40} />}
                 {w.status === 'locked' && <Lock className="absolute text-fc-white/20" size={32} />}
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <h3 className="font-heading text-4xl text-fc-white tracking-[0.2em] uppercase mb-2">WEEK {w.number}: {w.title}</h3>
                <p className="font-body text-fc-white/40 text-sm max-w-xl">{w.desc}</p>
              </div>

              {w.status === 'current' && (
                <button className="px-10 py-3 bg-fc-white text-fc-black font-heading text-lg tracking-widest hover:bg-fc-red hover:text-fc-white transition-all">
                  ENTER WEEK
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CBTProgram;
