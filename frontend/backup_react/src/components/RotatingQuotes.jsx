import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  "In the deep stillness of the night, find your breath.",
  "Every sunset is an opportunity to reset.",
  "You are not alone in the quiet hours.",
  "Rest is not earned, it is a basic human right.",
  "Softly, the night heals what the day has worn.",
  "Your worth is not measured by your productivity.",
  "Deep breath in, let the weight of the day drift away."
];

const RotatingQuotes = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-20 flex items-center justify-center overflow-hidden py-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="text-center px-6"
        >
          <p className="font-heading text-g text-xl md:text-2xl font-bold tracking-wide relative inline-block italic">
            "{quotes[index]}"
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 2, delay: 0.3 }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-px bg-g/20"
            />
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RotatingQuotes;
