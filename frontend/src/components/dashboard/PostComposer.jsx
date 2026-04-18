import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { createStory } from '../../redux/slices/storySlice';
import { toast } from 'react-hot-toast';
import styles from '../../pages/Dashboard.module.css';

const PostComposer = () => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('General');
  const [isTriggerWarning, setIsTriggerWarning] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const moods = [
    { label: 'HOPELESS', val: 'Hopeless', color: '#8b0000' },
    { label: 'ANGRY', val: 'Angry', color: '#92400e' },
    { label: 'NUMB', val: 'Numb', color: '#374151' },
    { label: 'SURVIVING', val: 'Surviving', color: '#166534' },
    { label: 'FIGHTING BACK', val: 'Fighting Back', color: '#c9a84c' }
  ];

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    const result = await dispatch(createStory({
      content,
      mood,
      isTriggerWarning,
      isAnonymous
    }));

    if (createStory.fulfilled.match(result)) {
      setContent('');
      setIsExpanded(false);
      toast.success("STORY SHARED WITH THE CIRCLE");
    } else {
      toast.error("COULD NOT SHARE. TRY AGAIN.");
    }
  };

  return (
    <div className={styles.composer}>
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full border border-fc-gold flex items-center justify-center font-heading text-fc-gold">
          {user?.username?.[0]?.toUpperCase() || 'U'}
        </div>
        <div className="flex-1">
          <textarea
            className={`${styles.composerTextarea} font-sans font-light`}
            placeholder="WHAT KEPT YOU UP LAST NIGHT?"
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
            <div className="mt-6 border-t border-white/5 pt-6">
               <div className="font-heading text-[10px] text-fc-gold tracking-widest mb-3">HOW ARE YOU FEELING?</div>
               <div className="flex flex-wrap gap-2">
                  {moods.map(m => (
                    <button
                      key={m.val}
                      onClick={() => setMood(m.val)}
                      className="px-3 py-1.5 border border-white/10 font-heading text-[11px] transition-all"
                      style={{
                        backgroundColor: mood === m.val ? m.color : 'transparent',
                        borderColor: mood === m.val ? m.color : 'rgba(255,255,255,0.1)',
                        color: mood === m.val ? '#fff' : 'rgba(255,255,255,0.4)'
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
               </div>

               <div className="flex justify-between items-center mt-8">
                  <div className="flex gap-6">
                    <button 
                      onClick={() => setIsTriggerWarning(!isTriggerWarning)}
                      className={`flex items-center gap-2 font-mono text-[10px] ${isTriggerWarning ? 'text-fc-red underline' : 'opacity-40'}`}
                    >
                      ⚠️ TRIGGER WARNING
                    </button>
                    <button 
                       onClick={() => setIsAnonymous(!isAnonymous)}
                       className={`flex items-center gap-2 font-mono text-[10px] ${isAnonymous ? 'text-fc-gold underline' : 'opacity-40'}`}
                    >
                      👤 ANONYMOUS: {isAnonymous ? 'ON' : 'OFF'}
                    </button>
                  </div>

                  <button 
                    onClick={handleSubmit}
                    className="bg-fc-gold text-black px-6 py-2 font-heading tracking-widest hover:scale-105 transition-transform"
                  >
                    SHARE
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostComposer;
