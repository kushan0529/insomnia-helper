import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Moon, Shield, Zap, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen relative z-10 pt-[72px]">
      {/* HERO SECTION */}
      <section className="relative w-full h-[85vh] flex items-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img 
            src="/photos/photo1.jpg" 
            className="w-full h-full object-cover filter contrast-[1.2] saturate-[0.4] brightness-[0.4]" 
            alt="Hero Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 w-full">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="font-heading text-7xl md:text-[120px] leading-[0.9] text-white tracking-tighter mb-6">
              THE NIGHT <br/> IS YOURS.
            </h1>
            <p className="font-body text-lg md:text-xl text-fc-gold tracking-widest uppercase mb-8 border-l-2 border-fc-gold pl-6">
              "Everything is a copy of a copy of a copy." <br/>
              Support for those who don't sleep.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/register" className="button-fight">
                JOIN THE CIRCLE
              </Link>
              <Link to="/stories" className="flex items-center gap-2 font-body text-white/60 hover:text-white transition-colors uppercase tracking-[.2em] text-sm">
                BEYOND THE VOID <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMPACT STATS BANNER */}
      <section className="bg-black/90 border-b border-fc-red/30 py-20 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fc-red/50 to-transparent" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
           <div className="border-l-2 border-fc-red/20 pl-8">
              <p className="font-body text-fc-red text-xs uppercase tracking-[0.4em] mb-4">The Yearly Toll</p>
              <h2 className="font-heading text-6xl md:text-7xl text-white tracking-tighter leading-none mb-4">700,000+</h2>
              <p className="font-body text-[10px] text-white/30 uppercase tracking-[0.3em] leading-relaxed">
                 Human beings lost annually to the heavy silence of depression.
              </p>
           </div>
           <div className="border-l-2 border-fc-red/20 pl-8">
              <p className="font-body text-fc-red text-xs uppercase tracking-[0.4em] mb-4">Every Single Hour</p>
              <h2 className="font-heading text-6xl md:text-7xl text-white tracking-tighter leading-none mb-4">80 SOULS</h2>
              <p className="font-body text-[10px] text-white/30 uppercase tracking-[0.3em] leading-relaxed">
                 Crossing over while the rest of the world copies a copy of a copy.
              </p>
           </div>
           <div className="border-l-2 border-fc-red/20 pl-8">
              <p className="font-body text-fc-red text-xs uppercase tracking-[0.4em] mb-4">The Fragmentation</p>
              <h2 className="font-heading text-6xl md:text-7xl text-white tracking-tighter leading-none mb-4">1 IN 4</h2>
              <p className="font-body text-[10px] text-white/30 uppercase tracking-[0.3em] leading-relaxed">
                 Of us are currently fighting a war that has no front lines.
              </p>
           </div>
        </div>
        <div className="absolute inset-0 bg-red-900/5 mix-blend-overlay pointer-events-none" />
      </section>

      {/* TICKER */}
      <div className="bg-black/60 border-y border-white/10 py-6 overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="inline-block text-2xl font-heading tracking-[0.5em] text-fc-gold/40 uppercase"
        >
          SLEEP IS THE COUSIN OF DEATH • YOU ARE NOT YOUR PAYCHECK • EVERYTHING IS A COPY • INSOMNIA HELPER • THE NIGHT IS OURS • 
          SLEEP IS THE COUSIN OF DEATH • YOU ARE NOT YOUR PAYCHECK • EVERYTHING IS A COPY • INSOMNIA HELPER • THE NIGHT IS OURS • 
        </motion.div>
      </div>

      {/* ABOUT SECTION */}
      <section className="py-[80px] max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
           <h2 className="font-heading text-5xl text-white mb-6 uppercase">WHY ARE WE HERE?</h2>
           <p className="font-body text-lg text-white/60 leading-relaxed mb-8">
             You wake up at 3:14 AM. The ceiling fan is a copy. The silence is a copy. 
             You aren't alone in the void. We've built a circle for the exhausted, the anxious, and the night owls who have forgotten what "rest" feels like.
           </p>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                 <Shield className="text-fc-gold shrink-0" size={24} />
                 <div>
                    <h4 className="font-heading text-xl text-white">ANONYMOUS</h4>
                    <p className="font-body text-[12px] text-white/40 uppercase">No names. No judgment.</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <Zap className="text-fc-gold shrink-0" size={24} />
                 <div>
                    <h4 className="font-heading text-xl text-white">IMMEDIATE</h4>
                    <p className="font-body text-[12px] text-white/40 uppercase">A circle that never sleeps.</p>
                 </div>
              </div>
           </div>
        </div>
        <div className="relative group">
           <img 
              src="/photos/photo2.jpg" 
              className="w-full h-[400px] object-cover rounded-2xl filter contrast-[1.3] saturate-[0] brightness-50" 
              alt="About" 
           />
           <div className="absolute inset-0 border border-fc-gold/20 rounded-2xl translate-x-4 translate-y-4 -z-10" />
        </div>
      </section>

      {/* CARDS SECTION */}
      <section className="py-[80px] bg-black/40 border-y border-white/5">
         <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <h3 className="font-heading text-4xl text-white text-center mb-16 tracking-widest uppercase">CHOOSE YOUR PATH</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { title: 'THE CIRCLE', desc: 'Real-time support rooms for the sleepless.', icon: Users, path: '/rooms' },
                 { title: 'STORY BOARD', desc: 'Share your truth anonymously with the void.', icon: Moon, path: '/stories' },
                 { title: 'CBT-I PROGRAM', desc: 'Reclaim your night with structured sleep therapy.', icon: Zap, path: '/programs' }
               ].map((card, i) => (
                 <Link key={i} to={card.path} className="card-brutal group hover:border-fc-gold/30 transition-all">
                    <card.icon className="text-fc-gold mb-6 group-hover:scale-110 transition-transform" size={40} />
                    <h4 className="font-heading text-3xl text-white mb-4 uppercase">{card.title}</h4>
                    <p className="font-body text-sm text-white/60 leading-relaxed uppercase tracking-widest">
                      {card.desc}
                    </p>
                 </Link>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
