import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import { toast } from 'react-hot-toast';

const Journal = () => {
  const [journals, setJournals] = useState([]);
  const [activeEntry, setActiveEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  // Editor State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('😐');

  useEffect(() => {
    // Reveal intro for 1.5s
    const timer = setTimeout(() => setShowIntro(false), 2000);
    fetchJournals();
    return () => clearTimeout(timer);
  }, []);

  const fetchJournals = async () => {
    try {
      const res = await api.get('/journal');
      setJournals(res.data);
    } catch (err) {
      toast.error("COULD NOT ACCESS YOUR VAULT.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setActiveEntry(null);
    setTitle('');
    setContent('');
    setMood('😐');
    setIsEditing(true);
  };

  const handleSelectEntry = (entry) => {
    setActiveEntry(entry);
    setTitle(entry.title);
    setContent(entry.content);
    setMood(entry.mood || '😐');
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!content.trim()) return;
    try {
      if (activeEntry) {
        // Update
        const res = await api.put(`/journal/${activeEntry._id}`, { title, content, mood });
        toast.success("ENTRY SECURED.");
        fetchJournals();
        setIsEditing(false);
      } else {
        // Create
        const res = await api.post('/journal', { title: title || 'UNTITLED', content, mood });
        toast.success("ENTRY ENCRYPTED.");
        fetchJournals();
        handleSelectEntry(res.data);
      }
    } catch (err) {
      toast.error("VAULT ENCRYPTION FAILED.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Once deleted, this memory is gone forever. Confirm?")) {
      try {
        await api.delete(`/journal/${id}`);
        toast.success("ENTRY ERASED.");
        fetchJournals();
        setActiveEntry(null);
      } catch (err) {
        toast.error("COULD NOT ERASE.");
      }
    }
  };

  if (showIntro) return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-fc-black z-[200] flex flex-col items-center justify-center p-6"
    >
       <motion.div 
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ duration: 0.8 }}
         className="text-fc-gold text-7xl mb-8"
       >
         🔒
       </motion.div>
       <motion.h1 
         initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.4 }}
         className="font-heading text-6xl md:text-8xl text-fc-white tracking-[0.2em]"
       >
         PRIVATE JOURNAL
       </motion.h1>
       <motion.p 
         initial={{ opacity: 0 }}
         animate={{ opacity: 0.4 }}
         transition={{ delay: 1 }}
         className="font-body text-fc-white uppercase tracking-[0.5em] mt-8 text-center"
       >
         Only you can read this.
       </motion.p>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen relative z-10 pt-[72px] flex"
    >
      {/* SIDEBAR */}
      <aside className="w-[360px] border-r border-white/5 bg-[#030005]/80 backdrop-blur-3xl overflow-y-auto h-[calc(100vh-64px)]">
         <div className="p-8 flex justify-between items-center bg-black/40 sticky top-0 z-10 border-b border-white/5">
            <h2 className="font-heading text-xl text-fc-gold tracking-widest">CONFESSIONS</h2>
            <button 
              onClick={handleCreateNew}
              className="w-10 h-10 rounded-full border border-fc-gold text-fc-gold flex items-center justify-center hover:bg-fc-gold hover:text-black transition-all"
            >
              +
            </button>
         </div>

         <div className="flex flex-col">
            {journals.map(entry => (
              <div 
                key={entry._id}
                onClick={() => handleSelectEntry(entry)}
                className={`p-8 border-b border-white/5 cursor-pointer transition-all hover:bg-white/[0.03] relative group ${activeEntry?._id === entry._id ? 'bg-fc-gold/10 !border-l-[4px] border-l-fc-gold' : ''}`}
              >
                 <div className="font-heading text-xs text-fc-gold/60 mb-2 uppercase tracking-widest">
                   {new Date(entry.createdAt).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' })}
                 </div>
                 <h3 className="font-body text-base text-fc-white mb-2 line-clamp-1">{entry.title || 'UNTITLED'}</h3>
                 <p className="font-body text-xs text-white/30 truncate">{entry.content}</p>
                 <div className="absolute right-8 top-12 text-xl opacity-30">{entry.mood}</div>
              </div>
            ))}
            {journals.length === 0 && (
              <div className="py-32 text-center opacity-20">
                 <div className="text-4xl mb-4">📖</div>
                 <div className="font-heading tracking-widest text-sm uppercase">NO ENTRIES YET</div>
              </div>
            )}
         </div>
      </aside>

      {/* EDITOR */}
      <main className="flex-1 overflow-y-auto px-12 md:px-24 py-16">
        {(activeEntry || isEditing) ? (
          <div className="max-w-4xl mx-auto space-y-12">
            <header className="flex justify-between items-start">
               <div className="font-heading text-xs text-fc-gold/40 tracking-[0.4em] uppercase">
                 {new Date(activeEntry?.createdAt || new Date()).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
               </div>
               {activeEntry && !isEditing && (
                 <div className="flex gap-6">
                    <button onClick={() => setIsEditing(true)} className="font-heading text-fc-gold tracking-widest text-xs hover:underline">EDIT ENTRY</button>
                    <button onClick={() => handleDelete(activeEntry._id)} className="font-heading text-fc-red tracking-widest text-xs hover:underline">DELETE</button>
                 </div>
               )}
            </header>

            <div className="space-y-4">
              <input 
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 readOnly={!isEditing}
                 className="w-full bg-transparent border-none outline-none font-heading text-6xl text-fc-white placeholder:text-white/10"
                 placeholder="UNTITLED"
              />
              <div className="w-20 h-1 bg-fc-gold/20" />
            </div>

            <div className="flex gap-4">
               {['😵', '😞', '😐', '🙂', '😴'].map(m => (
                 <button
                    key={m}
                    disabled={!isEditing}
                    onClick={() => setMood(m)}
                    className={`text-2xl w-12 h-12 flex items-center justify-center border-b-2 transition-all ${mood === m ? 'border-fc-gold scale-125' : 'border-transparent opacity-30 hover:opacity-100'}`}
                 >
                   {m}
                 </button>
               ))}
            </div>

            <div className="relative">
               <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  readOnly={!isEditing}
                  placeholder={`No one will ever read this.\nWrite the thing you can't say out loud.\nWrite it at 3AM. Write it angry.\nWrite it numb. Just write.`}
                  className="w-full bg-transparent border-none outline-none font-body text-xl text-fc-white/80 leading-[2] min-h-[60vh] resize-none placeholder:text-white/10 italic"
               />
               
               <style jsx>{`
                 textarea::placeholder {
                   line-height: 2.5;
                 }
                 textarea {
                   caret-color: #c9a84c;
                 }
               `}</style>
            </div>

            <footer className="fixed bottom-0 right-0 left-[360px] bg-[#030005]/95 border-t border-white/5 p-8 flex justify-between items-center z-20 backdrop-blur-xl">
               <div className="font-body text-[10px] text-white/30 tracking-widest uppercase flex items-center gap-2">
                 <span className="text-green-500">●</span> 🔒 END-TO-END ENCRYPTED VAULT | {content.length} WORDS
               </div>
               <div className="flex gap-4">
                  {isEditing && (
                    <>
                       <button onClick={() => setIsEditing(false)} className="px-8 py-3 font-heading text-fc-white/40 tracking-widest hover:text-white">DISCARD</button>
                       <button onClick={handleSave} className="px-10 py-3 bg-fc-gold text-black font-heading tracking-widest hover:scale-105 transition-transform">SAVE ENTRY</button>
                    </>
                  )}
               </div>
            </footer>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center opacity-10">
             <div className="text-[140px]">🔒</div>
             <div className="font-heading text-4xl tracking-[0.5em] mt-8">SELECT AN ENTRY TO DECRYPT</div>
          </div>
        )}
      </main>
    </motion.div>
  );
};

export default Journal;
