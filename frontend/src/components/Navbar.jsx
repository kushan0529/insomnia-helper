import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Moon, Menu, X, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { logout } from '../redux/slices/authSlice';
import { getGroups } from '../utils/groups';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const navLinks = [
    { name: 'HOME', path: '/home' },
    { name: 'GROUPS', path: '/groups' },
    { name: 'THE CIRCLE', path: '/rooms' },
    { name: 'PROGRAMS', path: '/programs' },
    { name: 'DASHBOARD', path: '/dashboard' },
  ];

  const [pendingTotal, setPendingTotal] = useState(0);

  React.useEffect(() => {
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
    <nav className="fixed top-0 left-0 right-0 h-[72px] z-50 bg-black/85 backdrop-blur-xl border-b border-white/10 px-6 md:px-12 flex items-center justify-between">
      {/* LEFT: LOGO */}
      <Link to="/home" className="flex items-center gap-3 group">
        <Moon className="text-fc-gold group-hover:rotate-12 transition-transform" size={24} />
        <span className="font-heading text-2xl text-white tracking-[0.1em]">INSOMNIA HELPER</span>
      </Link>

      {/* CENTER: NAV LINKS (Desktop) */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => `
              font-body text-[14px] transition-all duration-200 tracking-wider flex items-center gap-1.5
              ${isActive ? 'text-fc-gold border-b border-fc-gold pb-1' : 'text-white/80 hover:text-fc-gold'}
            `}
          >
            {link.name}
            {link.name === 'GROUPS' && pendingTotal > 0 && (
              <span className="w-2 h-2 bg-fc-gold rounded-full animate-pulse shadow-[0_0_8px_rgba(201,168,76,0.8)]" />
            )}
          </NavLink>
        ))}
      </div>

      {/* RIGHT: AUTH */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 rounded-full border border-fc-gold overflow-hidden hover:scale-110 transition-transform"
            >
              <div className="w-full h-full bg-fc-grey flex items-center justify-center font-heading text-fc-gold">
                {user?.username?.[0]?.toUpperCase() || 'U'}
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-12 right-0 w-48 bg-black/95 border border-white/10 backdrop-blur-2xl rounded-lg py-2 shadow-2xl">
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:bg-fc-gold/10 hover:text-fc-gold transition-colors font-body">
                  <User size={16} /> PROFILE
                </Link>
                <Link to="/my-groups" className="flex items-center justify-between px-4 py-3 text-sm text-white/80 hover:bg-fc-gold/10 hover:text-fc-gold transition-colors font-body">
                  <span className="flex items-center gap-3"><Moon size={16} /> MY GROUPS</span>
                  {pendingTotal > 0 && <span className="bg-fc-gold text-black text-[10px] font-black px-1.5 py-0.5 rounded-sm">{pendingTotal}</span>}
                </Link>
                <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:bg-fc-gold/10 hover:text-fc-gold transition-colors font-body">
                  <Settings size={16} /> SETTINGS
                </Link>
                <div className="h-px bg-white/5 my-1" />
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-fc-red hover:bg-fc-red/10 transition-colors font-body text-left"
                >
                  <LogOut size={16} /> LOGOUT
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/register" className="hidden md:block bg-fc-gold text-black font-heading text-[13px] px-6 py-2.5 rounded-[2px] hover:brightness-110 transition-all shadow-[0_0_15px_rgba(201,168,76,0.3)]">
            JOIN NOW
          </Link>
        )}

        {/* Hamburger */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-black/95 backdrop-blur-3xl z-[100] md:hidden px-8 py-12 flex flex-col items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="font-heading text-4xl text-white hover:text-fc-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {!token && (
            <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full text-center bg-fc-gold text-black font-heading text-2xl py-4 mt-8">
              JOIN NOW
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
