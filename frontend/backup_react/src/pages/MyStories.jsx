import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import api from '../api';
import { deleteStory } from '../redux/slices/storySlice';
import { toast } from 'react-hot-toast';
import { Trash2, Edit3, MessageSquare, Heart, Plus } from 'lucide-react';

const MyStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyStories = async () => {
      try {
        const res = await api.get('/stories?author=me');
        setStories(res.data);
      } catch (err) {
        toast.error("COULD NOT RECALL YOUR STORIES.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyStories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Once gone, it's gone forever. Delete this confession?")) {
      try {
        await dispatch(deleteStory(id));
        setStories(stories.filter(s => s._id !== id));
        toast.success("STORY ERASED.");
      } catch (err) {
        toast.error("COULD NOT ERASE.");
      }
    }
  };

  const moodColors = {
    'Hopeless': '#8b0000',
    'Angry': '#92400e',
    'Numb': '#374151',
    'Surviving': '#166534',
    'Fighting Back': '#c9a84c'
  };

  return (
    <div className="min-h-screen relative z-10 pt-[72px]">
      {/* HERO SECTION */}
      <section className="relative h-[40vh] flex items-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img 
            src="/photos/photo3.jpg" 
            className="w-full h-full object-cover filter contrast-[1.2] saturate-[0] brightness-[0.2]" 
            alt="My Stories Hero" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
        
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-6xl md:text-9xl text-white tracking-widest leading-none">YOUR TRUTH</h1>
            <p className="font-body text-fc-gold text-lg tracking-[0.4em] uppercase mt-4">Everything you shared with the circle.</p>
            
            <div className="flex gap-12 mt-10 border-l border-fc-gold/30 pl-8">
               <div className="flex flex-col">
                  <span className="font-heading text-4xl text-white">{stories.length}</span>
                  <span className="font-body text-[10px] text-white/40 tracking-widest uppercase">Confessions</span>
               </div>
               <div className="flex flex-col">
                  <span className="font-heading text-4xl text-white">
                    {stories.reduce((acc, s) => acc + (s.beenThereCount || 0), 0)}
                  </span>
                  <span className="font-body text-[10px] text-white/40 tracking-widest uppercase">Been Theres</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ACTION BAR */}
      <div className="sticky top-[72px] z-20 bg-black/80 backdrop-blur-xl border-b border-white/10 py-6">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <h2 className="font-heading text-[13px] text-white/40 tracking-widest uppercase">Manage Stories</h2>
          <Link to="/post-story" className="button-fight text-[13px] flex items-center gap-2">
            <Plus size={16} /> NEW CONFESSION
          </Link>
        </div>
      </div>

      {/* STORIES MASONRY */}
      <section className="py-[80px] max-w-[1200px] mx-auto px-6 md:px-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-64 bg-white/5 animate-pulse rounded-2xl" />)}
          </div>
        ) : stories.length === 0 ? (
          <div className="py-40 text-center flex flex-col items-center border border-dashed border-white/10 rounded-2xl">
             <Moon className="text-white/10 mb-8" size={64} />
             <h2 className="font-heading text-4xl text-white/40 mb-4 uppercase">You haven't spoken yet.</h2>
             <Link to="/post-story" className="button-fight mt-4">SHARE YOUR FIRST STORY</Link>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <AnimatePresence>
              {stories.map((story, idx) => (
                <motion.div
                  key={story._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="break-inside-avoid card-brutal border-white/5 group hover:border-fc-gold/20 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span 
                      className="px-3 py-1 text-[10px] font-body text-white uppercase tracking-widest rounded-full"
                      style={{ backgroundColor: moodColors[story.mood] || '#333' }}
                    >
                      {story.mood?.toUpperCase() || 'GENERAL'}
                    </span>
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => navigate(`/stories/edit/${story._id}`)} className="text-white/40 hover:text-fc-gold transition-colors">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => handleDelete(story._id)} className="text-white/40 hover:text-fc-red transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-heading text-3xl text-white mb-4 uppercase leading-tight tracking-tight">
                    {story.title || "UNTITLED"}
                  </h3>
                  
                  <p className="font-body text-[15px] text-white/60 leading-relaxed mb-8">
                    {story.content}
                  </p>

                  <div className="flex items-center gap-6 border-t border-white/5 pt-6">
                    <div className="flex items-center gap-2 font-body text-[11px] text-fc-red tracking-widest uppercase">
                       <Heart size={14} /> {story.beenThereCount || 0}
                    </div>
                    <div className="flex items-center gap-2 font-body text-[11px] text-white/30 tracking-widest uppercase">
                       <MessageSquare size={14} /> {story.replies?.length || 0}
                    </div>
                    <div className="ml-auto text-[10px] font-body text-white/20 uppercase tracking-widest italic">
                      {new Date(story.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyStories;
