import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-hot-toast';
import { Heart, MessageCircle, Plus, ArrowRight, Moon, Sparkles, Send, Shield, Info } from 'lucide-react';
import PostCard from '../components/dashboard/PostCard';
import PostComposer from '../components/dashboard/PostComposer';
import { useSelector } from 'react-redux';

const Stories = () => {
  const { user } = useSelector(state => state.auth || { user: null });
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComposer, setShowComposer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await api.get('/stories');
        setStories(res.data);
      } catch (err) {
        toast.error("The collective memory is temporarily obscured.");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="max-w-[840px] mx-auto px-6 py-12">
      {/* HEADER */}
      <header className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-g/5 border border-g/10 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-[3px] uppercase text-g mb-6"
        >
          <Sparkles size={14} /> Shared Truths
        </motion.div>
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 italic">
          Collective <span className="text-g">Voices</span>
        </h1>
        <p className="font-body text-[#8892B0] text-sm md:text-base leading-relaxed max-w-[500px] mx-auto">
          "Your stories are not yours alone. In sharing, we heal together." 
          Browse the reflections of fellow night-dwellers.
        </p>
      </header>

      {/* COMPOSER TRIGGER */}
      <div className="mb-12">
         {showComposer ? (
           <PostComposer />
         ) : (
           <button 
             onClick={() => setShowComposer(true)}
             className="w-full py-6 glass border-dashed border-white/10 text-[#4A5370] hover:text-g hover:border-g/30 transition-all flex flex-col items-center justify-center gap-2 group"
           >
              <Plus size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold uppercase tracking-[4px]">Release a new reflection</span>
           </button>
         )}
      </div>

      {/* FEED Section */}
      <section>
        {loading ? (
             <div className="space-y-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-[280px] glass animate-pulse rounded-3xl" />
                ))}
             </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {stories.map((story) => (
                   <PostCard key={story._id} post={story} currentUser={user} />
                ))}
              </AnimatePresence>
            </div>
          )}

        {!loading && stories.length === 0 && (
          <div className="text-center py-32 glass border-dashed border-white/5 opacity-50">
             <div className="w-16 h-16 rounded-full border border-current flex items-center justify-center mx-auto mb-6 text-g/30">
                <Moon size={32} />
             </div>
             <p className="font-heading text-xl font-bold uppercase tracking-widest text-[#4A5370]">The collective is quiet tonight</p>
          </div>
        )}
      </section>

      {/* FOOTER NOTE */}
      <div className="mt-20 flex items-center gap-4 p-6 glass border-g/10 bg-g/5 rounded-2xl">
         <Info size={20} className="text-g shrink-0" />
         <p className="text-[12px] text-[#8892B0] leading-relaxed">
           Reflections are shared with the global community. Always remember to use **Trigger Warnings** for sensitive topics to protect fellow members.
         </p>
      </div>
    </div>
  );
};

export default Stories;
