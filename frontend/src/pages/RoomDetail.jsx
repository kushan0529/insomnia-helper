import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import api from '../api';
import PostCard from '../components/dashboard/PostCard';
import PostComposer from '../components/dashboard/PostComposer';
import { toast } from 'react-hot-toast';
import { Users, LogIn, LogOut, MessageSquare, ShieldCheck, Activity, Moon } from 'lucide-react';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  
  const [room, setRoom] = useState(null);
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/rooms/${id}`);
        setRoom(res.data.room);
        setPosts(res.data.posts || []);
        setMembers(Array.isArray(res.data.room.members) ? res.data.room.members : []);
        setIsJoined(res.data.room.members?.some(m => m._id === user?._id));
      } catch (err) {
        toast.error("COULD NOT ENTER THIS SPACE.");
        navigate('/rooms');
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // Socket Connection
    const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5001');
    socket.emit('joinRoom', id);

    socket.on('roomNewPost', (post) => {
      setPosts(prev => [post, ...prev]);
    });

    socket.on('roomMemberUpdate', (updatedMembers) => {
      setMembers(Array.isArray(updatedMembers) ? updatedMembers : []);
    });

    return () => {
      socket.emit('leaveRoom', id);
      socket.disconnect();
    };
  }, [id, user?._id, navigate]);

  const handleJoinLeave = async () => {
    try {
      if (isJoined) {
        await api.post(`/rooms/${id}/leave`);
        setIsJoined(false);
        toast.success("LEFT THE CIRCLE.");
      } else {
        await api.post(`/rooms/${id}/join`);
        setIsJoined(true);
        toast.success("ENTERED THE CIRCLE.");
      }
    } catch (err) {
      toast.error("COULD NOT JOIN CIRCLE.");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
       <div className="flex flex-col items-center gap-6">
          <Activity className="text-fc-gold animate-pulse" size={48} />
          <div className="font-heading text-4xl text-fc-gold tracking-widest">ENTERING THE VOID...</div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen relative z-10 pt-[72px]">
      {/* ROOM HERO */}
      <section className="relative h-[30vh] flex items-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full"
            style={{ backgroundColor: room?.color || '#000', opacity: 0.15 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <div className="flex items-center gap-6 mb-4">
                <span className="text-6xl">{room?.emoji}</span>
                <span className="font-body text-[12px] text-white/40 tracking-[0.4em] uppercase">{room?.category}</span>
             </div>
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h1 className="font-heading text-6xl md:text-8xl text-white tracking-widest leading-none uppercase">{room?.name}</h1>
                <button 
                  onClick={handleJoinLeave}
                  className={`button-fight h-[56px] flex items-center gap-3 ${isJoined ? 'bg-fc-red shadow-fc-red/20' : ''}`}
                >
                  {isJoined ? <LogOut size={20} /> : <LogIn size={20} />}
                  {isJoined ? 'LEAVE CIRCLE' : 'JOIN THE CIRCLE'}
                </button>
             </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-[60px] flex flex-col lg:flex-row gap-12">
        {/* MAIN FEED */}
        <div className="flex-1 space-y-12">
           <div className="card-brutal border-fc-gold/10 !p-8 bg-fc-gold/[0.02]">
              <p className="font-body text-xl text-white/80 leading-relaxed italic">
                 "{room?.description}"
              </p>
           </div>

           {isJoined ? (
             <div className="space-y-4">
                <h3 className="font-heading text-xs text-fc-gold tracking-widest uppercase flex items-center gap-2">
                   <MessageSquare size={14} /> Speak to the room
                </h3>
                <PostComposer />
             </div>
           ) : (
             <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-2xl bg-white/[0.02]">
                <h2 className="font-heading text-3xl text-white/30 mb-4 uppercase">This is a protected circle.</h2>
                <p className="font-body text-white/20 uppercase tracking-widest mb-8">You must be a member to speak or listen here.</p>
                <button onClick={handleJoinLeave} className="button-fight">JOIN NOW</button>
             </div>
           )}

           <div className="space-y-8">
              <h3 className="font-heading text-xs text-white/40 tracking-widest uppercase">Room History</h3>
              <div className="space-y-6">
                 {posts.map(post => (
                    <PostCard key={post._id} post={post} currentUser={user} />
                 ))}
                 {posts.length === 0 && (
                    <div className="py-20 text-center border border-white/5 rounded-2xl opacity-20 bg-white/[0.01]">
                       <Moon className="mx-auto mb-6" size={48} />
                       <p className="font-heading text-2xl uppercase tracking-widest">No truth has been spoken yet.</p>
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* SIDEBAR */}
        <aside className="w-full lg:w-[360px] space-y-8">
           <div className="card-brutal border-white/5 !p-8">
              <h3 className="font-heading text-xs text-fc-gold tracking-widest uppercase mb-8 flex items-center justify-between">
                 <span>Current Circle</span>
                 <span className="text-white/20">{Array.isArray(members) ? members.length : 0}</span>
              </h3>
              <div className="space-y-6">
                 {Array.isArray(members) && members.map(member => (
                    <div key={member._id} className="flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-heading text-fc-gold group-hover:scale-110 transition-transform">
                             {member.username?.[0].toUpperCase()}
                          </div>
                          <div>
                             <div className="font-body text-[14px] text-white/80 group-hover:text-white uppercase tracking-wider">{member.username}</div>
                             <div className="text-[9px] text-green-500/50 flex items-center gap-1.5 tracking-tighter italic">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" /> 
                                LISTENING
                             </div>
                          </div>
                       </div>
                    </div>
                 ))}
                 <div className="pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3 text-white/20">
                       <Users size={14} />
                       <span className="text-[10px] font-body uppercase tracking-widest">124 others are lurking</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="card-brutal border-white/5 !p-8">
              <h3 className="font-heading text-xs text-fc-gold tracking-widest uppercase mb-6 flex items-center gap-2">
                 <ShieldCheck size={14} /> Security
              </h3>
              <div className="space-y-4">
                 <div className="flex flex-wrap gap-2">
                    {room?.tags?.map(tag => (
                       <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-body text-white/40 tracking-widest uppercase">
                          #{tag}
                       </span>
                    ))}
                 </div>
                 <p className="font-body text-[11px] text-white/20 leading-relaxed uppercase tracking-tighter">
                   This space is encrypted. Conversations are only held during current session.
                 </p>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default RoomDetail;
