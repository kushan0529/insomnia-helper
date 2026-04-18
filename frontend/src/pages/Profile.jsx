
import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { User, Shield, Key, History } from 'lucide-react';

const Profile = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="min-h-screen relative z-10 pt-[100px] px-6 max-w-4xl mx-auto">
      <div className="bg-[#1C1C1C] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-fc-gold h-32 w-full relative">
           <div className="absolute -bottom-12 left-12 w-24 h-24 rounded-full bg-fc-grey border-4 border-[#1C1C1C] flex items-center justify-center text-fc-gold text-4xl font-heading shadow-xl">
             {user?.username?.[0]?.toUpperCase() || 'U'}
           </div>
        </div>
        
        <div className="pt-16 pb-12 px-12">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="font-heading text-4xl text-white uppercase tracking-tighter">
                {user?.username || 'User Profile'}
              </h1>
              <p className="font-body text-fc-gold/60 text-sm uppercase tracking-widest mt-1">
                Recruit # {Math.floor(Math.random() * 89999) + 10000}
              </p>
            </div>
            <button className="border border-white/10 text-white/40 px-6 py-2 rounded-sm font-heading hover:border-fc-gold hover:text-fc-gold transition-all text-xs">
              EDIT PROFILE
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
             <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-black/40 border border-white/5 rounded-lg">
                   <Shield className="text-fc-gold" size={24} />
                   <div>
                      <p className="text-[10px] text-white/20 uppercase tracking-widest">Clearance Level</p>
                      <p className="text-white font-heading tracking-widest">TIER 1 SUPPORT</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-black/40 border border-white/5 rounded-lg">
                   <History className="text-fc-gold" size={24} />
                   <div>
                      <p className="text-[10px] text-white/20 uppercase tracking-widest">Time in The Circle</p>
                      <p className="text-white font-heading tracking-widest">14 DAYS</p>
                   </div>
                </div>
             </div>

             <div className="bg-fc-gold/5 border border-fc-gold/10 p-6 rounded-lg relative overflow-hidden">
                <h3 className="text-fc-gold font-heading tracking-widest text-lg mb-2 underline decoration-2 underline-offset-4">PHILOSOPHY</h3>
                <p className="font-body text-white/60 text-sm italic italic leading-relaxed">
                  "It's only after we've lost everything that we're free to do anything."
                </p>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <User size={60} />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
