import React from 'react';
import styles from '../../pages/Dashboard.module.css';

const StoryBar = () => {
  const stories = [
    { id: 1, user: 'Tyler', mood: 'Fighting Back' },
    { id: 2, user: 'Marla', mood: 'Numb' },
    { id: 3, user: 'Robert', mood: 'Hopeless' },
    { id: 4, user: 'Angel', mood: 'Angry' },
    { id: 5, user: 'Cornelius', mood: 'Surviving' },
    { id: 6, user: 'Durden', mood: 'Fighting Back' },
    { id: 7, user: 'Singer', mood: 'Numb' },
  ];

  const ringColors = {
    'Hopeless': '#8b0000',
    'Angry': '#92400e',
    'Numb': '#374151',
    'Surviving': '#166534',
    'Fighting Back': '#c9a84c'
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 mb-8 no-scrollbar">
      <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
        <div className="w-[68px] h-[68px] rounded-full border-2 border-dashed border-white/20 flex items-center justify-center group-hover:border-fc-gold transition-colors">
          <span className="text-2xl text-white/40 group-hover:text-fc-gold transition-colors">+</span>
        </div>
        <span className="font-heading text-[10px] opacity-40 uppercase">YOU</span>
      </div>

      {stories.map(s => (
        <div key={s.id} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer">
           <div 
             className="w-[68px] h-[68px] rounded-full p-[3px]"
             style={{ background: ringColors[s.mood] || '#333' }}
           >
              <div className="w-full h-full rounded-full border-2 border-fc-black bg-fc-grey flex items-center justify-center font-heading text-xl text-white">
                {s.user[0]}
              </div>
           </div>
           <span className="font-heading text-[10px] opacity-80 uppercase">{s.user}</span>
        </div>
      ))}
    </div>
  );
};

export default StoryBar;
