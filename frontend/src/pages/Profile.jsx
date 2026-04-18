import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { User, Shield, Key, History, Sparkles, Mail, MapPin, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useSelector(state => state.auth || { user: null });

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12">
      <div className="glass overflow-hidden border-white/5 shadow-[0_32px_128px_rgba(0,0,0,0.5)]">
        {/* Cover Section */}
        <div className="h-40 md:h-56 w-full relative bg-gradient-to-br from-[#1A1F35] via-g/10 to-[#0F1220]">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
           <div className="absolute -bottom-16 left-8 md:left-12 w-32 h-32 rounded-3xl bg-ink border-4 border-s3 shadow-[0_16px_48px_rgba(0,0,0,0.8)] flex items-center justify-center text-g text-5xl font-heading font-bold overflow-hidden">
             {user?.username?.[0]?.toUpperCase() || 'U'}
             <div className="absolute inset-0 bg-g/5" />
           </div>
        </div>
        
        <div className="pt-20 pb-12 px-8 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2 italic">
                {user?.username || 'Member Profile'}
              </h1>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-g uppercase tracking-[2px]">
                   <Calendar size={12} className="opacity-60" /> Member since 2024
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-[2px]">
                   <MapPin size={12} className="opacity-60" /> {user?.city || 'Earth'}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-purple-400 uppercase tracking-[2px]">
                   <Shield size={12} className="opacity-60" /> Verified Sanctuary
                </div>
              </div>
            </div>
            <button className="btn-gold !py-2.5 !px-8 !text-[12px] group">
              Edit Sanctuary Details
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
             <div className="space-y-4">
                <div className="flex items-center gap-5 p-5 glass-card border-white/5 bg-white/5">
                   <div className="w-12 h-12 rounded-2xl bg-g/5 border border-g/10 flex items-center justify-center text-g">
                      <Sparkles size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] text-[#4A5370] font-bold uppercase tracking-wider mb-0.5">Journey Level</p>
                      <p className="text-white font-body text-sm font-bold uppercase tracking-[2px]">Core Member</p>
                   </div>
                </div>
                <div className="flex items-center gap-5 p-5 glass-card border-white/5 bg-white/5">
                   <div className="w-12 h-12 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400">
                      <History size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] text-[#4A5370] font-bold uppercase tracking-wider mb-0.5">Nights Mindful</p>
                      <p className="text-white font-body text-sm font-bold uppercase tracking-[2px]">14 Days</p>
                   </div>
                </div>
             </div>

             <div className="glass-card border-g/30 p-8 relative overflow-hidden flex flex-col justify-center">
                <div className="relative z-10">
                   <h3 className="text-g font-heading text-lg font-bold tracking-[3px] uppercase mb-4">Current Mantra</h3>
                   <p className="font-body text-[#8892B0] text-[15px] italic leading-relaxed">
                     "Healing is not a destination, but a way of walking through the night."
                   </p>
                </div>
                <div className="absolute top-0 right-0 p-6 opacity-5">
                   <User size={80} className="text-g" />
                </div>
                {/* Decorative glow */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-g/5 blur-3xl pointer-events-none" />
             </div>
          </div>
          
          <div className="mt-12 pt-12 border-t border-white/5">
             <h3 className="font-heading text-xl font-bold text-white mb-6 tracking-wide">Privacy Preferences</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                   <span className="text-[12px] font-bold text-[#8892B0] uppercase tracking-wider">Anonymous Mode</span>
                   <span className="text-xs text-g font-bold uppercase">Active</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                   <span className="text-[12px] font-bold text-[#8892B0] uppercase tracking-wider">Public Profile</span>
                   <span className="text-xs text-red-400 font-bold uppercase">Hidden</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
