
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGroup, requestToJoin, approveRequest, declineRequest, getCurrentUser } from '../../utils/groups';
import toast from 'react-hot-toast';

const GroupDetail = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshGroup();
  }, [id]);

  const refreshGroup = () => {
    const data = getGroup(id);
    if (data) {
      setGroup(data);
    }
    setLoading(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#C9A84C]">Loading...</div>;
  if (!group) return <div className="min-h-screen flex items-center justify-center text-white">Group not found</div>;

  const isHost = group.host.name === currentUser.name;
  const userMember = group.members.find(m => m.name === currentUser.name);
  const isApproved = userMember?.status === 'approved';
  const isPending = userMember?.status === 'pending';

  const handleJoinRequest = () => {
    requestToJoin(group.id, currentUser);
    toast.success("Request sent! The host will approve you soon.", {
      style: { background: '#1C1C1C', color: '#fff', borderLeft: '4px solid #C9A84C' }
    });
    refreshGroup();
  };

  const handleApprove = (userName) => {
    approveRequest(group.id, userName);
    toast.success("Approved! They can now see meetup details.", {
      style: { background: '#1C1C1C', color: '#fff', borderLeft: '4px solid #C9A84C' }
    });
    refreshGroup();
  };

  const handleDecline = (userName) => {
    declineRequest(group.id, userName);
    toast.error("Request declined.", {
      style: { background: '#1C1C1C', color: '#fff', borderLeft: '4px solid #ff4b4b' }
    });
    refreshGroup();
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const approvedMembers = group.members.filter(m => m.status === 'approved');
  const pendingRequests = group.members.filter(m => m.status === 'pending');

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-[#1C1C1C] border border-[#2a2a2a] rounded-2xl overflow-hidden mb-8">
        <div className="p-8 md:p-12 relative">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-[#C9A84C] text-black text-xs font-black px-3 py-1 rounded-full uppercase">
              {group.category}
            </span>
            {group.tags.map((tag, i) => (
              <span key={i} className="bg-[#2a2a2a] text-[#9A9A9A] text-xs px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {group.title}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-[#C9A84C] text-black flex items-center justify-center text-lg font-black shadow-lg">
              {group.host.avatar_initials}
            </div>
            <div>
              <p className="text-[#9A9A9A] text-sm">Organized by</p>
              <p className="text-white font-bold">{group.host.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#0D0D0D] p-4 rounded-xl border border-[#2a2a2a] flex flex-col items-center text-center">
              <span className="text-2xl mb-1">📍</span>
              <span className="text-sm font-bold text-white">Location</span>
              <div className="relative">
                <span className={`text-xs text-[#9A9A9A] ${!isApproved && !isHost ? 'blur-sm select-none' : ''}`}>
                  {group.location}
                </span>
                {!isApproved && !isHost && (
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] text-[#C9A84C] font-bold">
                    Join to reveal
                  </span>
                )}
              </div>
            </div>
            <div className="bg-[#0D0D0D] p-4 rounded-xl border border-[#2a2a2a] flex flex-col items-center text-center">
              <span className="text-2xl mb-1">📅</span>
              <span className="text-sm font-bold text-white">Date</span>
              <span className="text-xs text-[#9A9A9A]">{group.date}</span>
            </div>
            <div className="bg-[#0D0D0D] p-4 rounded-xl border border-[#2a2a2a] flex flex-col items-center text-center">
              <span className="text-2xl mb-1">🕐</span>
              <span className="text-sm font-bold text-white">Time</span>
              <span className="text-xs text-[#9A9A9A]">{group.time}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {!isHost && !userMember && (
              <button 
                onClick={handleJoinRequest}
                className="flex-grow bg-[#C9A84C] text-black font-black py-4 rounded-lg uppercase tracking-widest hover:bg-[#d4b96a] transition-all"
              >
                Request to Join
              </button>
            )}
            {isPending && (
              <button disabled className="flex-grow bg-[#2a2a2a] text-[#9A9A9A] font-black py-4 rounded-lg uppercase tracking-widest cursor-not-allowed">
                Request Pending...
              </button>
            )}
            {isApproved && !isHost && (
              <button disabled className="flex-grow bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/30 font-black py-4 rounded-lg uppercase tracking-widest">
                You're In ✓
              </button>
            )}
            <button 
              onClick={copyLink}
              className="px-8 border border-[#2a2a2a] text-[#9A9A9A] font-bold rounded-lg hover:border-[#C9A84C] hover:text-white transition-all py-4"
            >
              Share Link
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#1C1C1C] border border-[#2a2a2a] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#C9A84C]"></span>
              About the Group
            </h2>
            <p className="text-[#9A9A9A] leading-relaxed whitespace-pre-line">
              {group.description}
            </p>
          </div>

          {/* Members List */}
          <div className="bg-[#1C1C1C] border border-[#2a2a2a] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#C9A84C]"></span>
              Members ({approvedMembers.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {approvedMembers.map((member, i) => (
                <div key={i} className="flex flex-col items-center">
                   <div className="w-14 h-14 rounded-full bg-[#2a2a2a] border-2 border-[#C9A84C]/20 flex items-center justify-center text-lg font-bold text-white mb-2">
                     {member.avatar_initials}
                   </div>
                   <span className="text-xs text-[#9A9A9A] truncate w-full text-center">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Manage / Status */}
        <div className="space-y-8">
          {isHost && (
            <div className="bg-[#1C1C1C] border border-[#C9A84C]/30 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-[#C9A84C] mb-4">Manage Requests</h2>
              {pendingRequests.length > 0 ? (
                <div className="space-y-4">
                  {pendingRequests.map((request, i) => (
                    <div key={i} className="bg-[#0D0D0D] p-4 rounded-xl border border-[#2a2a2a]">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-xs font-bold text-white">
                          {request.avatar_initials}
                        </div>
                        <span className="text-sm font-bold text-white">{request.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleApprove(request.name)}
                          className="flex-1 bg-[#C9A84C] text-black text-[10px] font-bold py-2 rounded uppercase"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleDecline(request.name)}
                          className="flex-1 border border-[#2a2a2a] text-[#9A9A9A] text-[10px] font-bold py-2 rounded uppercase hover:bg-red-500/10 hover:border-red-500/30"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#9A9A9A] italic text-center py-4">No pending requests at the moment.</p>
              )}
            </div>
          )}

          <div className="bg-[#1C1C1C] border border-[#2a2a2a] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">Group Stats</h2>
            <div className="flex justify-around">
               <div className="text-center">
                 <div className="text-2xl font-black text-[#C9A84C]">{approvedMembers.length}</div>
                 <div className="text-[10px] text-[#9A9A9A] uppercase tracking-wider">Going</div>
               </div>
               <div className="text-center">
                 <div className="text-2xl font-black text-[#C9A84C]">{group.maxMembers - approvedMembers.length}</div>
                 <div className="text-[10px] text-[#9A9A9A] uppercase tracking-wider">Remaining</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
