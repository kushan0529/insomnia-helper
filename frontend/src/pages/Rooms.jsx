import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-hot-toast';
import { Users, Moon, ArrowRight, Activity } from 'lucide-react';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState('ALL ROOMS');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const filters = ['ALL ROOMS', 'NIGHT OWL 🌙', 'INSOMNIA', 'ANXIETY', 'DEPRESSION', 'RECOVERY'];

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get('/rooms');
        setRooms(res.data);
      } catch (err) {
        toast.error("COULD NOT FIND THE CIRCLE.");
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
    if (filter === 'ALL ROOMS') return true;
    if (filter === 'NIGHT OWL 🌙') return room.isNightOwlRoom;
    return room.category.toUpperCase().includes(filter.replace(' 🌙', ''));
  });

  return (
    <div className="min-h-screen relative z-10 pt-[72px]">
      {/* HERO SECTION */}
      <section className="relative h-[40vh] flex items-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img 
            src="/photos/photo4.jpg" 
            className="w-full h-full object-cover filter contrast-[1.2] saturate-[0.2] brightness-[0.3]" 
            alt="Rooms Hero" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-6xl md:text-9xl text-white tracking-widest leading-none">THE CIRCLES</h1>
            <p className="font-body text-fc-gold text-lg tracking-[0.4em] uppercase mt-4">
              Real-world support for the ones who can't sleep.
            </p>
            <div className="flex items-center gap-3 mt-6 text-white/40 font-body text-[13px] tracking-widest">
               <Activity size={16} className="text-fc-red animate-pulse" />
               <span className="uppercase text-fc-red font-bold">124 MEMBERS AWAKE NOW</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="sticky top-[72px] z-20 bg-black/80 backdrop-blur-xl border-b border-white/10 py-6">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full font-body text-[12px] tracking-widest transition-all border ${
                  filter === f 
                  ? 'bg-fc-gold text-black border-fc-gold shadow-lg shadow-fc-gold/10' 
                  : 'bg-transparent text-white/40 border-white/10 hover:border-white/30'
                } uppercase`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ROOMS GRID */}
      <section className="py-[80px] max-w-[1200px] mx-auto px-6 md:px-12">
        <AnimatePresence mode="popLayout">
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-[240px] bg-white/5 animate-pulse rounded-2xl" />
                ))}
             </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredRooms.map((room, idx) => (
                <motion.div
                  layout
                  key={room._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => navigate(`/rooms/${room._id}`)}
                  className="card-brutal group border-white/5 hover:border-fc-gold/20 flex flex-col h-[280px] justify-between cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-5">
                       <span className="text-5xl group-hover:scale-110 transition-transform">{room.emoji}</span>
                       <div>
                          <h3 className="font-heading text-4xl text-white uppercase tracking-tight">{room.name}</h3>
                          <span className="font-body text-[11px] text-white/40 uppercase tracking-[0.2em]">{room.category}</span>
                       </div>
                    </div>
                    {room.isNightOwlRoom && isNightActive() && (
                      <div className="px-3 py-1 bg-fc-red/10 border border-fc-red/30 text-fc-red font-body text-[10px] tracking-widest animate-pulse">
                        LIVE NOW
                      </div>
                    )}
                  </div>

                  <p className="font-body text-[15px] text-white/60 leading-relaxed line-clamp-3 mt-6">
                    {room.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                       <Users size={16} className="text-fc-gold" />
                       <span className="font-body text-[12px] text-white/40 uppercase">
                         {room.members?.length + (idx * 3)} MEMBERS IN CIRCLE
                       </span>
                    </div>
                    <span className="font-heading text-xl text-fc-gold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                      ENTER <ArrowRight size={18} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Rooms;
