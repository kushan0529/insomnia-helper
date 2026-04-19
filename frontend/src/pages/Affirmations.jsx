import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const AFFS = [
  { t: 'Struggling is not the same as failing. You are still here.', c: 'all' },
  { t: 'You have survived every hard night so far. That is your proof.', c: 'all' },
  { t: 'Rest is not giving up. Rest is how you come back.', c: 'sleep' },
  { t: 'You do not need to fix everything tonight.', c: 'sleep' },
  { t: 'Small steps count. Getting out of bed counts.', c: 'all' },
  { t: 'Your feelings are valid, even when they make no sense.', c: 'all' },
  { t: 'Healing is not linear. That is completely okay.', c: 'all' },
  { t: 'You are allowed to ask for help. That is strength.', c: 'all' },
  { t: 'This moment will pass. You have outlasted every hard moment before.', c: 'anxiety' },
  { t: 'You deserve the same compassion you give to others.', c: 'self' },
  { t: 'Anxiety is a feeling, not a fact.', c: 'anxiety' },
  { t: 'Your worth is not measured by your productivity.', c: 'self' },
  { t: 'You are more than your worst day.', c: 'self' },
  { t: 'The dark does not last. Morning always comes.', c: 'sleep' },
  { t: 'One breath at a time. One moment at a time.', c: 'anxiety' },
  { t: 'You are not broken. You are human.', c: 'all' },
  { t: 'Your story is not over.', c: 'all' },
  { t: 'Sleep will come. Your body knows how.', c: 'sleep' },
  { t: 'You have been brave in ways no one will ever see.', c: 'self' },
  { t: 'Grief is love with nowhere to go. It is okay to grieve.', c: 'grief' },
  { t: 'Loss does not expire. You are allowed to still miss them.', c: 'grief' },
  { t: 'You are allowed to take up space — in this world, in this room, in this moment.', c: 'self' },
  { t: 'The fact that you are reading this means you are still trying. That matters.', c: 'all' },
  { t: 'Your nervous system learned to be afraid. It can also learn to be safe.', c: 'anxiety' },
  { t: 'Sleep is not something you do — it is something you allow.', c: 'sleep' },
  { t: 'you are alone if leave every one ,but you are lonely when you dont have any one to talk .', c: 'lonellines vs aloneliness' }
];

const Affirmations = () => {
  const [filter, setFilter] = useState('all');
  const [index, setIndex] = useState(0);

  const filtered = AFFS.filter(a => filter === 'all' || a.c === filter || a.c === 'all');
  const current = filtered[index % filtered.length];

  const next = () => setIndex(i => i + 1);

  const copy = () => {
    navigator.clipboard.writeText(`"${current.t}"`).then(() => {
      toast.success('Copied to clipboard!');
    });
  };

  return (
    <div className="max-w-[800px] mx-auto px-6 py-12">
      <div className="mb-12 text-center md:text-left">
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-g mb-3 block">Affirmations</span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Words for <span className="text-g">hard moments</span></h2>
        <p className="text-[#8892B0] text-sm md:text-[15px] leading-relaxed max-w-[530px]">
          Not toxic positivity. Grounded, honest words that hold space for both the pain and the possibility.
        </p>
      </div>

      <div className="glass p-12 text-center relative overflow-hidden mb-8 min-h-[300px] flex flex-col items-center justify-center">
        {/* Large Quote Mark Decoration */}
        <span className="absolute top-[-40px] left-4 font-heading text-[220px] text-g opacity-[0.05] pointer-events-none select-none">“</span>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.t}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="font-heading text-2xl md:text-4xl italic font-semibold leading-snug text-white relative z-10"
          >
            <span className="text-g">“</span>{current.t}<span className="text-g">”</span>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap gap-2 justify-center mt-12 mb-8 relative z-10">
          {['all', 'anxiety', 'sleep', 'self', 'grief'].map(f => (
            <button
              key={f}
              onClick={() => { setFilter(f); setIndex(0); }}
              className={`px-4 py-1.5 rounded-full text-[11px] font-medium transition-all border ${filter === f ? 'bg-g/10 border-g/30 text-g' : 'bg-white/5 border-transparent text-[#8892B0] hover:text-white'
                }`}
            >
              {f === 'all' ? 'All' : f === 'self' ? 'Self-worth' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex gap-3 justify-center relative z-10">
          <button onClick={next} className="btn-gold !px-8">New Affirmation</button>
          <button onClick={copy} className="btn-glass !p-3 rounded-full"><Copy size={18} /></button>
          <button onClick={() => toast.success('Saved to favourites ♡')} className="btn-glass !p-3 rounded-full"><Heart size={18} /></button>
        </div>
      </div>

      <div className="mb-6">
        <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#4A5370] mb-6 block">More to explore</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.slice(index + 1, index + 5).map((a, i) => (
            <motion.div
              key={i}
              whileHover={{ borderColor: 'rgba(201,168,76,0.3)', color: 'white' }}
              onClick={() => setIndex(AFFS.indexOf(a))}
              className="glass-card p-6 text-sm italic text-white/70 leading-relaxed cursor-pointer font-heading"
            >
              "{a.t}"
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Affirmations;
