import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, User, ChevronRight } from 'lucide-react';

const GroupCard = ({ group }) => {
  const approvedMembers = group.members.filter(m => m.status === 'approved');
  const spotsLeft = group.maxMembers - approvedMembers.length;
  
  const getStatusColor = () => {
    if (spotsLeft > 5) return 'text-[#3DD68C] bg-[#3DD68C]/10';
    if (spotsLeft > 0) return 'text-[#F0D080] bg-[#F0D080]/10';
    return 'text-[#FF6B6B] bg-[#FF6B6B]/10';
  };

  return (
    <Link to={`/groups/${group.id}`} className="block group h-full">
      <div className="glass-card p-6 h-full flex flex-col transition-all duration-300 hover:border-g/40 hover:-translate-y-1 relative overflow-hidden">
        {/* Top Header */}
        <div className="flex justify-between items-start mb-5">
          <span className="bg-g/10 text-g text-[9px] uppercase font-bold px-2.5 py-1 rounded-full border border-g/20 tracking-wider">
            {group.category}
          </span>
          <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full tracking-wider border border-current opacity-80 ${getStatusColor()}`}>
            {spotsLeft} spots left
          </span>
        </div>

        {/* Title & Desc */}
        <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-g transition-colors line-clamp-1">
          {group.title}
        </h3>
        <p className="font-body text-[13px] text-[#8892B0] line-clamp-2 mb-6 flex-grow leading-relaxed">
          {group.description}
        </p>

        {/* Host row */}
        <div className="flex items-center gap-3 mb-5 py-4 border-y border-white/5">
          <div className="w-8 h-8 rounded-full bg-g text-black flex items-center justify-center text-[10px] font-bold shadow-[0_0_15px_rgba(201,168,76,0.2)]">
            {group.host.avatar_initials}
          </div>
          <div className="text-[12px]">
            <span className="text-[#4A5370]">Hosted by</span>{' '}
            <span className="text-white font-medium">{group.host.name}</span>
          </div>
        </div>

        {/* Info row */}
        <div className="flex flex-col gap-2.5 text-[11px] text-[#8892B0] mb-8">
          <span className="flex items-center gap-2 font-medium">
            <MapPin size={12} className="text-g/50" /> {group.location}
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 font-medium">
              <Calendar size={12} className="text-g/50" /> {group.date}
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Clock size={12} className="text-g/50" /> {group.time}
            </span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex -space-x-2">
            {approvedMembers.slice(0, 5).map((member, i) => (
              <div 
                key={i} 
                className="inline-block h-7 w-7 rounded-full ring-2 ring-s1 bg-s3 text-[9px] flex items-center justify-center text-[#8892B0] font-bold border border-white/5"
              >
                {member.avatar_initials}
              </div>
            ))}
            {approvedMembers.length > 5 && (
              <div className="inline-block h-7 w-7 rounded-full ring-2 ring-s1 bg-g/10 text-[9px] flex items-center justify-center text-g font-bold border border-g/20">
                +{approvedMembers.length - 5}
              </div>
            )}
          </div>
          
          <div className="text-g font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
            Details <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupCard;
