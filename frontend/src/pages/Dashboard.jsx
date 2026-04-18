import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Brain, 
  MessageSquare, 
  Wind, 
  ArrowRight,
  Shield,
  Moon,
  Sparkles,
  Calendar,
  CloudMoon
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useSelector(state => state.auth || { user: null });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const modules = [
    {
      title: "Shadow Talk",
      tagline: "Anonymous Support",
      desc: "Connect safely with others who understand the weight of the night.",
      icon: <MessageSquare size={24} />,
      path: "/shadow-talk",
      color: "border-g/10"
    },
    {
      title: "CBT Programs",
      tagline: "Clinical Toolkit",
      desc: "Evidence-based tools to rewire your relationship with sleep and anxiety.",
      icon: <Brain size={24} />,
      path: "/programs",
      color: "border-g/10"
    },
    {
      title: "Support Circles",
      tagline: "Community Meetups",
      desc: "Find your tribe. Local and online circles for shared healing.",
      icon: <Users size={24} />,
      path: "/groups",
      color: "border-g/30",
      highlight: true
    },
    {
      title: "Soundscapes",
      tagline: "Auditory Rest",
      desc: "Desaturated frequencies and stories designed for deep relaxation.",
      icon: <CloudMoon size={24} />,
      path: "/audio",
      color: "border-white/5"
    }
  ];

  const stats = [
    { label: 'Current Streak', value: '12 Days', icon: Sparkles, color: 'text-g' },
    { label: 'Circle Status', value: 'Active', icon: Shield, color: 'text-blue-400' },
    { label: 'Next Session', value: 'Tonight', icon: Calendar, color: 'text-purple-400' }
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <div>
            <span className="text-[10px] font-bold tracking-[3px] uppercase text-g mb-3 block">Personal Sanctuary</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              {getGreeting()}, <span className="text-g italic">{user?.username || 'Guest'}</span>
            </h1>
            <p className="text-[#8892B0] text-sm md:text-[15px] leading-relaxed max-w-[500px]">
              The night is a place for healing, not just waiting. Here is your progress and path forward.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {stats.map((s, i) => (
              <div key={i} className="glass py-3 px-6 rounded-2xl border-white/5 flex items-center gap-4">
                <s.icon size={18} className={s.color} />
                <div className="text-left">
                  <p className="text-[9px] text-[#4A5370] uppercase font-bold tracking-wider">{s.label}</p>
                  <p className="text-sm text-white font-bold">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {modules.map((module, i) => (
          <motion.div
            key={module.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`group glass-card p-8 flex flex-col transition-all hover:-translate-y-1 ${module.highlight ? 'border-g/30' : ''}`}
          >
            <div className="flex justify-between items-start mb-8">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                module.highlight ? 'bg-g text-black shadow-[0_0_20px_rgba(201,168,76,0.2)]' : 'bg-white/5 text-g'
              }`}>
                {module.icon}
              </div>
              <span className="text-[10px] font-bold text-g/60 tracking-[2px] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                {module.tagline}
              </span>
            </div>

            <h2 className="font-heading text-3xl font-bold text-white mb-3 tracking-wide group-hover:text-g transition-colors">
              {module.title}
            </h2>
            
            <p className="font-body text-[#8892B0] text-[14px] leading-relaxed mb-10 max-w-[320px]">
              {module.desc}
            </p>

            <Link 
              to={module.path}
              className={`mt-auto inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[2px] transition-all ${
                module.highlight ? 'text-white' : 'text-g/80 hover:text-white'
              }`}
            >
              Learn More <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Encouragement Footer */}
      <div className="mt-24 text-center">
         <div className="max-w-[600px] mx-auto">
            <div className="w-12 h-px bg-g/20 mx-auto mb-10" />
            <p className="font-heading text-2xl text-white italic mb-4">
              "Healing is not a destination, but a way of walking through the night."
            </p>
            <p className="text-[10px] text-[#4A5370] uppercase tracking-[4px]">You are safe here • Sleep · Breathe · Heal</p>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
