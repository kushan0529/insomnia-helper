import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { reactToStory, deleteStory, addReply } from '../../redux/slices/storySlice';
import { Heart, MessageCircle, Reply, Trash2, ShieldAlert, Sparkles, Send, Eye } from 'lucide-react';

const formatDistanceToNow = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "m ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
};

const PostCard = ({ post, currentUser }) => {
  const [showFull, setShowFull] = useState(false);
  const [showTriggered, setShowTriggered] = useState(!post.isTriggerWarning);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState('');
  
  const dispatch = useDispatch();

  const moodConfig = {
    'Hopeless': { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.2)', text: '#ef4444' },
    'Angry': { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.2)', text: '#f59e0b' },
    'Numb': { bg: 'rgba(107, 114, 128, 0.1)', border: 'rgba(107, 114, 128, 0.2)', text: '#9ca3af' },
    'Surviving': { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.2)', text: '#10b981' },
    'Fighting Back': { bg: 'rgba(201, 168, 76, 0.1)', border: 'rgba(201, 168, 76, 0.2)', text: '#C9A84C' }
  };

  const isAuthor = currentUser?._id === post.author?._id;
  const content = post.content || '';
  const isLong = content.length > 200;
  const displayedContent = showFull || !isLong ? content : content.substring(0, 200) + '...';

  const handleReact = () => {
    dispatch(reactToStory(post._id));
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    await dispatch(addReply({ storyId: post._id, replyData: { content: replyText } }));
    setReplyText('');
  };

  const config = moodConfig[post.mood] || moodConfig['Numb'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card mb-8 overflow-hidden group hover:border-g/20 transition-all shadow-[0_32px_128px_rgba(0,0,0,0.3)]"
    >
      {/* CARD HEADER */}
      <header className="p-6 md:px-8 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-ink/80 border border-white/10 flex items-center justify-center font-heading text-g shadow-lg group-hover:scale-105 transition-transform duration-500">
            {post.isAnonymous ? '?' : post.author?.username?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-0.5">
              <span className="font-heading text-[15px] font-bold text-white tracking-wide">
                {post.isAnonymous ? 'Anonymous Member' : post.author?.username?.toUpperCase()}
              </span>
              <span 
                className="px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase"
                style={{ backgroundColor: config.bg, color: config.text, border: `1px solid ${config.border}` }}
              >
                {post.mood}
              </span>
            </div>
            <div className="text-[10px] text-[#4A5370] font-bold uppercase tracking-widest">
              {formatDistanceToNow(new Date(post.createdAt))}
            </div>
          </div>
        </div>
        
        {post.isTriggerWarning && (
          <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-500 px-3 py-1 rounded-full text-[8px] font-bold tracking-[2px] uppercase animate-pulse">
            <ShieldAlert size={10} /> Content Warning
          </div>
        )}
      </header>

      {/* CARD CONTENT */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {!showTriggered ? (
            <motion.div 
              key="blurred"
              exit={{ opacity: 0 }}
              className="px-8 py-16 flex flex-col items-center justify-center bg-ink/60 backdrop-blur-3xl"
            >
               <ShieldAlert size={40} className="text-red-500/40 mb-4" />
               <div className="text-white font-heading text-xl mb-2 italic">Sensitive Content</div>
               <p className="text-[11px] text-[#8892B0] font-bold uppercase tracking-[2px] mb-8 text-center max-w-[280px]">
                 This reflection contains themes that may be distressing to some souls.
               </p>
               <button 
                 onClick={() => setShowTriggered(true)}
                 className="btn-gold !py-2 !px-8 text-[11px]"
               >
                 VIEW REFLECTION
               </button>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 md:px-10 md:py-10"
            >
              <p className="font-body text-[16px] md:text-[18px] text-[#8892B0] leading-[1.7] italic">
                "{displayedContent}"
              </p>
              {isLong && !showFull && (
                 <button onClick={() => setShowFull(true)} className="mt-4 text-g font-bold text-[11px] hover:underline uppercase tracking-widest flex items-center gap-2">
                   Reveal Full Truth <Eye size={12} />
                 </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CARD ACTIONS */}
      <footer className="px-6 md:px-8 py-5 flex items-center gap-8 bg-white/[0.01] border-t border-white/5">
        <button 
          onClick={handleReact}
          className="flex items-center gap-2 text-[10px] font-bold text-g uppercase tracking-widest group/btn hover:text-white transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-g/5 flex items-center justify-center group-hover/btn:bg-g group-hover/btn:text-black transition-all">
             <Heart size={14} fill={post.beenThereCount > 0 ? "currentColor" : "none"} />
          </div>
          <span>{post.beenThereCount || 0} Solidarity</span>
        </button>
        
        <button 
           onClick={() => setShowReplies(!showReplies)}
           className="flex items-center gap-2 text-[10px] font-bold text-[#8892B0] uppercase tracking-widest group/btn hover:text-white transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-white/10 transition-all">
             <MessageCircle size={14} />
          </div>
          <span>{post.replies?.length || 0} Perspectives</span>
        </button>
        
        {isAuthor && (
           <button 
             onClick={() => dispatch(deleteStory(post._id))}
             className="ml-auto w-8 h-8 flex items-center justify-center text-red-400/30 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all"
           >
             <Trash2 size={16} />
           </button>
        )}
      </footer>

      {/* REPLIES DRAWER */}
      <AnimatePresence>
        {showReplies && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 md:px-10 pb-8 overflow-hidden bg-white/[0.02] border-t border-white/5 pt-8"
          >
            <div className="space-y-6 mb-10">
              {post.replies?.map((reply, idx) => (
                <div key={idx} className="flex gap-4 group/reply">
                   <div className="w-8 h-8 rounded-lg bg-g/10 border border-g/20 flex items-center justify-center text-[11px] font-bold text-g shrink-0">
                     {reply.author?.username?.[0] || '?'}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-heading text-[13px] font-bold text-white/90 uppercase tracking-widest">{reply.author?.username}</span>
                        <span className="text-[9px] text-[#4A5370] font-bold">{formatDistanceToNow(new Date(reply.createdAt))}</span>
                      </div>
                      <p className="text-[14px] text-[#8892B0] leading-relaxed italic opacity-80 group-hover/reply:opacity-100 transition-opacity">
                        "{reply.content}"
                      </p>
                   </div>
                </div>
              ))}
              {post.replies?.length === 0 && (
                <div className="text-center py-6 text-[10px] font-bold text-[#4A5370] uppercase tracking-[3px]">
                   No one has spoken back yet.
                </div>
              )}
            </div>

            <form onSubmit={handleReply} className="flex gap-3 pt-4 border-t border-white/5">
               <input 
                 className="flex-1 bg-ink/40 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-[#4A5370] outline-none focus:border-g/30 transition-all italic"
                 placeholder="Offer your perspective to the night..."
                 value={replyText}
                 onChange={(e) => setReplyText(e.target.value)}
               />
               <button className="w-12 h-12 bg-g rounded-xl flex items-center justify-center text-black hover:bg-g2 transition-all shadow-lg shadow-g/10">
                 <Send size={18} />
               </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PostCard;
