import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-hot-toast';
import { Users, Moon, ArrowRight, Activity, Sparkles, MessageCircle, Heart } from 'lucide-react';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState('ALL SPACES');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const filters = ['ALL SPACES', 'NIGHT OWL 🌙', 'INSOMNIA', 'ANXIETY', 'DEPRESSION', 'RECOVERY'];

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get('/rooms');
        if (res.data && res.data.length > 0) {
          setRooms(res.data);
        } else {
          setRooms([
            { _id: 'demo1', name: 'THE 3AM CLUB', category: 'NIGHT OWL 🌙', emoji: '🦉', isNightOwlRoom: true, description: 'For those who find themselves awake when the world sleeps.', members: Array(42).fill({}) },
            { _id: 'demo2', name: 'ANXIETY SHIFT', category: 'ANXIETY', emoji: '🌪️', description: 'A safe space to share and manage racing thoughts together.', members: Array(18).fill({}) },
            { _id: 'demo3', name: 'DEEP HOLLOW', category: 'DEPRESSION', emoji: '🌑', description: 'When things feel heavy, you do not have to carry it alone.', members: Array(7).fill({}) },
            { _id: 'demo4', name: 'FIGHTERS CIRCLE', category: 'RECOVERY', emoji: '🥊', description: 'Fighting back against the shadows, one night at a time.', members: Array(12).fill({}) }
          ]);
        }
      } catch (err) {
        setRooms([
          { _id: 'demo1', name: 'THE 3AM CLUB', category: 'NIGHT OWL 🌙', emoji: '🦉', isNightOwlRoom: true, description: 'For those who find themselves awake when the world sleeps.', members: Array(42).fill({}) },
          { _id: 'demo2', name: 'ANXIETY SHIFT', category: 'ANXIETY', emoji: '🌪️', description: 'A safe space to share and manage racing thoughts together.', members: Array(18).fill({}) },
          { _id: 'demo3', name: 'DEEP HOLLOW', category: 'DEPRESSION', emoji: '🌑', description: 'When things feel heavy, you do not have to carry it alone.', members: Array(7).fill({}) },
          { _id: 'demo4', name: 'FIGHTERS CIRCLE', category: 'RECOVERY', emoji: '🥊', description: 'Fighting back against the shadows, one night at a time.', members: Array(12).fill({}) }
        ]);
        toast.error("Could not find the sanctuary circles, loading demo spaces.");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const isNightActive = () => {
    const hour = new Date().getHours();
    return hour >= 22 || hour < 4;
  };

  const filteredRooms = rooms.filter(room => {
    if (filter === 'ALL SPACES') return true;
    if (filter === 'NIGHT OWL 🌙') return room?.isNightOwlRoom;
    return room?.category?.toUpperCase()?.includes(filter.replace(' 🌙', '').toUpperCase());
  });

  return (
    <div className="max-w-[1240px] mx-auto px-6 py-12">
      {/* HEADER */}
      <header className="mb-16 text-center max-w-[700px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-g/5 border border-g/10 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-[3px] uppercase text-g mb-6"
        >
          <Users size={14} /> Shared Sanctuaries
        </motion.div>
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 italic">
          The <span className="text-g">Circles</span>
        </h1>
        <p className="font-body text-[#8892B0] text-sm md:text-base leading-relaxed">
          Safe, moderated spaces to connect with others on the same journey.
          Find your community and speak your truth in specialized support circles.
        </p>
      </header>

      {/* FILTER BAR */}
      <div className="mb-12 overflow-x-auto no-scrollbar pb-4 flex justify-center">
        <div className="flex gap-2 bg-s1/40 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-xl font-body text-[11px] font-bold tracking-widest transition-all ${filter === f
                  ? 'bg-g text-black shadow-[0_8px_20px_rgba(201,168,76,0.2)]'
                  : 'text-[#4A5370] hover:text-white hover:bg-white/5'
                } uppercase`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ROOMS GRID */}
      <section>
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-[320px] glass animate-pulse rounded-3xl" />
              ))}
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredRooms.map((room, idx) => (
                <motion.div
                  layout
                  key={room._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => navigate(`/rooms/${room._id}`)}
                  className="glass-card p-8 cursor-pointer group hover:border-g/30 flex flex-col h-[380px] justify-between transition-all"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-5xl group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_10px_15px_rgba(201,168,76,0.1)]">
                        {room.emoji}
                      </span>
                      {room.isNightOwlRoom && isNightActive() && (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-g/10 border border-g/30 text-g font-bold text-[9px] tracking-widest rounded-full animate-pulse uppercase">
                          <Activity size={10} /> Active Now
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-3xl font-bold text-white mb-2 leading-tight group-hover:text-g transition-colors">
                      {room.name}
                    </h3>
                    <div className="text-[10px] font-bold text-[#4A5370] tracking-[3px] uppercase mb-4">
                      {room.category}
                    </div>
                    <p className="font-body text-[14px] text-[#8892B0] leading-relaxed line-clamp-3 italic opacity-80 group-hover:opacity-100">
                      "{room.description}"
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-7 h-7 rounded-full border-2 border-ink bg-s1 flex items-center justify-center text-[10px] font-bold text-g/40">
                            {String.fromCharCode(65 + i + idx)}
                          </div>
                        ))}
                      </div>
                      <span className="font-body text-[10px] text-[#4A5370] font-bold uppercase tracking-widest">
                        {(room.members?.length || 0) + (idx * 3)} Enrolled
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-g/5 flex items-center justify-center text-g group-hover:bg-g group-hover:text-black transition-all">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && filteredRooms.length === 0 && (
          <div className="text-center py-32 glass border-dashed border-white/5 opacity-50">
            <div className="w-16 h-16 rounded-full border border-current flex items-center justify-center mx-auto mb-6 text-g/30">
              <Sparkles size={32} />
            </div>
            <p className="font-heading text-xl font-bold uppercase tracking-widest text-[#4A5370]">No matching circles found</p>
          </div>
        )}
      </section>

      {/* CALL TO ACTION */}
      <section className="mt-24 py-20 px-12 glass rounded-[40px] text-center bg-gradient-to-b from-g/[0.03] to-transparent border-g/10">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">Need a unique space?</h2>
        <p className="text-[#8892B0] mb-10 max-w-[500px] mx-auto leading-relaxed">
          Can't find the circle you're looking for? Reach out to our stewards to propose a new support topic.
        </p>
        <button className="btn-gold !px-10 !py-4 flex items-center gap-3 mx-auto group">
          <MessageCircle size={20} /> Propose a Circle
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </section>
    </div>
  );
};

export default Rooms;
