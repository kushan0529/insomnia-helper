import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGroups } from '../../utils/groups';
import GroupCard from '../../components/groups/GroupCard';
import { Search, Plus, MapPin, Users } from 'lucide-react';

const GroupsDiscovery = () => {
  const [groups, setGroups] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setGroups(getGroups());
  }, []);

  const categories = ['All', 'Anxiety', 'Depression', 'Stress', 'Sleep', 'Grief'];

  const filteredGroups = groups.filter(group => {
    const matchesFilter = filter === 'All' || group.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch = group.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          group.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-[1240px] mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div className="max-w-[600px]">
          <span className="text-[10px] font-bold tracking-[6px] uppercase text-g mb-6 block">The Underground Movement</span>
          <h1 className="font-heading text-6xl md:text-8xl font-bold text-white mb-6 uppercase tracking-tight italic">
            Weekly <span className="text-g">Meetups.</span>
          </h1>
          <p className="text-[#8892B0] text-lg leading-relaxed italic opacity-80">
            "We are not a clinic. We are a movement." Join or lead a confidential, face-to-face sanctuary for local peer support. Real stories, raw truth, and zero judgement.
          </p>
        </div>
        
        <div className="relative w-full lg:w-[360px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5370]" size={18} />
          <input 
            type="text" 
            placeholder="Search by city, category or title..." 
            className="w-full bg-s1/50 border border-white/5 text-white pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:border-g/30 transition-all text-sm font-body"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar border-b border-white/5">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all text-[12px] font-medium border ${
              filter === cat 
              ? 'bg-g/10 border-g/30 text-g shadow-[0_4px_12px_rgba(201,168,76,0.1)]' 
              : 'bg-transparent text-[#8892B0] border-transparent hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      ) : (
        <div className="glass-card flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 mb-8 rounded-full bg-g/5 border border-g/10 flex items-center justify-center">
            <Users className="text-g/20" size={36} />
          </div>
          <h3 className="font-heading text-3xl font-bold text-white mb-6 uppercase tracking-widest italic">The silence is deafening.</h3>
          <p className="text-[#8892B0] text-[13px] mb-10 max-w-[360px] opacity-70">No meetups detected in this sector. This is your cue. Stand up, lead the movement, and build the connections your city needs.</p>
          <Link to="/groups/create" className="btn-gold !px-12 !py-4 flex items-center gap-3">
             <Plus size={20} /> LEAD A MOVEMENT
          </Link>
        </div>
      )}

      {/* Floating Action Button */}
      <Link 
        to="/groups/create" 
        className="fixed bottom-10 right-10 w-14 h-14 bg-g text-black rounded-full flex items-center justify-center shadow-[0_12px_48px_rgba(201,168,76,0.4)] hover:scale-110 hover:-translate-y-1 transition-all z-50 border-2 border-white/10"
        title="Host a Circle"
      >
        <Plus size={24} strokeWidth={3} />
      </Link>
    </div>
  );
};

export default GroupsDiscovery;
