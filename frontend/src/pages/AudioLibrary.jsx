import React from 'react';
import FightClubBanner from '../components/FightClubBanner';
import { motion } from 'framer-motion';
import { Play, Lock } from 'lucide-react';

const AudioLibrary = () => {
  const categories = [
    { title: 'SLEEP SOUNDS', img: 'https://source.unsplash.com/300x200/?rain,window,dark,night', tracks: 12, premium: false },
    { title: 'GUIDED BREATHING', img: 'https://source.unsplash.com/300x200/?fog,forest,dark,mist', tracks: 8, premium: false },
    { title: 'BODY SCAN', img: 'https://source.unsplash.com/300x200/?dark,minimal,calm,shadow', tracks: 5, premium: true },
    { title: 'SLEEP STORIES', img: 'https://source.unsplash.com/300x200/?book,candle,dark,night', tracks: 15, premium: true },
  ];

  return (
    <div className="bg-fc-black min-h-screen pt-20 pb-20">
      <FightClubBanner 
        imageUrl="https://source.unsplash.com/1600x500/?industrial,gritty,warehouse,dark"
        title="AUDITORY VOID"
        subtitle="The silence is where the truth lives. Desaturated soundscapes for the restless."
        quote="Listen to the frequency of the night."
      />

      <div className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((c, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[3/2] overflow-hidden border border-fc-gold/10">
              <img src={c.img} alt="" className="fc-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-fc-black/40 group-hover:bg-fc-red/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {c.premium ? <Lock className="text-fc-white" size={48} /> : <Play className="text-fc-white" size={48} />}
              </div>
              {c.premium && (
                <div className="absolute top-4 right-4 bg-fc-gold text-fc-black px-3 py-1 font-heading text-[10px] tracking-widest">
                  PREMIUM
                </div>
              )}
            </div>
            <div className="mt-6">
              <h3 className="font-heading text-2xl text-fc-white group-hover:text-fc-gold transition-colors tracking-widest uppercase">{c.title}</h3>
              <p className="font-body text-[10px] text-fc-white/40 tracking-[0.2em]">{c.tracks} TRACKS AVAILABLE</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AudioLibrary;
