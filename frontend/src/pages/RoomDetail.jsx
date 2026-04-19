import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import api from '../api';
import PostCard from '../components/dashboard/PostCard';
import PostComposer from '../components/dashboard/PostComposer';
import { toast } from 'react-hot-toast';
import { Users, LogIn, LogOut, MessageSquare, ShieldCheck, Activity, Moon, Sparkles, ChevronLeft, Shield } from 'lucide-react';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth || { user: null });
  
  const [room, setRoom] = useState(null);
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/rooms/${id}`);
        const roomData = res.data;
        setRoom(roomData);
        setPosts(roomData.posts || []);
        setMembers(Array.isArray(roomData.members) ? roomData.members : []);
        setIsJoined(roomData.members?.some(m => (m._id || m) === user?._id));
      } catch (err) {
        toast.error("The sanctuary doors are locked.");
        navigate('/rooms');
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
    const socketUrl = apiUrl.replace('/api', '');
    const socket = io(socketUrl);
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
        toast.success("Departed from the circle.");
      } else {
        await api.post(`/rooms/${id}/join`);
        setIsJoined(true);
        toast.success("United with the circle.");
      }
    } catch (err) {
      toast.error("An error occurred during transition.");
    }
  };

  if (loading) return (
    <div className="min-h-[80vh] flex items-center justify-center">
       <div className="flex flex-col items-center gap-6">
          <Activity className="text-g animate-pulse" size={48} />
          <div className="font-heading text-4xl text-white tracking-[6px] uppercase italic">Opening Sanctuary...</div>
       </div>
    </div>
  );

  return (
    <div className="max-w-[1240px] mx-auto px-6 py-12">
      {/* NAVIGATION */}
      <button 
        onClick={() => navigate('/rooms')}
        className="flex items-center gap-2 text-[#4A5370] hover:text-g transition-all mb-8 text-[11px] font-bold uppercase tracking-[3px] group"
      >
        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Circles
      </button>

      {/* ROOM HERO */}
      <section className="glass rounded-[40px] overflow-hidden mb-12 border-g/10">
        <div className="relative h-[240px] md:h-[320px] bg-ink">
          <div 
             className="absolute inset-0 opacity-20"
             style={{ backgroundColor: room?.color || '#C9A84C' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
             <div className="flex items-center gap-4 mb-4">
                <span className="text-6xl drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">{room?.emoji}</span>
                <span className="text-[10px] font-bold text-g uppercase tracking-[5px] bg-g/10 px-3 py-1 rounded-full border border-g/20 backdrop-blur-md">
                   {room?.category}
                </span>
             </div>
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                   <h1 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight leading-none uppercase italic">
                     {room?.name}
                   </h1>
                </div>
                <button 
                  onClick={handleJoinLeave}
                  className={`btn-gold !h-[54px] !px-10 flex items-center gap-3 shadow-[0_15px_30px_rgba(201,168,76,0.15)] ${isJoined ? 'border-red-500/30 text-red-100 hover:bg-red-500/10' : ''}`}
                >
                  {isJoined ? <LogOut size={20} /> : <LogIn size={20} />}
                  <span className="font-bold tracking-widest">{isJoined ? 'DEPART CIRCLE' : 'JOIN SANCTUARY'}</span>
                </button>
             </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* MAIN FEED */}
        <div className="flex-1 space-y-10">
           <div className="glass p-8 md:p-12 border-white/5 bg-white/[0.02]">
              <p className="font-body text-xl md:text-2xl text-white/80 leading-relaxed italic text-center max-w-[600px] mx-auto">
                 "{room?.description}"
              </p>
           </div>

           {isJoined ? (
             <div className="space-y-4">
                <div className="flex items-center gap-3 ml-2">
                   <MessageSquare size={16} className="text-g" />
                   <h3 className="text-[10px] font-bold text-[#4A5370] tracking-[3px] uppercase">Speak to the room</h3>
                </div>
                <PostComposer roomId={id} />
             </div>
           ) : (
             <div className="py-20 text-center glass border-dashed border-white/5 bg-white/[0.01]">
                <Shield size={48} className="mx-auto text-g/20 mb-6" />
                <h2 className="font-heading text-3xl text-white mb-3 uppercase">This Sanctuary is Protected</h2>
                <p className="font-body text-[#4A5370] uppercase tracking-widest text-[11px] mb-8">Join the circle to participate in the collective conversation.</p>
                <button onClick={handleJoinLeave} className="btn-gold !px-12 !py-4">UNITE NOW</button>
             </div>
           )}

           <div className="space-y-6">
              <div className="flex items-center gap-3 ml-2">
                 <Activity size={16} className="text-[#4A5370]" />
                 <h3 className="text-[10px] font-bold text-[#4A5370] tracking-[3px] uppercase">Circle History</h3>
              </div>
              <div className="space-y-6">
                 {posts.map(post => (
                    <PostCard key={post._id} post={post} currentUser={user} />
                 ))}
                 {posts.length === 0 && (
                    <div className="py-32 text-center glass border-dashed border-white/5 opacity-30">
                       <Moon className="mx-auto mb-6 text-g" size={48} />
                       <p className="font-heading text-2xl uppercase tracking-[4px]">Silent as the night</p>
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* SIDEBAR */}
        <aside className="w-full lg:w-[320px] space-y-8">
           <div className="glass p-8 border-white/5">
              <h3 className="text-[10px] font-bold text-g tracking-[3px] uppercase mb-8 flex items-center justify-between">
                 <span>Sanctuary Souls</span>
                 <span className="bg-g/10 text-g px-2.5 py-1 rounded-lg text-[12px]">{Array.isArray(members) ? members.length : 0}</span>
              </h3>
              <div className="space-y-6">
                 {Array.isArray(members) && members.map(member => (
                    <div key={member._id} className="flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-xl bg-s1 border border-white/5 flex items-center justify-center font-heading text-g group-hover:bg-g group-hover:text-black transition-all">
                             {member.username?.[0].toUpperCase()}
                          </div>
                          <div>
                             <div className="font-body text-[14px] font-bold text-white/90 group-hover:text-white uppercase tracking-wider">{member.username}</div>
                             <div className="text-[8px] text-green-500/50 flex items-center gap-1.5 tracking-[2px] font-bold uppercase mt-0.5">
                                <span className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" /> 
                                Presence Active
                             </div>
                          </div>
                       </div>
                    </div>
                 ))}
                 <div className="pt-8 border-t border-white/5">
                    <div className="flex items-center gap-3 text-[#4A5370]">
                       <Users size={14} />
                       <span className="text-[9px] font-bold uppercase tracking-widest">Collective Presence Verified</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="glass p-8 border-white/5 bg-g/[0.02]">
              <h3 className="text-[10px] font-bold text-g tracking-[3px] uppercase mb-6 flex items-center gap-2">
                 <ShieldCheck size={14} /> Encryption Guard
              </h3>
              <div className="space-y-4">
                 <div className="flex flex-wrap gap-2">
                    {room?.tags?.map(tag => (
                       <span key={tag} className="px-2.5 py-1 bg-ink/50 border border-white/5 text-[9px] font-bold text-[#8892B0] tracking-widest uppercase rounded">
                          #{tag.toUpperCase()}
                       </span>
                    ))}
                 </div>
                 <p className="font-body text-[11px] text-[#4A5370] leading-relaxed italic">
                   Conversations in this sanctuary are ephemeral and protected by end-to-end identity shielding.
                 </p>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default RoomDetail;
