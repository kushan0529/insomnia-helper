import React from 'react';
import { Heart, MessageCircle, Clock, User } from 'lucide-react';

const StoryCard = ({ story, onReact }) => {
  return (
    <div className="glass-card p-6 md:p-8 mb-6 group transition-all hover:-translate-y-1 border-white/5 hover:border-g/20">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className={`text-[10px] font-bold px-3 py-1 uppercase tracking-[2px] rounded-full border ${
          story.mood === 'Hopeless' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
          story.mood === 'Surviving' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
          story.mood === 'Angry' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
          story.mood === 'Numb' ? 'bg-zinc-500/10 border-zinc-500/20 text-zinc-400' :
          'bg-g/10 border-g/20 text-g'
        }`}>
          {story.mood}
        </span>

        {story.isTriggerWarning && (
          <span className="text-[10px] font-bold text-red-500/60 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Trigger Warning
          </span>
        )}
      </div>

      <h3 className="font-heading text-3xl font-bold text-white mb-4 leading-tight group-hover:text-g transition-colors">
        {story.title}
      </h3>
      
      <p className="font-body text-[#8892B0] text-[15px] leading-relaxed mb-8 line-clamp-4 italic">
        "{story.content}"
      </p>

      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <button 
          onClick={() => onReact && onReact(story._id)}
          className="text-[11px] font-bold text-g uppercase tracking-[2px] flex items-center gap-2 hover:text-white transition-colors"
        >
          <Heart size={14} /> I Hear You ({story.beenThereCount || 0})
        </button>
        
        <div className="text-right flex items-center gap-4 text-[#4A5370]">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">
              {story.isAnonymous ? 'Anonymous' : story.author?.username || 'Guest'}
            </span>
            <span className="text-[9px] uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
              <Clock size={10} /> {new Date(story.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
