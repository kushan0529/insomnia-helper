import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Moon, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(loginUser({ email, password })).then(res => {
      if (!res.error) {
        navigate('/dashboard');
      } else {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 overflow-hidden">
      {/* Background with Main Photo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/photos/mainphoto.png" 
          alt="Login Background" 
          className="w-full h-full object-cover filter contrast-[1.2] saturate-[0.6] brightness-[0.55] scale-[1.25]" 
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[420px] w-full card-brutal border-white/10 relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <Moon className="text-fc-gold mb-4" size={32} />
          <h1 className="font-heading text-[48px] text-white tracking-widest leading-none">IDENTIFY</h1>
          <p className="font-body text-[12px] text-fc-gold tracking-[0.3em] uppercase mt-2">Access your circle</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-heading text-[11px] text-white/40 tracking-widest uppercase ml-1">Email Address</label>
            <input
              type="email"
              placeholder="you@thecircle.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 p-4 font-body text-white outline-none focus:border-fc-gold/50 transition-all rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="font-heading text-[11px] text-white/40 tracking-widest uppercase ml-1">Security Key</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 p-4 pr-12 font-body text-white outline-none focus:border-fc-gold/50 transition-all rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-fc-gold transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="button-fight w-full h-[56px] text-[20px] rounded-lg disabled:opacity-50"
            >
              {isSubmitting ? 'VERIFYING...' : 'ENTER THE CIRCLE'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <span className="font-body text-[13px] text-white/40 uppercase tracking-widest">Forgot your password? </span>
          <Link to="/register" className="font-body text-[13px] text-fc-gold hover:text-white transition-colors uppercase tracking-widest underline underline-offset-4 decoration-fc-gold/30">Reset</Link>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <span className="font-body text-[13px] text-white/40 uppercase tracking-widest">New to the night? </span>
          <Link to="/register" className="font-body text-[13px] text-fc-gold hover:text-white transition-colors uppercase tracking-widest">Join now</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
