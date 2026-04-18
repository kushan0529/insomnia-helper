import React from 'react';

const StoryCard = ({ story, onReact }) => {
  const rotation = Math.random() > 0.5 ? 0.5 : -0.5;
  
  return (
    <div 
      className="relative bg-fc-grey border border-fc-red/20 p-8 mb-6 group transition-all duration-300 hover:border-fc-red/50"
      style={{
        transform: `rotate(${rotation}deg)`,
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' opacity='0.03'/%3E%3C/svg%3E")
        `,
        boxShadow: '0 4px 20px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,0,0,0.3)'
      }}
    >
      {/* Torn top edge */}
      <div className="absolute top-0 left-0 right-0 h-3 overflow-hidden">
        <div style={{
          height: '10px',
          background: '#0a0a0a',
          clipPath: 'polygon(0 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 100% 0)'
        }} />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className={`font-heading text-xs px-3 py-1 uppercase tracking-widest ${
          story.mood === 'Hopeless' ? 'bg-fc-red text-fc-white' :
          story.mood === 'Surviving' ? 'bg-fc-purple text-fc-white' :
          story.mood === 'Angry' ? 'bg-orange-900 text-fc-white' :
          story.mood === 'Numb' ? 'bg-zinc-700 text-fc-white' :
          'bg-fc-gold text-fc-black'
        }`}>
          {story.mood}
        </span>

        {story.isTriggerWarning && (
          <span className="font-body text-[10px] text-fc-red border border-fc-red px-2 py-0.5 animate-pulse">
            ⚠️ TRIGGER WARNING
          </span>
        )}
      </div>

      <h3 className="font-heading distressed-text text-fc-white text-3xl uppercase mb-3 leading-tight">
        {story.title}
      </h3>
      
      <p className="font-body text-fc-white/60 text-sm md:text-base leading-relaxed mb-6 line-clamp-4">
        {story.content}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-fc-white/10">
        <button 
          onClick={() => onReact && onReact(story._id)}
          className="font-heading text-sm text-fc-red border border-fc-red px-4 py-1.5 
                           hover:bg-fc-red hover:text-fc-white transition-all 
                           hover:shadow-[0_0_20px_rgba(139,0,0,0.6)] uppercase tracking-widest"
        >
          BEEN THERE ({story.beenThereCount || 0})
        </button>
        
        <div className="text-right">
          <p className="font-body text-fc-white/40 text-[10px] uppercase">
            BY {story.isAnonymous ? 'ANONYMOUS' : story.author?.username || 'GUEST'}
          </p>
          <p className="font-body text-fc-white/30 text-[10px]">
            {new Date(story.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Torn bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-3 overflow-hidden">
        <div style={{
          height: '10px',
          background: '#0a0a0a',
          clipPath: 'polygon(0 100%, 5% 0, 10% 100%, 15% 0, 20% 100%, 25% 0, 30% 100%, 35% 0, 40% 100%, 45% 0, 50% 100%, 55% 0, 60% 100%, 65% 0, 70% 100%, 75% 0, 80% 100%, 85% 0, 90% 100%, 95% 0, 100% 100%)'
        }} />
      </div>
    </div>
  );
};

export default StoryCard;
