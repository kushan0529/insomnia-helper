import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, Edit3, Save, X, Lock, FileText, Smile } from 'lucide-react';

const MOOD_OPTIONS = [
  { e: '😴', l: 'Rested', v: 1 },
  { e: '🙂', l: 'Calm', v: 2 },
  { e: '😐', l: 'Neutral', v: 3 },
  { e: '😞', l: 'Sad', v: 4 },
  { e: '😤', l: 'Stressed', v: 5 },
  { e: '😰', l: 'Anxious', v: 6 }
];

const Journal = () => {
  const [journals, setJournals] = useState([]);
  const [activeEntry, setActiveEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  // Editor State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 1800);
    fetchJournals();
    return () => clearTimeout(timer);
  }, []);

  const fetchJournals = async () => {
    try {
      const res = await api.get('/journal');
      setJournals(res.data);
    } catch (err) {
      toast.error("Could not load your journal.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setActiveEntry(null);
    setTitle('');
    setContent('');
    setMood(3);
    setIsEditing(true);
  };

  const handleSelectEntry = (entry) => {
    setActiveEntry(entry);
    setTitle(entry.title);
    setContent(entry.content);
    setMood(entry.mood || 3);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!content.trim()) return;
    try {
      if (activeEntry) {
        await api.put(`/journal/${activeEntry._id}`, { title, content, mood });
        toast.success("Entry updated.");
        fetchJournals();
        setIsEditing(false);
      } else {
        const res = await api.post('/journal', { title: title || 'Untitled Reflection', content, mood });
        toast.success("Reflection saved.");
        fetchJournals();
        handleSelectEntry(res.data);
      }
    } catch (err) {
      toast.error("Failed to save entry.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("This memory will be permanently removed. Continue?")) {
      try {
        await api.delete(`/journal/${id}`);
        toast.success("Entry removed.");
        fetchJournals();
        setActiveEntry(null);
      } catch (err) {
        toast.error("Could not delete.");
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  const getMoodEmoji = (val) => {
    const option = MOOD_OPTIONS.find(o => o.v === val);
    return option ? option.e : '😐';
  };

  if (showIntro) return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-ink z-[200] flex flex-col items-center justify-center p-6"
    >
       <motion.div 
         initial={{ scale: 0.9, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ duration: 0.6 }}
         className="text-g text-5xl mb-6 font-heading"
       >
         🌙
       </motion.div>
       <motion.h1 
         initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.3 }}
         className="font-heading text-4xl md:text-5xl text-white tracking-widest"
       >
         Sleep Journal
       </motion.h1>
       <motion.div 
         initial={{ scaleX: 0 }}
         animate={{ scaleX: 1 }}
         transition={{ delay: 0.6, duration: 0.8 }}
         className="w-24 h-px bg-g/30 mt-6"
       />
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[calc(100vh-62px)] flex bg-ink/30"
    >
      {/* SIDEBAR */}
      <aside className="w-[320px] md:w-[380px] border-r border-g/10 bg-s1/60 backdrop-blur-[40px] flex flex-col h-[calc(100vh-62px)]">
         <div className="p-6 flex justify-between items-center border-b border-white/5">
            <h2 className="font-heading text-lg font-bold text-white tracking-wide">Reflections</h2>
            <button 
              onClick={handleCreateNew}
              className="w-9 h-9 rounded-full bg-g text-black flex items-center justify-center hover:bg-g2 transition-all shadow-lg hover:-translate-y-0.5"
            >
              <Plus size={18} />
            </button>
         </div>

         <div className="flex-1 overflow-y-auto no-scrollbar py-2">
            {journals.map(entry => (
              <div 
                key={entry._id}
                onClick={() => handleSelectEntry(entry)}
                className={`p-5 mx-3 mb-2 rounded-xl border cursor-pointer transition-all relative group ${
                  activeEntry?._id === entry._id 
                    ? 'bg-g/10 border-g/30' 
                    : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
              >
                 <div className="text-[10px] font-bold text-g/60 mb-1.5 uppercase tracking-wider">
                   {formatDate(entry.createdAt)}
                 </div>
                 <h3 className="font-body text-[14px] font-semibold text-white mb-1 line-clamp-1">
                   {entry.title || 'Untitled Reflection'}
                 </h3>
                 <p className="font-body text-[12px] text-[#8892B0] truncate opacity-70">
                   {entry.content}
                 </p>
                 <div className="absolute right-5 top-[50%] -translate-y-[50%] text-lg opacity-40 group-hover:opacity-100 transition-opacity">
                   {getMoodEmoji(entry.mood)}
                 </div>
              </div>
            ))}
            {journals.length === 0 && (
              <div className="py-20 text-center px-8">
                 <div className="text-4xl mb-4 opacity-20">📓</div>
                 <div className="text-[12px] font-medium text-[#4A5370] uppercase tracking-widest">Your story begins here.</div>
                 <button onClick={handleCreateNew} className="text-g text-[11px] font-bold mt-4 hover:underline">Start a new entry</button>
              </div>
            )}
         </div>
      </aside>

      {/* MAIN VIEW / EDITOR */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative">
        <AnimatePresence mode="wait">
        {(activeEntry || isEditing) ? (
          <motion.div 
            key={activeEntry?._id || 'new'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-[760px] mx-auto px-8 py-16"
          >
            <header className="flex justify-between items-center mb-12">
               <div className="text-[10px] font-bold text-[#8892B0] tracking-[3px] uppercase">
                 {activeEntry ? formatDate(activeEntry.createdAt) : 'New Entry • ' + formatDate(new Date())}
               </div>
               {activeEntry && !isEditing && (
                 <div className="flex gap-4">
                    <button onClick={() => setIsEditing(true)} className="btn-glass !py-1.5 !px-4 flex items-center gap-2"><Edit3 size={14} /> Edit</button>
                    <button onClick={() => handleDelete(activeEntry._id)} className="btn-glass !py-1.5 !px-4 !text-red-400 border-red-400/20 flex items-center gap-2 hover:bg-red-400/10"><Trash2 size={14} /> Delete</button>
                 </div>
               )}
            </header>

            <div className={`mb-8 ${isEditing ? 'border-b border-g/20 pb-2' : ''}`}>
              <input 
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 readOnly={!isEditing}
                 className="w-full bg-transparent border-none outline-none font-heading text-4xl md:text-5xl text-white placeholder:text-white/10"
                 placeholder="Title of your thought..."
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-10">
               {MOOD_OPTIONS.map(m => (
                 <button
                    key={m.v}
                    disabled={!isEditing}
                    onClick={() => setMood(m.v)}
                    title={m.l}
                    className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all border ${
                      mood === m.v 
                        ? 'bg-g/10 border-g/40 text-2xl animate-pulse' 
                        : 'bg-white/5 border-transparent opacity-40 hover:opacity-100'
                    }`}
                 >
                   {m.e}
                 </button>
               ))}
            </div>

            <div className="relative mb-20">
               <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  readOnly={!isEditing}
                  placeholder={`Write without judgment. \n\nHow do you feel? \nWhat's on your mind tonight?`}
                  className={`w-full bg-transparent border-none outline-none font-body text-lg text-[#8892B0] leading-relaxed min-h-[50vh] resize-none placeholder:text-white/5 ${!isEditing ? 'cursor-default' : 'italic'}`}
               />
               <style>{`textarea::placeholder { line-height: 1.8; } textarea { caret-color: #c9a84c; }`}</style>
            </div>

            {isEditing && (
              <div className="fixed bottom-8 right-8 flex gap-3 z-30">
                 <button onClick={() => activeEntry ? setIsEditing(false) : setActiveEntry(null)} className="btn-outline !bg-ink/80 !backdrop-blur-md">Cancel</button>
                 <button onClick={handleSave} className="btn-gold flex items-center gap-2"><Save size={16} /> Save Entry</button>
              </div>
            )}
            
            {!isEditing && (
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#4A5370] uppercase tracking-widest mt-20">
                <Lock size={12} className="text-g/50" /> End-to-end encrypted reflection vault
              </div>
            )}
          </motion.div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center px-12 opacity-30 select-none">
             <div className="w-24 h-24 rounded-full border border-g/10 flex items-center justify-center mb-8">
               <FileText size={40} className="text-g/30" />
             </div>
             <h3 className="font-heading text-2xl tracking-[4px] uppercase text-white mb-2">Select a Reflection</h3>
             <p className="text-[12px] uppercase tracking-widest text-[#8892B0]">Open your journal to begin</p>
          </div>
        )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
};

export default Journal;
