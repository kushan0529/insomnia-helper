
import React, { useState, useEffect } from 'react';
import { getGroups, getCurrentUser } from '../../utils/groups';
import GroupCard from '../../components/groups/GroupCard';
import { Link } from 'react-router-dom';

const MyGroups = () => {
  const [hostedGroups, setHostedGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    const allGroups = getGroups();
    
    setHostedGroups(allGroups.filter(g => g.host.name === currentUser.name));
    setJoinedGroups(allGroups.filter(g => 
      g.members.some(m => m.name === currentUser.name && m.status === 'approved') && 
      g.host.name !== currentUser.name
    ));
  }, [currentUser]);

  const totalMembers = hostedGroups.reduce((acc, g) => acc + g.members.filter(m => m.status === 'approved').length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            My <span className="text-[#C9A84C]">Dashboard</span>
          </h1>
          <p className="text-[#9A9A9A] text-lg">Manage the communities you've built and joined.</p>
        </div>

        <div className="bg-[#1C1C1C] border border-[#2a2a2a] p-6 rounded-2xl flex gap-12">
           <div className="text-center">
             <div className="text-3xl font-black text-[#C9A84C]">{hostedGroups.length}</div>
             <div className="text-[10px] text-[#9A9A9A] uppercase tracking-widest font-bold">Groups Hosted</div>
           </div>
           <div className="text-center">
             <div className="text-3xl font-black text-[#C9A84C]">{totalMembers}</div>
             <div className="text-[10px] text-[#9A9A9A] uppercase tracking-widest font-bold">Total Members</div>
           </div>
        </div>
      </div>

      {/* Tabs / Sections */}
      <div className="space-y-16">
        {/* Hosted Groups */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-[#2a2a2a] pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
               Groups I Host
               <span className="bg-[#C9A84C] text-black text-xs px-2 py-0.5 rounded-full">{hostedGroups.length}</span>
            </h2>
            <Link to="/groups/create" className="text-[#C9A84C] text-sm font-bold hover:underline">
              + Host Another
            </Link>
          </div>

          {hostedGroups.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostedGroups.map(group => {
                const pendingCount = group.members.filter(m => m.status === 'pending').length;
                return (
                  <div key={group.id} className="relative">
                    <GroupCard group={group} />
                    {pendingCount > 0 && (
                      <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-full animate-bounce shadow-xl ring-4 ring-[#0D0D0D]">
                        {pendingCount} NEW REQUESTS
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-[#1C1C1C] border border-dashed border-[#2a2a2a] rounded-2xl p-12 text-center">
              <p className="text-[#9A9A9A] mb-4 italic text-lg">You haven't hosted any groups yet.</p>
              <Link to="/groups/create" className="inline-block bg-[#C9A84C] text-black px-6 py-2 rounded font-bold uppercase text-xs">
                Start your first group
              </Link>
            </div>
          )}
        </section>

        {/* Joined Groups */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-[#2a2a2a] pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
               Groups I've Joined
               <span className="bg-[#2a2a2a] text-[#9A9A9A] text-xs px-2 py-0.5 rounded-full">{joinedGroups.length}</span>
            </h2>
            <Link to="/groups" className="text-[#C9A84C] text-sm font-bold hover:underline">
              Find More
            </Link>
          </div>

          {joinedGroups.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedGroups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          ) : (
            <div className="bg-[#1C1C1C] border border-dashed border-[#2a2a2a] rounded-2xl p-12 text-center">
              <p className="text-[#9A9A9A] mb-4 italic text-lg">You haven't joined any groups yet.</p>
              <Link to="/groups" className="inline-block border border-[#C9A84C] text-[#C9A84C] px-6 py-2 rounded font-bold uppercase text-xs hover:bg-[#C9A84C] hover:text-black transition-colors">
                Explore Groups
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyGroups;
