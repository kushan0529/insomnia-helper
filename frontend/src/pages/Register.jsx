import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Moon, Sparkles, Brain, CheckCircle2, ArrowRight, MapPin, User, Mail, Shield } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-hot-toast';
import { registerUser } from '../redux/slices/authSlice';

const Register = () => {
  const [phase, setPhase] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isDepressed, setIsDepressed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error: authError } = useSelector(state => state.auth || { error: null });

  const [answers, setAnswers] = useState({
    q1: '', q2: '', q3: '', q4: 5, q5: ''
  });

  const [formData, setFormData] = useState({
    username: '', 
    email: '', 
    password: '', 
    city: '', 
    sleepIssueCategory: 'General', 
    isAnonymous: true
  });

  useEffect(() => {
    if (authError) {
      toast.error(authError);
    }
  }, [authError]);

  const handleAssessmentSubmit = async () => {
    if (!answers.q1 || !answers.q2 || !answers.q3 || !answers.q5) {
      toast.error("Please answer all questions so we can help you best.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/ai/depression-check', { answers });
      setTimeout(() => {
        setIsDepressed(response.data.depressed);
        setLoading(false);
        setPhase(2);
      }, 1500);
    } catch (err) {
      setTimeout(() => {
        setIsDepressed(false);
        setLoading(false);
        setPhase(2);
      }, 1500);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please provide your name, email, and a secure password.");
      return;
    }
    
    setLoading(true);
    const finalData = { 
      username: formData.username.trim(), 
      email: formData.email.trim().toLowerCase(), 
      password: formData.password, 
      city: formData.city.trim() || "Earth", 
      sleepIssueCategory: formData.sleepIssueCategory, 
      isAnonymous: formData.isAnonymous,
      isDepressed: Boolean(isDepressed)
    };
    
    const result = await dispatch(registerUser(finalData));
    
    if (registerUser.fulfilled.match(result)) {
      setPhase(4);
      setTimeout(() => navigate('/dashboard'), 3000);
    } else {
      setLoading(false);
      if (result.payload?.message) {
        toast.error(result.payload.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-62px)] flex items-center justify-center px-6 py-12">
      <div className="max-w-[500px] w-full relative">
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="phase1"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass p-8 md:p-10 border-g/10 shadow-[0_32px_128px_rgba(0,0,0,0.6)]"
            >
              <div className="flex flex-col items-center text-center mb-10">
                <div className="w-14 h-14 rounded-full bg-g/5 border border-g/10 flex items-center justify-center mb-6">
                  <Sparkles className="text-g" size={24} />
                </div>
                <h1 className="font-heading text-3xl font-bold text-white mb-2">Self‑Check</h1>
                <p className="font-body text-[13px] text-[#8892B0] uppercase tracking-[3px]">Evaluating your state</p>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-g/60 tracking-[2px] uppercase">How often do you feel hopeless?</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Never', 'Sometimes', 'Always'].map(opt => (
                      <button 
                        key={opt} type="button"
                        onClick={() => setAnswers({...answers, q1: opt})}
                        className={`py-3 rounded-xl text-[11px] font-bold transition-all border ${
                          answers.q1 === opt ? 'bg-g/10 border-g text-g' : 'bg-s1/30 border-white/5 text-[#8892B0] hover:text-white'
                        }`}
                      >{opt}</button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-g/60 tracking-[2px] uppercase">Hours slept last night?</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['0-2', '3-5', '6-8', '8+'].map(opt => (
                      <button 
                        key={opt} type="button"
                        onClick={() => setAnswers({...answers, q2: opt})}
                        className={`py-3 rounded-xl text-[11px] font-bold transition-all border ${
                          answers.q2 === opt ? 'bg-g/10 border-g text-g' : 'bg-s1/30 border-white/5 text-[#8892B0] hover:text-white'
                        }`}
                      >{opt}</button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-g/60 tracking-[2px] uppercase">Are you feeling disconnected?</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Yes', 'No', 'Partly'].map(opt => (
                      <button 
                        key={opt} type="button"
                        onClick={() => setAnswers({...answers, q3: opt})}
                        className={`py-3 rounded-xl text-[11px] font-bold transition-all border ${
                          answers.q3 === opt ? 'bg-g/10 border-g text-g' : 'bg-s1/30 border-white/5 text-[#8892B0] hover:text-white'
                        }`}
                      >{opt}</button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-g/60 tracking-[2px] uppercase">Any intrusive thoughts?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Yes', 'No'].map(opt => (
                      <button 
                        key={opt} type="button"
                        onClick={() => setAnswers({...answers, q5: opt.toUpperCase()})}
                        className={`py-3 rounded-xl text-[11px] font-bold transition-all border ${
                          answers.q5 === opt.toUpperCase() ? 'bg-g/10 border-g text-g' : 'bg-s1/30 border-white/5 text-[#8892B0] hover:text-white'
                        }`}
                      >{opt}</button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleAssessmentSubmit}
                  disabled={loading}
                  className="btn-gold w-full flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? "Analyzing state..." : "Analyze State"}
                  {!loading && <ArrowRight size={16} />}
                </button>
              </div>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              key="phase2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass p-10 text-center border-g/10"
            >
              <div className="w-20 h-20 rounded-full bg-g/5 border border-g/10 flex items-center justify-center mx-auto mb-8">
                <Brain className="text-g animate-pulse" size={36} />
              </div>
              <h1 className="font-heading text-3xl font-bold text-white mb-3"> Analysis Complete </h1>
              <p className="font-body text-[14px] text-[#8892B0] leading-relaxed mb-10">
                {isDepressed ? 
                  "Our system senses some heavy fragmentation. We are here to support you." : 
                  "You seem stable but vulnerable. You've come to the right place."}
              </p>
              
              <button 
                onClick={() => setPhase(3)}
                className="btn-gold w-full flex items-center justify-center gap-2"
              >
                {isDepressed ? "Accept & Enter" : "Continue to Circle"}
                <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div
              key="phase3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-8 md:p-10 border-g/10"
            >
              <div className="text-center mb-8">
                <h1 className="font-heading text-3xl font-bold text-white mb-2">Create Profile</h1>
                <p className="font-body text-[13px] text-[#8892B0] uppercase tracking-[3px]">Identity is your choice</p>
              </div>

              <form onSubmit={handleFinalSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-g/60 tracking-[2px] uppercase ml-1">Preferred Alias</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5370]" size={16} />
                    <input 
                      name="username"
                      className="w-full bg-s1/30 border border-white/5 p-3.5 pl-12 font-body text-[14px] text-white outline-none focus:border-g/30 transition-all rounded-xl"
                      placeholder="What should we call you?"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-g/60 tracking-[2px] uppercase ml-1">Security Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5370]" size={16} />
                    <input 
                      type="email"
                      name="email"
                      className="w-full bg-s1/30 border border-white/5 p-3.5 pl-12 font-body text-[14px] text-white outline-none focus:border-g/30 transition-all rounded-xl"
                      placeholder="External signal point"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-g/60 tracking-[2px] uppercase ml-1">Security Key</label>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5370]" size={16} />
                    <input 
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="w-full bg-s1/30 border border-white/5 p-3.5 pl-12 pr-12 font-body text-[14px] text-white outline-none focus:border-g/30 transition-all rounded-xl"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
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

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-g/60 tracking-[2px] uppercase ml-1">City / Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5370]" size={16} />
                    <input 
                      name="city"
                      className="w-full bg-s1/30 border border-white/5 p-3.5 pl-12 font-body text-[14px] text-white outline-none focus:border-g/30 transition-all rounded-xl"
                      placeholder="Where are you tonight?"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer mt-2"
                     onClick={() => setFormData({...formData, isAnonymous: !formData.isAnonymous})}>
                   <div>
                      <div className={`text-[11px] font-bold tracking-wider uppercase ${formData.isAnonymous ? 'text-g' : 'text-[#8892B0]'}`}>
                        {formData.isAnonymous ? "Anonymous Member" : "Known Profile"}
                      </div>
                      <p className="text-[9px] text-[#4A5370] uppercase">Toggle Privacy</p>
                   </div>
                   <div className={`w-10 h-5 flex items-center p-1 rounded-full transition-colors ${formData.isAnonymous ? 'bg-g' : 'bg-gray-800'}`}>
                      <div className={`w-3 h-3 bg-white rounded-full transition-all ${formData.isAnonymous ? 'ml-auto' : 'mr-auto'}`} />
                   </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? "Recording..." : "Join the Circle"}
                  {!loading && <CheckCircle2 size={16} />}
                </button>

                <p className="text-center text-[12px] text-[#4A5370] uppercase tracking-widest mt-6">
                  Already a recruit? <Link to="/login" className="text-g hover:text-white transition-colors underline underline-offset-4 decoration-g/30">Sign In</Link>
                </p>
              </form>
            </motion.div>
          )}

          {phase === 4 && (
            <motion.div
              key="phase4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-12 text-center border-g/10 shadow-[0_0_80px_rgba(201,168,76,0.1)]"
            >
              <div className="w-24 h-24 rounded-full border-2 border-g/30 flex items-center justify-center mx-auto mb-8 relative">
                <CheckCircle2 className="text-g" size={48} />
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-g"
                />
              </div>
              <h1 className="font-heading text-3xl font-bold text-white mb-2">Access Granted</h1>
              <p className="font-body text-[14px] text-[#8892B0] uppercase tracking-[4px]">Welcome to the Circle</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Register;
