import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageCircle, Heart, Moon, Users, Shield } from 'lucide-react';
import api from '../api';

const Home = () => {
  const navigate = useNavigate();
  const [recentStories, setRecentStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await api.get('/stories');
        // Get only the first 3
        setRecentStories(res.data.slice(0, 3));
      } catch (err) {
        console.error("Home feed fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  const navTo = (pg) => navigate('/' + pg);

  const toolkit = [
    { ic: '💭', tit: 'Mood Check', path: 'mood' },
    { ic: '🧠', tit: 'CBT Program', path: 'programs' },
    { ic: '👥', tit: 'Circles', path: 'rooms' },
    { ic: '📓', tit: 'Journal', path: 'journal' },
    { ic: '🏛️', tit: 'The Collective', path: 'stories' },
    { ic: '👤', tit: 'Profile', path: 'profile' }
  ];

  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="min-h-[95vh] flex items-center justify-center text-center p-6 md:p-12 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.08)_0,transparent_70%)] pointer-events-none" />

        <div className="max-w-[840px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-g/10 border border-g/20 rounded-full px-5 py-2 text-[10px] font-semibold tracking-[3px] uppercase text-g mb-12 shadow-[0_0_20px_rgba(201,168,76,0.1)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-g animate-pulse" />
            The Sanctuary is Open
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-heading text-6xl md:text-[116px] font-bold leading-[0.85] tracking-tighter mb-10 text-white"
          >
            Rest is <br /><span className="text-g italic drop-shadow-[0_0_30px_rgba(201,168,76,0.2)]">Rebellion.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-[20px] text-[#8892B0] leading-relaxed max-w-[560px] mx-auto mb-14 font-body italic opacity-80"
          >
            "In a world that never sleeps, choosing to rest is the ultimate act of defiance." Reclaim your peace through science and shared truth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-5 justify-center"
          >
            <button onClick={() => navTo('rooms')} className="btn-gold !px-12 !py-5 flex items-center gap-3 shadow-[0_20px_40px_rgba(201,168,76,0.2)] group">
              Enter the Sanctuary <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navTo('stories')} className="btn-outline !px-12 !py-5">
              Collective Voices
            </button>
          </motion.div>
        </div>
      </section>

      {/* COLLECTIVE VOICES (GLOBAL FEED) */}
      <section className="max-w-[1140px] mx-auto px-6 py-32 border-t border-white/5 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-[440px]">
            <div className="flex items-center gap-2 text-g/40 mb-4">
              <Sparkles size={16} />
              <span className="text-[10px] font-bold tracking-[4px] uppercase">Collective Strength</span>
            </div>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 italic">Voices of <span className="text-g">the Night</span></h2>
            <p className="text-[15px] text-[#8892B0] leading-relaxed italic opacity-70">
              "I used to think I was the only person awake in the world. Then I found this place." — Anonymous Member
            </p>
          </div>
          <Link to="/stories" className="text-g text-[11px] font-bold uppercase tracking-[4px] border-b border-g/30 pb-1.5 hover:text-white hover:border-white transition-all flex items-center gap-2 group">
            Cast Your Voice <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {recentStories.map((story, i) => (
              <motion.div
                key={story._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                onClick={() => navTo('stories')}
                className="glass-card p-10 cursor-pointer hover:border-g/40 group transition-all h-[420px] flex flex-col justify-between shadow-2xl bg-gradient-to-br from-white/[0.03] to-transparent"
              >
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <div className="w-10 h-10 rounded-xl bg-ink/80 border border-g/20 flex items-center justify-center text-g font-heading text-lg group-hover:bg-g group-hover:text-black transition-all">
                      {story.author?.username?.[0]?.toUpperCase() || '?'}
                    </div>
                    <span className="text-[10px] font-bold text-[#4A5370] tracking-[3px] uppercase group-hover:text-g transition-colors">{story.mood}</span>
                  </div>
                  <p className="font-body text-[17px] text-[#8892B0] leading-[1.8] italic line-clamp-6 opacity-80 group-hover:opacity-100 mb-8 overflow-hidden">
                    "{story.content}"
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold text-g/50 uppercase tracking-[3px] pt-6 border-t border-white/5">
                  <Heart size={14} className="group-hover:scale-125 transition-transform" /> {story.beenThereCount} have felt this
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && [1, 2, 3].map(i => (
            <div key={i} className="h-[420px] glass animate-pulse rounded-[40px] flex flex-col p-10">
              <div className="w-10 h-10 bg-white/5 rounded-xl mb-8" />
              <div className="h-4 bg-white/5 w-full rounded mb-4" />
              <div className="h-4 bg-white/5 w-4/5 rounded mb-4" />
              <div className="h-4 bg-white/5 w-3/4 rounded mb-4" />
            </div>
          ))}
        </div>
      </section>

      {/* THE TOOLKIT GRID */}
      <section className="max-w-[1240px] mx-auto px-6 py-32 border-t border-white/5 w-full">
        <div className="text-center mb-20">
          <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-[2px] italic">The Toolkit</h3>
          <p className="text-[12px] text-[#4A5370] font-bold tracking-[4px] uppercase mb-2">Architected for deep recovery</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
          {toolkit.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, borderColor: 'rgba(201,168,76,0.4)', background: 'rgba(201,168,76,0.03)' }}
              onClick={() => navTo(item.path)}
              className="glass p-10 flex flex-col items-center justify-center gap-5 cursor-pointer text-center group transition-all rounded-[32px] border-white/5"
            >
              <div className="text-4xl group-hover:scale-110 transition-transform duration-700 select-none">{item.ic}</div>
              <div className="text-[10px] font-bold text-[#8892B0] group-hover:text-g tracking-[3px] uppercase transition-colors">{item.tit}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THE RULES OF THE SANCTUARY */}
      <section className="max-w-[1240px] mx-auto px-6 py-32 border-t border-white/5 w-full">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 text-g/40 mb-6">
              <Shield size={16} />
              <span className="text-[10px] font-bold tracking-[5px] uppercase">The Underground Edict</span>
            </div>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-10 italic">The First Rule of <span className="text-g">The Sanctuary Hub</span></h2>
            <div className="space-y-8">
              {[
                { r: "01", t: "Confidentiality is Absolute", d: "What is said in the circle, stays in the circle. No recordings, no screenshots, no whispers outside." },
                { r: "02", t: "The Strength is You", d: "We are peers, not clinicians. Our movement is built on shared scars and authentic survival." },
                { r: "03", t: "Presence over Connectivity", d: "The night is for deep bonds. Face-to-face meetups and live voices are our ultimate weapons." }
              ].map((rule) => (
                <div key={rule.r} className="flex gap-6 group">
                  <div className="font-heading text-4xl text-g/20 group-hover:text-g transition-colors duration-500">{rule.r}</div>
                  <div>
                    <h4 className="font-body font-bold text-lg text-white mb-2 uppercase tracking-wider">{rule.t}</h4>
                    <p className="text-[#8892B0] text-sm leading-relaxed opacity-70 italic">{rule.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="glass aspect-square rounded-[60px] overflow-hidden border-g/20 flex items-center justify-center p-12 bg-g/[0.02]">
              <div className="text-center">
                <Moon size={80} className="mx-auto text-g mb-8 animate-moon-breath" />
                <h3 className="font-heading text-4xl text-white mb-6 italic uppercase">Join the Movement</h3>
                <p className="font-body text-[#8892B0] text-sm mb-10 max-w-[320px] mx-auto opacity-70">"You are not alone. You are supported. We are stronger together."</p>
                <button onClick={() => navTo('groups')} className="btn-gold !px-10 !py-4">FIND A WEEKLY MEETUP</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CRISIS SUPPORT BANNER */}
      <section className="max-w-[1040px] mx-auto px-6 pb-32 w-full mt-10">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="flex items-center gap-8 p-10 md:p-14 rounded-[48px] glass border-red-500/10 bg-red-500/[0.03] flex-wrap md:flex-nowrap relative overflow-hidden"
        >
          {/* Subtle emergency glow */}
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
            <Shield size={28} />
          </div>
          <div className="flex-1 min-w-[240px]">
            <h4 className="font-heading text-3xl font-bold text-white mb-2 uppercase tracking-wide italic">You are not alone</h4>
            <p className="text-[15px] text-[#8892B0] leading-relaxed max-w-[500px] opacity-80">
              If life feels too heavy or the night seems too long, please reach out to our vetted emergency partners.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3 w-full md:w-auto">
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
              <div className="text-[9px] font-bold text-red-500/60 uppercase tracking-widest mb-1">iCall (India)</div>
              <div className="text-xl font-heading font-bold text-white tracking-widest leading-none">
                {import.meta.env.VITE_EMERGENCY_PHONE}
              </div>
            </div>
            <button
              className="btn-gold !bg-red-500 !text-white !border-red-600 !px-12 !py-4 w-full md:w-auto shadow-[0_15px_30px_rgba(239,68,68,0.2)]"
              onClick={() => window.open(`tel:${import.meta.env.VITE_EMERGENCY_PHONE}`)}
            >
              GET IMMEDIATE HELP
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
