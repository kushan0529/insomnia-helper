
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Eye, EyeOff, User, MessageCircle, AlertCircle } from 'lucide-react';
import { getShadowThoughts, postShadowThought, replyToShadowThought, requestReveal } from '../utils/shadowTalk';
import toast from 'react-hot-toast';

const ShadowTalk = () => {
  const { user } = useSelector(state => state.auth);
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
    postShadowThought(newThought, { name: user?.username || "Anonymous" });
    setNewThought("");
    refresh();
    toast.success("Thought cast into the shadows.");
  };

  const handleReply = (thoughtId) => {
    if (!replyContent.trim()) return;
    replyToShadowThought(thoughtId, replyContent, { name: user?.username || "Anonymous" });
    setReplyContent("");
    setActiveReply(null);
    refresh();
    toast.success("Anonymous reply sent.");
  };

  const handleReveal = (thoughtId, replyId) => {
    requestReveal(thoughtId, replyId, user?.username);
    refresh();
    toast.success("Identity reveal requested. If they also agree, you'll see each other.");
  };

  // Logic to determine if identity is revealed
  const isRevealed = (thought, replierId) => {
    // Current user is author, checking a specific replier
    // or Current user is replier, checking the author
    if (!user) return false;
    
    const currentUser = user.username;
    
    // Case 1: Checking reveal between Thought Author and a specific Reply Author
    if (replierId) {
        const reply = thought.replies.find(r => r.authorName === replierId || r.alias === replierId);
        if (!reply) return false;
        
        const authorWantsToRevealToReplier = thought.reveals.includes(reply.authorName);
        const replierWantsToRevealToAuthor = reply.reveals.includes(thought.authorName);
        
        return authorWantsToRevealToReplier && replierWantsToRevealToAuthor;
    }
    
    // Default: not revealed
    return false;
  };

  return (
    <div className="min-h-screen relative z-10 pt-[72px] pb-20 px-6 max-w-4xl mx-auto">
      <header className="mb-12 text-center mt-10">
        <h1 className="font-heading text-5xl md:text-7xl text-white tracking-tighter uppercase mb-2">
          SHADOW <span className="text-fc-gold">TALK</span>
        </h1>
        <p className="font-body text-white/40 uppercase tracking-[0.3em] text-sm">
          Blind support. True identities reveal only when both souls agree.
        </p>
      </header>

      {/* Input Section */}
      <div className="bg-[#1C1C1C] border border-white/10 p-6 rounded-xl mb-12 shadow-2xl">
        <form onSubmit={handlePost}>
          <textarea
            className="w-full bg-black/40 border border-white/5 rounded-lg p-4 text-white font-body placeholder:text-white/20 focus:outline-none focus:border-fc-gold/50 transition-all resize-none h-32"
            placeholder="Share a shadow thought... What's weighing you down?"
            value={newThought}
            onChange={(e) => setNewThought(e.target.value)}
          ></textarea>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest">
              <EyeOff size={14} /> Identity hidden by default
            </div>
            <button className="bg-fc-gold text-black font-heading px-8 py-2 rounded-sm hover:brightness-110 transition-all flex items-center gap-2">
              CAST THOUGHT <Send size={16} />
            </button>
          </div>
        </form>
      </div>

      {/* Feed Section */}
      <div className="space-y-8">
        {thoughts.map((thought) => (
          <motion.div
            key={thought.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1C1C1C]/60 border border-white/10 rounded-xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-fc-grey border border-white/10 flex items-center justify-center text-fc-gold">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-white tracking-wide">
                      {thought.authorName === user?.username ? "YOU (AUTHOR)" : thought.alias}
                    </h3>
                    <p className="text-[10px] text-white/20 uppercase tracking-widest">
                      {new Date(thought.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                {thought.authorName !== user?.username && (
                    <button 
                      onClick={() => handleReveal(thought.id)}
                      className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                        thought.reveals.includes(user?.username) 
                        ? 'bg-fc-gold text-black' 
                        : 'border border-white/10 text-white/40 hover:border-fc-gold/50 hover:text-white'
                      }`}
                    >
                      {thought.reveals.includes(user?.username) ? 'Reveal Requested' : 'Agree to Reveal'}
                    </button>
                )}
              </div>

              <p className="font-body text-white/80 leading-relaxed mb-6 text-lg">
                "{thought.content}"
              </p>

              <div className="flex items-center gap-4 text-white/40 border-t border-white/5 pt-4">
                <button 
                  onClick={() => setActiveReply(activeReply === thought.id ? null : thought.id)}
                  className="flex items-center gap-2 text-xs font-heading hover:text-fc-gold transition-colors"
                >
                  <MessageCircle size={16} /> {thought.replies.length} REPLIES
                </button>
              </div>
            </div>

            {/* Replies Section */}
            <AnimatePresence>
              {(activeReply === thought.id || thought.replies.length > 0) && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="bg-black/20 border-t border-white/5"
                >
                  <div className="p-6 space-y-6">
                    {thought.replies.map((reply) => {
                      const bothApproved = 
                        (thought.authorName === user?.username && thought.reveals.includes(reply.authorName) && reply.reveals.includes(user?.username)) ||
                        (reply.authorName === user?.username && reply.reveals.includes(thought.authorName) && thought.reveals.includes(reply.authorName));
                      
                      return (
                        <div key={reply.id} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-fc-grey border border-white/5 flex items-center justify-center text-white/20 shrink-0">
                            <User size={14} />
                          </div>
                          <div className="flex-grow">
                             <div className="flex justify-between items-center mb-1">
                                <span className={`text-[11px] font-heading tracking-widest ${bothApproved ? 'text-fc-gold' : 'text-white/40'}`}>
                                   {bothApproved ? (thought.authorName === user?.username ? reply.authorName : thought.authorName) : reply.alias}
                                   {bothApproved && " [REVEALED]"}
                                </span>
                                {reply.authorName !== user?.username && !bothApproved && (
                                    <button 
                                      onClick={() => handleReveal(thought.id, reply.id)}
                                      className="text-[9px] uppercase font-black text-white/20 hover:text-fc-gold transition-colors"
                                    >
                                      {reply.reveals.includes(user?.username) ? 'WAITING...' : 'REVEAL identity'}
                                    </button>
                                )}
                             </div>
                             <p className="font-body text-sm text-white/60">
                               {reply.content}
                             </p>
                          </div>
                        </div>
                      );
                    })}

                    {activeReply === thought.id && (
                      <div className="pt-4 flex gap-2">
                        <input
                          type="text"
                          className="flex-grow bg-black/40 border border-white/10 rounded px-4 py-2 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-fc-gold/30"
                          placeholder="Reply anonymously..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                        />
                        <button 
                          onClick={() => handleReply(thought.id)}
                          className="bg-fc-grey border border-white/10 p-2 rounded hover:bg-fc-gold hover:text-black transition-all"
                        >
                          <Send size={16} />
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
          <div className="text-center py-20 border border-dashed border-white/10 rounded-xl opacity-20">
             <AlertCircle size={40} className="mx-auto mb-4" />
             <p className="font-heading text-xl uppercase tracking-widest">The shadows are silent.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShadowTalk;
