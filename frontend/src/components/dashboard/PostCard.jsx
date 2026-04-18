import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { reactToStory, deleteStory, addReply } from '../../redux/slices/storySlice';
import styles from '../../pages/Dashboard.module.css';

const formatDistanceToNow = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "Y AGO";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "M AGO";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "D AGO";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "H AGO";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "M AGO";
  return Math.floor(seconds) + "S AGO";
};

const PostCard = ({ post, currentUser }) => {
  const [showFull, setShowFull] = useState(false);
  const [showTriggered, setShowTriggered] = useState(!post.isTriggerWarning);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState('');
  
  const dispatch = useDispatch();

  const moodColors = {
    'Hopeless': '#8b0000',
    'Angry': '#92400e',
    'Numb': '#374151',
    'Surviving': '#166534',
    'Fighting Back': '#c9a84c'
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.postCard}
    >
      <div className={styles.postHeader}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-heading text-fc-gold">
            {post.isAnonymous ? '?' : post.author?.username?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-sm text-fc-white">
                {post.isAnonymous ? 'ANONYMOUS OWL' : post.author?.username?.toUpperCase()}
              </span>
              <span 
                className="px-2 py-0.5 rounded-[2px] text-[9px] font-heading"
                style={{ backgroundColor: moodColors[post.mood] || '#333' }}
              >
                {post.mood?.toUpperCase()}
              </span>
            </div>
            <div className="text-[9px] opacity-40 font-mono">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }).toUpperCase()}
            </div>
          </div>
        </div>
        
        {post.isTriggerWarning && (
          <span className="bg-fc-red text-white px-2 py-0.5 text-[8px] font-heading tracking-widest">
            ⚠️ TRIGGER WARNING
          </span>
        )}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {!showTriggered ? (
            <motion.div 
              key="blurred"
              exit={{ opacity: 0 }}
              className="px-6 py-12 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md"
            >
              <div className="text-fc-red font-heading text-lg mb-4">CONTENT HIDDEN</div>
              <p className="text-[11px] font-mono opacity-60 mb-6 text-center">This post contains sensitive content that<br/>some may find distressing.</p>
              <button 
                onClick={() => setShowTriggered(true)}
                className="border border-fc-red text-fc-red px-6 py-2 font-heading text-xs hover:bg-fc-red hover:text-white transition-all"
              >
                SHOW CONTENT
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.postContent}
            >
              <p className="text-[15px] font-sans font-light leading-relaxed">
                {displayedContent}
                {isLong && !showFull && (
                   <button onClick={() => setShowFull(true)} className="ml-2 text-fc-gold font-heading text-[11px] underline">
                     READ MORE
                   </button>
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.postActions}>
        <button 
          onClick={handleReact}
          className="flex items-center gap-2 text-[11px] font-heading group hover:text-fc-red transition-colors"
        >
          <span className="text-sm group-active:scale-125 transition-transform">❤️</span>
          <span>{post.beenThereCount || 0} BEEN THERE</span>
        </button>
        <button 
           onClick={() => setShowReplies(!showReplies)}
           className="flex items-center gap-2 text-[11px] font-heading hover:text-fc-gold transition-colors"
        >
          <span className="text-sm">💬</span>
          <span>{post.replies?.length || 0} REPLIES</span>
        </button>
        
        {isAuthor && (
           <button 
             onClick={() => dispatch(deleteStory(post._id))}
             className="ml-auto opacity-30 hover:opacity-100 hover:text-fc-red transition-all"
           >
             🗑️
           </button>
        )}
      </div>

      <AnimatePresence>
        {showReplies && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6 overflow-hidden border-t border-white/5 pt-4 bg-white/[0.02]"
          >
            <div className="space-y-4 mb-6">
              {post.replies?.map((reply, idx) => (
                <div key={idx} className="flex gap-3">
                   <div className="w-6 h-6 rounded-full bg-fc-gold/20 flex items-center justify-center text-[10px] font-heading text-fc-gold">
                     {reply.author?.username?.[0] || '?'}
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-heading text-[10px] text-white/80">{reply.author?.username?.toUpperCase()}</span>
                        <span className="text-[8px] opacity-30">{formatDistanceToNow(new Date(reply.createdAt))}</span>
                      </div>
                      <p className="text-[12px] opacity-70 font-mono">{reply.content}</p>
                   </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleReply} className="flex gap-3">
               <input 
                 className="flex-1 bg-black/40 border border-white/10 px-4 py-2 text-[12px] font-mono outline-none focus:border-fc-gold transition-colors"
                 placeholder="SAY SOMETHING REAL..."
                 value={replyText}
                 onChange={(e) => setReplyText(e.target.value)}
               />
               <button className="bg-fc-gold text-black px-4 font-heading text-xs">REPLY</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.postGradientLine} />
    </motion.div>
  );
};

export default PostCard;
