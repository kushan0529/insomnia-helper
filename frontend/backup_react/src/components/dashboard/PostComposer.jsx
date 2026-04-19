import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { createStory } from '../../redux/slices/storySlice';
import { toast } from 'react-hot-toast';
import { ShieldAlert, UserCheck, Send, Info, UserX, Sparkles } from 'lucide-react';

const PostComposer = ({ roomId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('Surviving');
  const [isTriggerWarning, setIsTriggerWarning] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth || { user: null });

  const moods = [
    { label: 'HOPELESS', val: 'Hopeless', color: '#ef4444' },
    { label: 'ANGRY', val: 'Angry', color: '#f59e0b' },
    { label: 'NUMB', val: 'Numb', color: '#6b7280' },
    { label: 'SURVIVING', val: 'Surviving', color: '#10b981' },
    { label: 'FIGHTING BACK', val: 'Fighting Back', color: '#C9A84C' }
  ];

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    const result = await dispatch(createStory({
      title,
      content,
      mood,
      isTriggerWarning,
      isAnonymous,
      roomId
    }));

    if (createStory.fulfilled.match(result)) {
      setTitle('');
      setContent('');
      setIsExpanded(false);
      toast.success("Reflection cast into the sanctuary.");
    } else {
      toast.error("The night rejected your words. Try again.");
    }
  };

  return (
    <div className={`glass p-6 md:p-8 border-white/5 transition-all duration-500 ${isExpanded ? 'bg-white/[0.04] shadow-[0_32px_128px_rgba(0,0,0,0.4)]' : 'bg-white/[0.02]'}`}>
      <div className="flex gap-4">
        <div className="w-11 h-11 rounded-xl bg-ink/80 border border-g/30 flex items-center justify-center font-heading text-g shadow-lg shrink-0">
          {user?.username?.[0]?.toUpperCase() || 'U'}
        </div>
        <div className="flex-1">
          {isExpanded && (
            <motion.input
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              type="text"
              placeholder="Title (Optional)"
              className="w-full bg-transparent border-none outline-none font-heading text-2xl md:text-3xl text-g placeholder:text-g/20 mb-4 uppercase tracking-tighter"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          <textarea
            className="w-full bg-transparent border-none outline-none font-body text-[16px] md:text-[18px] text-white placeholder:text-[#4A5370] resize-none h-[54px] overflow-hidden focus:h-32 transition-all duration-500 italic"
            placeholder="Share what is keeping you awake..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
          />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-8 border-t border-white/5 pt-8">
               <div className="flex items-center gap-2 mb-4 text-g/40">
                  <Sparkles size={12} />
                  <span className="text-[10px] font-bold tracking-[3px] uppercase">Emotional Resonance</span>
               </div>
               <div className="flex flex-wrap gap-2 mb-10">
                  {moods.map(m => (
                    <button
                      key={m.val}
                      onClick={() => setMood(m.val)}
                      className={`px-4 py-2 rounded-lg font-heading text-[11px] font-bold tracking-widest transition-all border ${
                        mood === m.val 
                        ? 'bg-g/10 border-g text-g shadow-[0_0_15px_rgba(201,168,76,0.1)]' 
                        : 'bg-transparent border-white/5 text-[#4A5370] hover:text-[#8892B0] hover:border-white/20'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
               </div>

               <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex gap-6">
                    <button 
                      onClick={() => setIsTriggerWarning(!isTriggerWarning)}
                      className={`flex items-center gap-2 transition-all group ${isTriggerWarning ? 'text-red-500 font-bold' : 'text-[#4A5370] hover:text-[#8892B0]'}`}
                    >
                      <ShieldAlert size={16} className={`${isTriggerWarning ? 'animate-pulse' : 'opacity-40'}`} />
                      <span className="text-[10px] uppercase tracking-widest">Trigger Warning</span>
                    </button>
                    <button 
                       onClick={() => setIsAnonymous(!isAnonymous)}
                       className={`flex items-center gap-2 transition-all group ${isAnonymous ? 'text-g font-bold' : 'text-[#4A5370] hover:text-[#8892B0]'}`}
                    >
                      {isAnonymous ? <UserX size={16} /> : <UserCheck size={16} />}
                      <span className="text-[10px] uppercase tracking-widest">Identity Protected</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                     <button 
                       onClick={() => setIsExpanded(false)}
                       className="text-[10px] font-bold text-[#4A5370] uppercase tracking-widest hover:text-white transition-colors"
                     >
                       Cancel
                     </button>
                     <button 
                       onClick={handleSubmit}
                       className="btn-gold !py-3 !px-10 flex items-center gap-3 group"
                     >
                       <span className="font-bold tracking-[2px]">CAST REFLECTION</span>
                       <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostComposer;
