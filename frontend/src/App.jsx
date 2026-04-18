import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyStories from './pages/MyStories';
import RoomDetail from './pages/RoomDetail';
import Stories from './pages/Stories';
import PostStory from './pages/PostStory';
import Rooms from './pages/Rooms';
import AudioLibrary from './pages/AudioLibrary';
import CBTProgram from './pages/CBTProgram';
import Journal from './pages/Journal';
import SleepLog from './pages/SleepLog';
import { Toaster } from 'react-hot-toast';

// Groups & Meetups
import GroupsDiscovery from './pages/groups/GroupsDiscovery';
import CreateGroup from './pages/groups/CreateGroup';
import GroupDetail from './pages/groups/GroupDetail';
import MyGroups from './pages/groups/MyGroups';
import ShadowTalk from './pages/ShadowTalk';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import StoryDetail from './pages/StoryDetail';
import { getCurrentUser, setCurrentUser, getGroups } from './utils/groups';

const ApprovalBanner = () => {
  const [approvedGroups, setApprovedGroups] = React.useState([]);
  const { user } = useSelector(state => state.auth || { user: null });

  React.useEffect(() => {
    if (user) {
      const groups = getGroups();
      const userApproved = groups.filter(g => 
        g.members.some(m => m.name === user.username && m.status === 'approved') &&
        !localStorage.getItem(`dismissed_approval_${g.id}`)
      );
      setApprovedGroups(userApproved);
    }
  }, [user]);

  const dismiss = (id) => {
    localStorage.setItem(`dismissed_approval_${id}`, 'true');
    setApprovedGroups(prev => prev.filter(g => g.id !== id));
  };

  if (approvedGroups.length === 0) return null;

  return (
    <div className="fixed top-[72px] left-0 right-0 z-[45] flex flex-col gap-1 items-center pointer-events-none">
      {approvedGroups.map(group => (
        <div key={group.id} className="bg-[#C9A84C] text-black px-6 py-2 shadow-2xl flex items-center gap-4 pointer-events-auto animate-slide-down">
          <span className="font-bold text-sm tracking-wide">
            You've been approved for <span className="uppercase font-black">{group.title}</span>!
          </span>
          <button onClick={() => dismiss(group.id)} className="hover:scale-125 transition-transform">
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

const AppContent = () => {
  const { token, user } = useSelector(state => state.auth || { token: localStorage.getItem('token'), user: null });
  const location = useLocation();
  const isStandalone = ['/register', '/login', '/'].includes(location.pathname);

  // Sync Redux user with Groups localStorage user
  React.useEffect(() => {
    if (user) {
      const existing = getCurrentUser();
      if (existing.name !== user.username) {
        setCurrentUser({
          ...existing,
          name: user.username,
          avatar_initials: user.username?.[0]?.toUpperCase() || 'U'
        });
      }
    }
  }, [user]);

  return (
    <div className="relative min-h-screen bg-fc-black text-fc-white selection:bg-fc-gold selection:text-fc-black overflow-x-hidden">
      {/* Cinematic Global Background Overlays */}
      <div className="bg-fixed-image" />
      <div className="bg-dark-overlay" />
      <div className="bg-gradient-mesh" />

      {/* Cinematic Post-Processing Overlays only for main pages */}
      {!isStandalone && (
        <>
          <div className="film-grain" />
          <div className="vignette" />
          <div className="tyler-flash" id="tyler-flash" />
        </>
      )}

      {!isStandalone && <Navbar />}

      {/* Approval Notification Banner */}
      <ApprovalBanner />
      
      <main className={`relative z-10 min-h-screen ${!isStandalone ? 'pt-[72px]' : ''}`}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/my-stories" element={token ? <MyStories /> : <Navigate to="/login" />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/post-story" element={token ? <PostStory /> : <Navigate to="/login" />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/programs" element={<CBTProgram />} />
          <Route path="/audio" element={<AudioLibrary />} />
          <Route path="/sleep-log" element={token ? <SleepLog /> : <Navigate to="/login" />} />
          <Route path="/journal" element={token ? <Journal /> : <Navigate to="/login" />} />
          
          {/* Groups Routes */}
          <Route path="/groups" element={<GroupsDiscovery />} />
          <Route path="/groups/create" element={token ? <CreateGroup /> : <Navigate to="/login" />} />
          <Route path="/groups/:id" element={<GroupDetail />} />
          <Route path="/my-groups" element={token ? <MyGroups /> : <Navigate to="/login" />} />
          <Route path="/shadow-talk" element={<ShadowTalk />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/settings" element={token ? <Settings /> : <Navigate to="/login" />} />
          <Route path="/stories/:id" element={<StoryDetail />} />
        </Routes>
      </main>

      {!isStandalone && <Footer />}
      
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0a0a0a',
            color: '#d4d4d4',
            border: '1px solid #8b0000',
            padding: '16px',
            fontFamily: 'Special Elite',
            borderRadius: '0',
          }
        }}
      />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
