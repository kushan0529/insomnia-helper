
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Moon, Share2, Clipboard } from 'lucide-react';
import toast from 'react-hot-toast';

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axios.get(`${API_URL}/stories/${id}`);
        setStory(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Story not found in the void.");
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [id, API_URL]);

  const handleCopy = () => {
    navigator.clipboard.writeText(story.content);
    toast.success("Copied to clipboard.");
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-fc-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!story) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
       <Moon className="text-white/20 mb-6" size={60} />
       <h1 className="font-heading text-4xl uppercase">Fragment Lost</h1>
       <Link to="/stories" className="text-fc-gold mt-4 uppercase underline tracking-widest">Return to The Circle</Link>
    </div>
  );

  return (
    <div className="min-h-screen relative z-10 pt-[72px] pb-20">
      <section className="max-w-[800px] mx-auto px-6 mt-12">
        <Link to="/stories" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors uppercase font-heading tracking-widest mb-12">
          <ArrowLeft size={16} /> Back to The Circle
        </Link>
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-[#1C1C1C] border border-white/10 p-12 rounded-2xl shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Moon size={200} />
          </div>

          <header className="mb-12 relative z-10">
             <div className="flex justify-between items-center mb-6">
                <span className="bg-fc-gold/10 text-fc-gold px-4 py-1 rounded-full font-body text-[10px] uppercase tracking-widest">
                  {story.mood || 'STORY'}
                </span>
                <span className="text-white/20 font-body text-[10px] uppercase tracking-widest">
                  RECORDED {new Date(story.createdAt).toLocaleDateString()}
                </span>
             </div>
             <h1 className="font-heading text-5xl md:text-7xl text-white tracking-tighter leading-tight uppercase">
                {story.title}
             </h1>
             <p className="font-body text-fc-gold/60 text-sm mt-4 uppercase tracking-[0.3em]">
                {story.isAnonymous ? "ANONYMOUS RECRUIT" : `POSTED BY ${story.author?.username}`}
             </p>
          </header>

          <div className="w-full h-px bg-white/5 mb-12" />

          <article className="font-body text-xl text-white/80 leading-relaxed mb-16 relative z-10 whitespace-pre-wrap">
             {story.content}
          </article>

          <footer className="pt-12 border-t border-white/5 flex flex-wrap gap-6 items-center justify-between">
             <div className="flex gap-6">
                <button className="flex items-center gap-2 text-fc-red font-heading text-lg group">
                   <Heart size={20} className="group-hover:fill-fc-red transition-all" /> 
                   {story.beenThereCount || 0} <span className="text-white/20 text-sm">BEEN THERE</span>
                </button>
                <button onClick={handleCopy} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors font-heading text-lg">
                   <Clipboard size={18} /> COPY
                </button>
             </div>
             
             <button className="flex items-center gap-2 text-fc-gold font-heading text-lg hover:brightness-110">
                <Share2 size={18} /> BROADCAST
             </button>
          </footer>
        </motion.div>
      </section>
    </div>
  );
};

export default StoryDetail;
