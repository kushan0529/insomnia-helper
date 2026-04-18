import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Plus, ArrowRight, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get(`${API_URL}/stories`);
        setStories(res.data);
      } catch (err) { 
        console.error(err); 
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [API_URL]);

  return (
    <div className="min-h-screen relative z-10 pt-[72px]">
      {/* HERO SECTION */}
      <section className="relative h-[50vh] flex items-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img 
            src="/photos/photo3.jpg" 
            className="w-full h-full object-cover filter contrast-[1.2] saturate-[0.1] brightness-[0.3]" 
            alt="Stories Hero" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-6xl md:text-9xl text-white tracking-widest leading-none">THE CIRCLE</h1>
            <p className="font-body text-fc-gold text-lg tracking-[0.4em] uppercase mt-4">
              "Your stories are not yours. They belong to everyone."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ACTION BAR */}
      <div className="sticky top-[72px] z-20 bg-black/80 backdrop-blur-xl border-b border-white/10 py-6">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex gap-8">
            <button className="font-heading text-[13px] text-fc-gold tracking-widest border-b border-fc-gold pb-1 uppercase">LATEST TRUTH</button>
            <button className="font-heading text-[13px] text-white/40 tracking-widest hover:text-white transition-colors uppercase">MOST FELT</button>
          </div>
          <Link to="/post-story" className="button-fight text-[13px] flex items-center gap-2">
            <Plus size={16} /> RELEASE A STORY
          </Link>
        </div>
      </div>

      {/* STORIES GRID */}
      <section className="py-[80px] max-w-[1200px] mx-auto px-6 md:px-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[400px] bg-white/5 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {stories.map((story, i) => (
                <motion.div
                  key={story._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card-brutal flex flex-col group hover:border-fc-gold/20 transition-all border-white/5"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-body text-[10px] text-fc-gold tracking-widest uppercase px-3 py-1 bg-fc-gold/10 rounded-full">
                      {story.mood || 'STORY'}
                    </span>
                    <span className="font-body text-[10px] text-white/30 tracking-widest uppercase">
                      {story.isAnonymous ? 'ANONYMOUS' : story.author?.username}
                    </span>
                  </div>

                  <h3 className="font-heading text-3xl text-white mb-4 line-clamp-2 uppercase group-hover:text-fc-gold transition-colors tracking-tight">
                    {story.title}
                  </h3>

                  <p className="font-body text-[15px] text-white/60 leading-relaxed mb-8 flex-grow line-clamp-4">
                    {story.content}
                  </p>

                  <div className="flex items-center justify-between border-t border-white/5 pt-6">
                    <button className="flex items-center gap-2 font-heading text-lg text-white/40 hover:text-fc-red transition-colors">
                      <Heart size={18} className="text-fc-red/40" /> {story.beenThereCount || 0}
                    </button>
                    <Link to={`/stories/${story._id}`} className="flex items-center gap-2 font-heading text-lg text-fc-gold/60 hover:text-fc-gold transition-colors">
                      READ <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && stories.length === 0 && (
          <div className="text-center py-40 border border-dashed border-white/10 rounded-xl">
             <Moon className="mx-auto text-white/10 mb-6" size={60} />
             <h2 className="font-heading text-4xl text-white/40 mb-4 uppercase">The circle is quiet.</h2>
             <p className="font-body text-white/20 uppercase tracking-[0.2em]">Silence is also a copy.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Stories;
