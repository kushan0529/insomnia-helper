import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Moon, Menu, X, LogOut, User, Settings, ArrowRight } from 'lucide-react';
import { logout } from '../redux/slices/authSlice';
import { getGroups } from '../utils/groups';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, token } = useSelector(state => state.auth || { user: null, token: null });
  const dispatch = useDispatch();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/home', icon: '🏠' },
    { name: 'Mood', path: '/mood', icon: '💭' },
    { name: 'Programs', path: '/programs', icon: '🧠' },
    { name: 'Circles', path: '/rooms', icon: '⭕' },
    { name: 'Groups', path: '/groups', icon: '👥' },
    { name: 'Journal', path: '/journal', icon: '📓' },
  ];

  const [pendingTotal, setPendingTotal] = useState(0);

  useEffect(() => {
    if (user) {
      const groups = getGroups();
      const myHosted = groups.filter(g => g.host.name === user.username);
      const pending = myHosted.reduce((acc, g) => acc + g.members.filter(m => m.status === 'pending').length, 0);
      setPendingTotal(pending);
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-[62px] z-[100] bg-ink/80 backdrop-blur-[28px] border-b border-g/10 px-4 md:px-8 flex items-center justify-between">
      {/* LEFT: LOGO */}
      <Link to="/home" className="flex items-center gap-2 group shrink-0">
        <span className="font-heading text-lg md:text-xl font-bold text-g tracking-wider">
          🌙 Insomnia<em className="text-white not-italic">Helper</em>
        </span>
      </Link>

      {/* CENTER: NAV LINKS (Desktop) */}
      <div className="hidden lg:flex items-center gap-1 flex-1 px-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => `
              shrink-0 px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-300 flex items-center gap-2
              ${isActive 
                ? 'text-g bg-g/10 border border-g/20 shadow-[0_0_15px_rgba(201,168,76,0.1)]' 
                : 'text-[#8892B0] hover:text-white hover:bg-white/5 border border-transparent'}
            `}
          >
            <span>{link.icon}</span>
            {link.name}
            {link.name === 'Groups' && pendingTotal > 0 && (
              <span className="w-1.5 h-1.5 bg-g rounded-full animate-pulse" />
            )}
          </NavLink>
        ))}
      </div>

      {/* RIGHT: AUTH & ACTIONS */}
      <div className="flex items-center gap-4 shrink-0">
        {token ? (
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-9 h-9 rounded-full border border-g/30 bg-s1/50 flex items-center justify-center font-heading text-g hover:scale-105 transition-transform"
            >
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </button>

            {isDropdownOpen && (
              <div className="absolute top-12 right-0 w-48 bg-s1 border border-white/10 backdrop-blur-3xl rounded-xl py-2 shadow-2xl animate-pg-in">
                <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-[13px] text-white/80 hover:bg-g/10 hover:text-g transition-colors">
                  <User size={14} /> Profile
                </Link>
                <Link to="/my-groups" onClick={() => setIsDropdownOpen(false)} className="flex items-center justify-between px-4 py-3 text-[13px] text-white/80 hover:bg-g/10 hover:text-g transition-colors">
                  <span className="flex items-center gap-3"><Moon size={14} /> My Groups</span>
                  {pendingTotal > 0 && <span className="bg-g text-black text-[10px] font-bold px-1.5 py-0.5 rounded-sm">{pendingTotal}</span>}
                </Link>
                <Link to="/settings" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-[13px] text-white/80 hover:bg-g/10 hover:text-g transition-colors">
                  <Settings size={14} /> Settings
                </Link>
                <div className="h-px bg-white/5 my-1" />
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-red-400 hover:bg-red-400/10 transition-colors text-left"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/register" className="btn-gold !py-2 !px-5 flex items-center gap-2">
            Find a Group <ArrowRight size={14} />
          </Link>
        )}

        {/* Hamburger for mobile */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-[#8892B0] hover:text-white">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[62px] bg-ink/98 backdrop-blur-3xl z-[100] lg:hidden px-8 py-10 flex flex-col items-center gap-6 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="font-heading text-3xl text-white hover:text-g transition-colors flex items-center gap-3"
            >
              <span className="text-2xl">{link.icon}</span>
              {link.name}
              {link.name === 'Groups' && pendingTotal > 0 && (
                <span className="bg-g text-black text-xs font-bold px-2 py-0.5 rounded-full">{pendingTotal}</span>
              )}
            </Link>
          ))}
          {token && (
            <div className="w-full flex flex-col gap-4 mt-4 border-t border-white/5 pt-8">
               <Link 
                 to="/profile" 
                 onClick={() => setIsMenuOpen(false)} 
                 className="flex items-center justify-center gap-3 text-white/60 hover:text-white transition-colors"
               >
                 <User size={20} /> <span className="font-heading text-xl">Profile</span>
               </Link>
               <Link 
                 to="/settings" 
                 onClick={() => setIsMenuOpen(false)} 
                 className="flex items-center justify-center gap-3 text-white/60 hover:text-white transition-colors"
               >
                 <Settings size={20} /> <span className="font-heading text-xl">Settings</span>
               </Link>
               <button 
                 onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                 className="flex items-center justify-center gap-3 text-red-400 mt-4"
               >
                 <LogOut size={20} /> <span className="font-heading text-xl">Sign Out</span>
               </button>
            </div>
          )}
          {!token && (
            <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn-gold !w-full !text-center !py-4 !text-lg mt-4">
              Join the Circle
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
