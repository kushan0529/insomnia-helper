import React from 'react';
import { motion } from 'framer-motion';

const SanctuaryBanner = ({ imageUrl, title, subtitle, quote }) => (
  <div className="relative w-full h-[320px] md:h-[480px] overflow-hidden rounded-3xl mb-12">
    <img 
      src={imageUrl} 
      alt={title}
      className="w-full h-full object-cover brightness-[0.4] contrast-[1.1] scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
    
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
      {quote && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          className="font-heading text-g text-sm md:text-base mb-6 italic tracking-[4px] uppercase"
        >
           — {quote} —
        </motion.p>
      )}
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-heading text-white text-5xl md:text-7xl font-bold uppercase tracking-tight leading-none"
      >
        {title}
      </motion.h1>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.2 }}
          className="font-body text-[#8892B0] text-sm md:text-lg mt-6 max-w-2xl leading-relaxed italic"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
    
    {/* Decorative Bottom Glow */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-g/30 to-transparent shadow-[0_0_40px_rgba(201,168,76,0.2)]" />
  </div>
);

export default SanctuaryBanner;
