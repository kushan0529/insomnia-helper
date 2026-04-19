import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Eye, EyeOff, User, MessageCircle, AlertCircle, Sparkles, Shield, Lock } from 'lucide-react';
import { getShadowThoughts, postShadowThought, replyToShadowThought, requestReveal } from '../utils/shadowTalk';
import toast from 'react-hot-toast';

const ShadowTalk = () => {
  const { user } = useSelector(state => state.auth || { user: null });
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");
  const [activeReply, setActiveReply] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    setThoughts(getShadowThoughts());
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (!newThought.trim()) return;
    postShadowThought(newThought, { name: user?.username || "Anonymous Soul" });
    setNewThought("");
    refresh();
    toast.success("Reflection cast into the night.");
  };

  const handleReply = (thoughtId) => {
    if (!replyContent.trim()) return;
    replyToShadowThought(thoughtId, replyContent, { name: user?.username || "Anonymous Soul" });
    setReplyContent("");
    setActiveReply(null);
    refresh();
    toast.success("Replied from the shadows.");
  };

  const handleReveal = (thoughtId, replyId) => {
    requestReveal(thoughtId, replyId, user?.username);
    refresh();
    toast.success("Reveal requested. If they also agree, you'll see each other.", { icon: '🤝' });
  };

  return (
    <div className="max-w-[840px] mx-auto px-6 py-12">
      <header className="mb-12 text-center">
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-g mb-3 block">Collective Healing</span>
        <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 italic">
          Shadow <span className="text-g">Voices</span>
        </h1>
        <p className="text-[#8892B0] text-sm md:text-[15px] leading-relaxed max-w-[480px] mx-auto">
          Speak without fear. Identities are hidden by default and only reveal when both souls agree to unmask.
        </p>
      </header>

      {/* Input Section */}
      <div className="glass p-6 md:p-8 border-g/10 shadow-[0_32px_128px_rgba(0,0,0,0.4)] mb-12">
        <form onSubmit={handlePost}>
          <textarea
            className="w-full bg-s1/30 border border-white/5 rounded-2xl p-5 text-white font-body text-[15px] placeholder:text-[#4A5370] focus:outline-none focus:border-g/30 transition-all resize-none h-32 italic"
            placeholder="What is the weight on your mind tonight? Type freely, no one knows it's you..."
            value={newThought}
            onChange={(e) => setNewThought(e.target.value)}
          ></textarea>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div className="flex items-center gap-2 text-[10px] text-g/60 font-bold uppercase tracking-widest">
              <Lock size={14} className="opacity-50" /> End-to-end identity encryption active
            </div>
            <button className="btn-gold !py-2.5 !px-8 flex items-center gap-2 group">
              Cast Reflection <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>

      {/* Feed Section */}
      <div className="space-y-6">
        {thoughts.map((thought) => (
          <motion.div
            key={thought.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card border-white/5 overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-s1 border border-white/5 flex items-center justify-center text-g/40">
                    <User size={18} />
                  </div>
                  <div>
                    <h3 className="font-body text-[13px] font-bold text-white">
                      {thought.authorName === user?.username ? "You" : thought.alias}
                    </h3>
                    <p className="text-[10px] text-[#4A5370] font-bold uppercase tracking-wider">
                      {new Date(thought.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                {thought.authorName !== user?.username && (
                    <button 
                      onClick={() => handleReveal(thought.id)}
                      className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-2 transition-all border ${
                        thought.reveals.includes(user?.username) 
                        ? 'bg-g/10 border-g text-g shadow-[0_0_12px_rgba(201,168,76,0.1)]' 
                        : 'bg-transparent border-white/10 text-[#8892B0] hover:text-white hover:border-g/30'
                      }`}
                    >
                      {thought.reveals.includes(user?.username) ? <Sparkles size={12} /> : <EyeOff size={12} />}
                      {thought.reveals.includes(user?.username) ? 'Requested' : 'Agree to Reveal'}
                    </button>
                )}
              </div>

              <p className="font-body text-[#8892B0] leading-relaxed mb-8 text-[16px] italic">
                "{thought.content}"
              </p>

              <div className="flex items-center gap-6 border-t border-white/5 pt-6">
                <button 
                  onClick={() => setActiveReply(activeReply === thought.id ? null : thought.id)}
                  className="flex items-center gap-2 text-[11px] font-bold text-g uppercase tracking-widest hover:text-white transition-colors"
                >
                  <MessageCircle size={14} /> {thought.replies.length} Reflections
                </button>
              </div>
            </div>

            {/* Replies Section */}
            <AnimatePresence>
              {(activeReply === thought.id || thought.replies.length > 0) && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="bg-s1/20 border-t border-white/5"
                >
                  <div className="p-6 md:p-8 space-y-8">
                    {thought.replies.map((reply) => {
                      const bothApproved = 
                        (thought.authorName === user?.username && thought.reveals.includes(reply.authorName) && reply.reveals.includes(user?.username)) ||
                        (reply.authorName === user?.username && reply.reveals.includes(thought.authorName) && thought.reveals.includes(reply.authorName));
                      
                      return (
                        <div key={reply.id} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-s1 border border-white/5 flex items-center justify-center text-g/30 shrink-0">
                            <User size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                             <div className="flex justify-between items-center mb-1.5">
                                <span className={`text-[11px] font-bold uppercase tracking-wider ${bothApproved ? 'text-g' : 'text-[#4A5370]'}`}>
                                   {bothApproved ? (thought.authorName === user?.username ? reply.authorName : thought.authorName) : reply.alias}
                                   {bothApproved && " • Unmasked"}
                                </span>
                                {reply.authorName !== user?.username && !bothApproved && (
                                    <button 
                                      onClick={() => handleReveal(thought.id, reply.id)}
                                      className="text-[9px] uppercase font-bold text-g/40 hover:text-g transition-colors tracking-widest bg-g/5 px-2 py-0.5 rounded border border-g/10"
                                    >
                                      {reply.reveals.includes(user?.username) ? 'Waiting...' : 'Reveal Identity'}
                                    </button>
                                )}
                             </div>
                             <p className="font-body text-[14px] text-[#8892B0] leading-relaxed italic">
                               {reply.content}
                             </p>
                          </div>
                        </div>
                      );
                    })}

                    {activeReply === thought.id && (
                      <div className="pt-4 flex gap-3">
                        <input
                          type="text"
                          className="flex-grow bg-s1/40 border border-white/5 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-[#4A5370] focus:outline-none focus:border-g/30 transition-all italic"
                          placeholder="Speak from the night..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                        />
                        <button 
                          onClick={() => handleReply(thought.id)}
                          className="w-12 h-12 rounded-xl bg-g text-black flex items-center justify-center hover:bg-g2 transition-all shadow-lg shadow-g/10"
                        >
                          <Send size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {thoughts.length === 0 && (
          <div className="text-center py-24 glass-card border-dashed border-white/5 opacity-40">
             <div className="w-16 h-16 rounded-full border border-current flex items-center justify-center mx-auto mb-6 text-g/30">
                <Shield size={32} />
             </div>
             <p className="font-heading text-xl font-bold uppercase tracking-widest text-[#4A5370]">The shadows are peaceful tonight</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShadowTalk;
