import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MOODS = [
  {
    em: '😰', name: 'Anxious', title: 'Anxious — and that is okay',
    desc: 'Anxiety is your body trying to protect you from a perceived threat. The feelings are real, but you are not in danger.',
    tip: 'Try 4-7-8 breathing. Do 5-4-3-2-1 grounding. Remind yourself: I have survived every hard moment before this one.'
  },
  {
    em: '😤', name: 'Stressed', title: 'Overwhelmed by stress',
    desc: 'Stress means you care about something. It also means your body needs relief right now — not later.',
    tip: 'Write down the 3 most urgent things only. Move for 2 minutes. Breathe slowly for 4 minutes. Then tackle just the first thing.'
  },
  {
    em: '😔', name: 'Sad', title: 'Sad — and that is allowed',
    desc: 'Sadness means you have loved something. A person, a hope, a version of yourself. That capacity to love is not weakness.',
    tip: 'Allow the feeling without judging it. Text one person. Write in your journal. Tomorrow will be a different day.'
  },
  {
    em: '😶', name: 'Numb', title: 'Numb — a valid response',
    desc: 'Numbness is often protection. Your mind is doing its best to cope with too much input at once.',
    tip: 'Try something sensory: cold water on your face, a warm drink, stepping outside for fresh air. You don\'t have to feel everything right now.'
  },
  {
    em: '🙂', name: 'Okay', title: 'Okay — and that counts',
    desc: 'Okay is a real win on hard days. You made it here. That matters.',
    tip: 'Use this calmer moment: set your sleep environment, write one thing you\'re grateful for, set one gentle intention for tomorrow.'
  }
];

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-g mb-3 block">Mood Check‑In</span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">How are you <span className="text-g">feeling right now?</span></h2>
        <p className="text-[#8892B0] text-sm md:text-[15px] leading-relaxed max-w-[530px]">
          Name it honestly. Understanding your state is the first step to working with it, not against it.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
        {MOODS.map(m => (
          <motion.button
            key={m.name}
            whileHover={{ y: -3, backgroundColor: 'rgba(201,168,76,0.07)', borderColor: 'rgba(201,168,76,0.42)' }}
            onClick={() => setSelectedMood(m)}
            className={`glass-card p-6 flex flex-col items-center justify-center transition-all ${
              selectedMood?.name === m.name ? 'border-g/40 bg-g/5 shadow-[0_8px_24px_rgba(0,0,0,0.3)]' : ''
            }`}
          >
            <span className="text-4xl mb-3">{m.em}</span>
            <span className="text-[10px] font-medium tracking-wider text-[#8892B0] uppercase">{m.name}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass border-g/20 p-8 bg-g/5"
          >
            <h4 className="font-heading text-2xl text-g font-bold mb-3">{selectedMood.title}</h4>
            <p className="text-[#8892B0] text-sm leading-relaxed mb-4">{selectedMood.desc}</p>
            <p className="text-white text-sm font-medium leading-relaxed mb-6">{selectedMood.tip}</p>
            
            <div className="flex flex-wrap gap-2">
              <button onClick={() => navigate('/breathe')} className="btn-glass !py-2 !px-4 !text-[11px]">→ Breathing exercise</button>
              <button onClick={() => navigate('/programs')} className="btn-glass !py-2 !px-4 !text-[11px]">→ CBT Toolkit</button>
              <button onClick={() => navigate('/journal')} className="btn-glass !py-2 !px-4 !text-[11px]">→ Journal</button>
              <button onClick={() => navigate('/audio')} className="btn-glass !py-2 !px-4 !text-[11px]">→ Sleep sounds</button>
              <button onClick={() => navigate('/groups')} className="btn-glass !py-2 !px-4 !text-[11px]">→ Find a group</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 p-5 rounded-[var(--r2)] bg-g/5 border border-g/10 mt-12">
        <div className="text-2xl">🤝</div>
        <div className="flex-1">
          <h4 className="text-[14px] font-semibold mb-1">Need to talk to someone?</h4>
          <p className="text-[12px] text-[#8892B0] leading-relaxed">
            iCall India: <strong className="text-g">9152987821</strong> · Free & confidential
          </p>
        </div>
        <button onClick={() => window.open('tel:9152987821')} className="btn-gold !text-[12px] !py-2 !px-5 whitespace-nowrap">Call Now</button>
      </div>
    </div>
  );
};

export default Mood;
