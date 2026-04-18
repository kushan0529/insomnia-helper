
import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Brain, 
  MessageSquare, 
  Home as HomeIcon, 
  ArrowRight,
  Shield,
  Heart
} from 'lucide-react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);

  const modules = [
    {
      title: "SHADOW TALK",
      tagline: "BLIND IDENTITY REVEAL",
      desc: "Connect anonymously. Identities only reveal when both of you agree to unmask.",
      icon: <MessageSquare size={32} />,
      path: "/shadow-talk",
      color: "border-fc-gold/20",
      btnText: "ENTER SHADOWS"
    },
    {
      title: "RE-WIRE",
      tagline: "CBT TREATMENT",
      desc: "Scientific tools to dismantle the structures of insomnia and anxiety.",
      icon: <Brain size={32} />,
      path: "/programs",
      color: "border-fc-gold/20",
      btnText: "START PROGRAM"
    },
    {
      title: "SQUADS",
      tagline: "GROUP MEETUPS",
      desc: "Find your tribe. Real people, real meetups, real support.",
      icon: <Users size={32} />,
      path: "/groups",
      color: "border-[#C9A84C]/40",
      btnText: "FIND GROUPS",
      highlight: true
    },
    {
      title: "BASE CAMP",
      tagline: "HOME BASE",
      desc: "Return to where it all begins. Your center in the chaos.",
      icon: <HomeIcon size={32} />,
      path: "/home",
      color: "border-white/5",
      btnText: "GO HOME"
    }
  ];

  return (
    <div className="min-h-screen relative z-10 pt-[72px] pb-12 px-6 md:px-12">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mt-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h1 className="font-heading text-6xl md:text-8xl text-white tracking-tighter leading-none uppercase">
              COMMAND <span className="text-fc-gold">CENTER</span>
            </h1>
            <p className="font-body text-fc-gold/60 text-lg tracking-[0.3em] uppercase mt-2">
              Welcome back, {user?.username || 'Soldier'}. You are alive.
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="bg-black/40 border border-white/10 px-6 py-3 rounded-sm flex items-center gap-3">
                <Shield size={20} className="text-fc-gold" />
                <div className="text-left">
                   <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Status</p>
                   <p className="text-sm text-white font-heading">OPERATIONAL</p>
                </div>
             </div>
             <div className="bg-black/40 border border-white/10 px-6 py-3 rounded-sm flex items-center gap-3">
                <Heart size={20} className="text-fc-red" />
                <div className="text-left">
                   <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">System</p>
                   <p className="text-sm text-white font-heading">STABLE</p>
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {modules.map((module, i) => (
          <motion.div
            key={module.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`group relative overflow-hidden bg-[#1C1C1C]/40 backdrop-blur-3xl border ${module.color} p-8 rounded-xl transition-all hover:scale-[1.02] hover:bg-[#1C1C1C]/60`}
          >
            {/* Background Glow for highlight */}
            {module.highlight && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-fc-gold/5 blur-3xl -mr-16 -mt-16 pointer-events-none" />
            )}

            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-lg bg-black/40 border ${module.highlight ? 'border-fc-gold/30 text-fc-gold' : 'border-white/5 text-white/40'}`}>
                {module.icon}
              </div>
              <span className="font-heading text-xs text-fc-gold tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                {module.tagline}
              </span>
            </div>

            <h2 className="font-heading text-4xl text-white mb-3 tracking-wider group-hover:text-fc-gold transition-colors">
              {module.title}
            </h2>
            
            <p className="font-body text-white/50 text-[15px] leading-relaxed mb-8 max-w-[80%]">
              {module.desc}
            </p>

            <Link 
              to={module.path}
              className={`inline-flex items-center gap-3 font-heading tracking-[0.2em] text-[13px] py-3 px-6 rounded-sm transition-all ${
                module.highlight 
                ? 'bg-fc-gold text-black hover:brightness-110' 
                : 'border border-white/10 text-white/60 hover:border-fc-gold hover:text-fc-gold'
              }`}
            >
              {module.btnText} <ArrowRight size={16} />
            </Link>

            {/* Corner Decor */}
            <div className="absolute bottom-0 right-0 w-8 h-8 opacity-10 pointer-events-none">
               <div className="absolute bottom-4 right-4 w-4 h-[1px] bg-white" />
               <div className="absolute bottom-4 right-4 w-[1px] h-4 bg-white" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Motivational Footer */}
      <div className="max-w-6xl mx-auto mt-20 text-center">
         <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />
         <p className="font-body text-white/20 italic text-lg">
           "First you have to give up. First you have to know, not fear, that someday you're going to die."
         </p>
         <div className="mt-8 flex justify-center gap-12 text-[10px] font-heading tracking-[0.5em] text-white/10 uppercase">
            <span>Rule #1</span>
            <span>Rule #2</span>
            <span>Rule #3</span>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
