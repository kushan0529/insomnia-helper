import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  "3AM is just loneliness wearing a clock.",
  "You are not broken. You are exhausted.",
  "The night is loudest when you face it alone.",
  "Sleep is the first thing anxiety steals from you.",
  "You survived every sleepless night so far.",
  "This is your life and it's ending one minute at a time.",
  "It's only after we've lost everything that we're free."
];

const RotatingQuotes = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-16 flex items-center justify-center overflow-hidden py-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <p className="font-heading text-fc-gold text-lg md:text-2xl uppercase tracking-[0.2em] relative inline-block">
            {quotes[index]}
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-[1px] bg-fc-red/50 shadow-[0_0_8px_rgba(139,0,0,0.5)]"></span>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RotatingQuotes;
