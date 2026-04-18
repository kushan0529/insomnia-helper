
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGroups } from '../../utils/groups';
import GroupCard from '../../components/groups/GroupCard';

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
    <div className="max-w-7xl mx-auto px-4 py-8 relative min-h-[80vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Groups & <span className="text-[#C9A84C]">Meetups</span>
          </h1>
          <p className="text-[#9A9A9A] text-lg">Find your tribe. You don't have to face this alone.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search by title or city..." 
            className="bg-[#1C1C1C] border border-[#2a2a2a] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition-all w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex overflow-x-auto pb-4 mb-8 gap-3 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full whitespace-nowrap transition-all border ${
              filter === cat 
              ? 'bg-[#C9A84C] text-black border-[#C9A84C] font-bold' 
              : 'bg-[#1C1C1C] text-[#9A9A9A] border-[#2a2a2a] hover:border-[#C9A84C]/50'
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
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 mb-6 text-[#C9A84C] opacity-20">
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No groups yet</h3>
          <p className="text-[#9A9A9A] mb-8">Be the first to host a group and support your community.</p>
          <Link to="/groups/create" className="bg-[#C9A84C] text-black px-8 py-3 rounded-md font-bold hover:bg-[#d4b96a] transition-colors">
            + Host a Group
          </Link>
        </div>
      )}

      {/* Floating Action Button */}
      <Link 
        to="/groups/create" 
        className="fixed bottom-10 right-10 w-16 h-16 bg-[#C9A84C] text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 text-3xl font-bold"
        title="Host a Group"
      >
        +
      </Link>
    </div>
  );
};

export default GroupsDiscovery;
