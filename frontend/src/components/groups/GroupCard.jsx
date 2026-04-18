
import React from 'react';
import { Link } from 'react-router-dom';

const GroupCard = ({ group }) => {
  const approvedMembers = group.members.filter(m => m.status === 'approved');
  const spotsLeft = group.maxMembers - approvedMembers.length;
  
  const getStatusColor = () => {
    if (spotsLeft > 5) return 'text-green-500 bg-green-500/10';
    if (spotsLeft > 0) return 'text-amber-500 bg-amber-500/10';
    return 'text-red-500 bg-red-500/10';
  };

  return (
    <Link to={`/groups/${group.id}`} className="block group">
      <div className="bg-[#1C1C1C] border border-[#2a2a2a] rounded-[12px] p-5 transition-all duration-300 hover:border-[#C9A84C]/40 hover:-translate-y-1 relative overflow-hidden h-full flex flex-col">
        {/* Top Header */}
        <div className="flex justify-between items-start mb-4">
          <span className="bg-[#C9A84C] text-black text-[10px] uppercase font-black px-2 py-1 rounded-full">
            {group.category}
          </span>
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${getStatusColor()}`}>
            {spotsLeft} spots left
          </span>
        </div>

        {/* Title & Desc */}
        <h3 className="text-[17px] font-bold text-white mb-2 group-hover:text-[#C9A84C] transition-colors line-clamp-1">
          {group.title}
        </h3>
        <p className="text-[13px] text-[#9A9A9A] line-clamp-2 mb-4 flex-grow">
          {group.description}
        </p>

        {/* Host row */}
        <div className="flex items-center gap-2 mb-4 py-3 border-y border-[#2a2a2a]">
          <div className="w-8 h-8 rounded-full bg-[#C9A84C] text-black flex items-center justify-center text-[10px] font-black">
            {group.host.avatar_initials}
          </div>
          <div className="text-[12px]">
            <span className="text-[#9A9A9A]">Hosted by</span>{' '}
            <span className="text-white font-medium">{group.host.name}</span>
          </div>
        </div>

        {/* Info row */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#9A9A9A] mb-5">
          <span className="flex items-center gap-1">📍 {group.location}</span>
          <span className="flex items-center gap-1">📅 {group.date}</span>
          <span className="flex items-center gap-1">🕐 {group.time}</span>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex -space-x-2 overflow-hidden">
            {approvedMembers.slice(0, 5).map((member, i) => (
              <div 
                key={i} 
                className="inline-block h-7 w-7 rounded-full ring-2 ring-[#1C1C1C] bg-[#2a2a2a] text-[10px] flex items-center justify-center text-[#9A9A9A] font-bold"
              >
                {member.avatar_initials}
              </div>
            ))}
            {approvedMembers.length > 5 && (
              <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#1C1C1C] bg-[#2a2a2a] text-[9px] flex items-center justify-center text-[#C9A84C] font-bold">
                +{approvedMembers.length - 5}
              </div>
            )}
          </div>
          
          <div className="text-[#C9A84C] font-bold text-xs group-hover:underline">
            View Details →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupCard;
