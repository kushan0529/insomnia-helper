import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Moon, Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';

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
    <div className="min-h-[calc(100vh-62px)] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[440px] w-full glass p-8 md:p-10 border-g/10 shadow-[0_32px_128px_rgba(0,0,0,0.6)]"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 rounded-full bg-g/5 border border-g/10 flex items-center justify-center mb-6">
            <Moon className="text-g" size={28} />
          </div>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="font-body text-[13px] text-[#8892B0] uppercase tracking-[3px]">Access your circle</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-g/60 tracking-[2px] uppercase ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5370]" size={16} />
              <input
                type="email"
                placeholder="email@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-s1/30 border border-white/5 p-3.5 pl-12 font-body text-[14px] text-white outline-none focus:border-g/30 transition-all rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-g/60 tracking-[2px] uppercase ml-1">Security Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5370]" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-s1/30 border border-white/5 p-3.5 pl-12 pr-12 font-body text-[14px] text-white outline-none focus:border-g/30 transition-all rounded-xl"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4A5370] hover:text-g transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold w-full flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isSubmitting ? 'Verifying...' : 'Sign In'}
              {!isSubmitting && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /> }
            </button>
          </div>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center flex flex-col gap-4">
          <p className="text-[12px] text-[#4A5370] uppercase tracking-widest leading-loose">
            New to the night? <Link to="/register" className="text-g hover:text-white transition-colors underline underline-offset-4 decoration-g/30">Join the circle</Link>
          </p>
          <p className="text-[11px] text-[#4A5370] uppercase tracking-widest">
            Having trouble? <span className="text-white/60 cursor-pointer hover:text-white">Reset credentials</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
