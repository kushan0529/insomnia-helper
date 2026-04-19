import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../pages/Dashboard.module.css';

const RightSidebar = () => {
  const { user } = useSelector(state => state.auth);
  
  const isNightTime = () => {
    const hour = new Date().getHours();
    return hour >= 22 || hour < 4;
  };

  const rooms = [
    { id: 1, name: 'THE 3AM CLUB', members: 42, active: true },
    { id: 2, name: 'ANXIETY SHIFT', members: 18, active: false },
    { id: 3, name: 'DEEP HOLLOW', members: 7, active: false },
    { id: 4, name: 'FIGHTERS CIRCLE', members: 12, active: true }
  ];

  const ScoreGauge = ({ score }) => {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className={styles.gaugeContainer}>
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80" cy="80" r={radius}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="8" fill="transparent"
          />
          <circle
            cx="80" cy="80" r={radius}
            stroke="#8b0000"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div className={styles.gaugeText}>{score}</div>
      </div>
    );
  };

  return (
    <aside className={styles.rightSidebar}>
      <div className={styles.scoreWidget}>
        <div className="font-heading text-xs text-fc-gold tracking-widest mb-6">YOUR SLEEP QUALITY</div>
        <ScoreGauge score={74} />
        <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-6 mt-4">
           <div>
             <div className="text-lg font-heading">6.2</div>
             <div className="text-[8px] opacity-40 uppercase">AVG HRS</div>
           </div>
           <div className="border-x border-white/10">
             <div className="text-lg font-heading">88%</div>
             <div className="text-[8px] opacity-40 uppercase">PEAK</div>
           </div>
           <div>
             <div className="text-lg font-heading">12</div>
             <div className="text-[8px] opacity-40 uppercase">STREAK</div>
           </div>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <span className="font-heading text-[10px] opacity-40 uppercase tracking-widest">ACTIVE ROOMS</span>
          {isNightTime() && <span className="flex items-center gap-1 text-[8px] text-fc-red font-mono"><span className="w-1.5 h-1.5 bg-fc-red rounded-full animate-pulse" /> LIVE</span>}
        </div>
        <div className="space-y-3">
           {rooms.map(room => (
             <div key={room.id} className="bg-white/[0.03] border border-white/5 p-4 flex justify-between items-center group cursor-pointer hover:bg-white/[0.06] transition-all">
                <div>
                   <div className="font-heading text-sm text-white group-hover:text-fc-gold transition-colors">{room.name}</div>
                   <div className="text-[9px] opacity-30 font-mono uppercase">{room.members} AWAKE</div>
                </div>
                <button className="text-[14px] opacity-20 group-hover:opacity-100 transition-opacity">➔</button>
             </div>
           ))}
        </div>
      </div>

      {isNightTime() ? (
        <div className="bg-fc-red/5 border border-fc-red/30 p-6 text-center shadow-[0_0_30px_rgba(139,0,0,0.1)]">
           <div className="text-fc-red font-heading text-lg mb-1">THE NIGHT SHIFT</div>
           <p className="text-[10px] font-mono opacity-50 mb-6 italic">"The things you own end up owning you."</p>
           <button className="w-full bg-fc-red text-white font-heading py-2 text-sm tracking-widest hover:brightness-110 transition-all">
             ENTER ROOM
           </button>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/5 p-6 text-center opacity-40">
           <div className="font-heading text-sm mb-1 uppercase">NO ROOMS ACTIVE</div>
           <p className="text-[10px] font-mono">Next night shift in 4 hours.</p>
        </div>
      )}

      <div className="mt-10">
         <div className="font-heading text-[10px] opacity-40 uppercase tracking-widest mb-6">IN THE CIRCLE</div>
         <div className="flex flex-wrap gap-2">
            {['#3AM', '#INSOMNIA', '#FIGHTBACK', '#NUMB', '#CIRCLE', '#ALIVE'].map(tag => (
              <span key={tag} className="text-[10px] font-mono text-fc-gold hover:underline cursor-pointer">{tag}</span>
            ))}
         </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
