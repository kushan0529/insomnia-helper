
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-hot-toast';
import { registerUser } from '../redux/slices/authSlice';
import styles from './Register.module.css';

const Register = () => {
  const [phase, setPhase] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isDepressed, setIsDepressed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error: authError } = useSelector(state => state.auth);

  // Phase 1 Assessment State
  const [answers, setAnswers] = useState({
    q1: '', q2: '', q3: '', q4: 5, q5: ''
  });

  // Phase 3 Form State
  const [formData, setFormData] = useState({
    username: '', 
    email: '', 
    password: '', 
    city: '', 
    sleepIssueCategory: 'General', 
    isAnonymous: true
  });

  // Watch for authError and show toast
  useEffect(() => {
    if (authError) {
      toast.error(authError);
    }
  }, [authError]);

  const handleAssessmentSubmit = async () => {
    if (!answers.q1 || !answers.q2 || !answers.q3 || !answers.q5) {
      toast.error("Don't leave the night empty.");
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
      console.error('Assessment Error:', err);
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
      toast.error("Identity and secret are required.");
      return;
    }
    
    setLoading(true);
    const finalData = { 
      username: formData.username.trim(), 
      email: formData.email.trim().toLowerCase(), 
      password: formData.password, 
      city: formData.city.trim() || "Unknown", 
      sleepIssueCategory: formData.sleepIssueCategory, 
      isAnonymous: formData.isAnonymous,
      isDepressed: Boolean(isDepressed)
    };
    
    console.log('[DEBUG] Registering with:', finalData);
    
    const result = await dispatch(registerUser(finalData));
    
    if (registerUser.fulfilled.match(result)) {
      setPhase(4);
      setTimeout(() => navigate('/dashboard'), 3000);
    } else {
      setLoading(false);
      console.error('[DEBUG] Registration Failed:', result.payload);
      if (result.payload?.message) {
        toast.error(result.payload.message);
      } else {
        toast.error("The underground denied your entry. Try again.");
      }
    }
  };

  return (
    <div className={styles.registerPage}>
      {/* Cinematic Background Layer */}
      <div className={styles.bgWrapper}>
        <div className={styles.bgImage} />
        <div className={styles.darkOverlay} />
        <div className={styles.redHighlight} />
        <div className={styles.grittyTexture} />
        <div className={styles.vignette} />
        <div className={styles.scanline} />
      </div>

      {/* Foreground Content */}
      <div className={styles.formContainer}>
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="phase1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className={`${styles.bebas} ${styles.title}`}>PRE-ENTRY</h1>
              <p className={styles.subtitle}>EVALUATING YOUR MENTAL FRAGMENTATION</p>
              
              <div className="space-y-6">
                <div className={styles.inputGroup}>
                  <label className={styles.label}>HOW OFTEN DO YOU FEEL HOPELESS?</label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {['NEVER', 'SOMETIMES', 'ALWAYS'].map(opt => (
                      <button 
                        key={opt} type="button"
                        onClick={() => setAnswers({...answers, q1: opt})}
                        className={`${styles.input} ${answers.q1 === opt ? 'border-[#8b0000] bg-[#8b0000]/20' : ''}`}
                        style={{ padding: '10px', fontSize: '10px' }}
                      >{opt}</button>
                    ))}
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>HOURS SLEPT LAST NIGHT?</label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {['0-2', '3-5', '6-8', '8+'].map(opt => (
                      <button 
                        key={opt} type="button"
                        onClick={() => setAnswers({...answers, q2: opt})}
                        className={`${styles.input} ${answers.q2 === opt ? 'border-[#8b0000] bg-[#8b0000]/20' : ''}`}
                        style={{ padding: '10px', fontSize: '9px' }}
                      >{opt}</button>
                    ))}
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>ARE YOU DISCONNECTED?</label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {['YES', 'NO', 'PARTLY'].map(opt => (
                      <button 
                        key={opt} type="button"
                        onClick={() => setAnswers({...answers, q3: opt})}
                        className={`${styles.input} ${answers.q3 === opt ? 'border-[#8b0000] bg-[#8b0000]/20' : ''}`}
                        style={{ padding: '10px', fontSize: '10px' }}
                      >{opt}</button>
                    ))}
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>INTRUSIVE THOUGHTS?</label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <button 
                      type="button"
                      onClick={() => setAnswers({...answers, q5: 'YES'})}
                      className={`${styles.input} ${answers.q5 === 'YES' ? 'border-[#8b0000] bg-[#8b0000]/20' : ''}`}
                    >YES</button>
                    <button 
                      type="button"
                      onClick={() => setAnswers({...answers, q5: 'NO'})}
                      className={`${styles.input} ${answers.q5 === 'NO' ? 'border-[#8b0000] bg-[#8b0000]/20' : ''}`}
                    >NO</button>
                  </div>
                </div>

                <button 
                  onClick={handleAssessmentSubmit}
                  disabled={loading}
                  className={`${styles.bebas} ${styles.submitBtn}`}
                >
                  {loading ? "ANALYZING DESPAIR..." : "ANALYZE STATE"}
                </button>
              </div>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              key="phase2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <h1 className={`${styles.bebas} ${styles.title}`} style={{ border: 'none', padding: 0 }}>
                CALIBRATION COMPLETE
              </h1>
              <p className={styles.subtitle} style={{ padding: 0 }}>
                {isDepressed ? "SENSING EXTREME FRAGMENTATION." : "STABLE BUT VULNERABLE."}
              </p>
              <div className="w-full h-px bg-white/10 my-8" />
              <button 
                onClick={() => setPhase(3)}
                className={`${styles.bebas} ${styles.submitBtn}`}
              >
                {isDepressed ? "ACCEPT THE TRUTH & ENTER" : "CONTINUE TO RECRUITMENT"}
              </button>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div
              key="phase3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className={`${styles.bebas} ${styles.title}`}>RECRUITMENT</h1>
              <p className={styles.subtitle}>IDENTITY IS OPTIONAL. TRUTH IS NOT.</p>

              <form onSubmit={handleFinalSubmit}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>ALIAS</label>
                  <input 
                    name="username"
                    className={styles.input} 
                    placeholder="WHAT DO THEY CALL YOU?"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>SIGNAL (EMAIL)</label>
                  <input 
                    type="email"
                    name="email"
                    className={styles.input} 
                    placeholder="EXTERNAL CONTACT POINT"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>KEY (PASSWORD)</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`${styles.input} pr-12`} 
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-fc-red transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>CITY / LOCATION</label>
                  <input 
                    name="city"
                    className={styles.input} 
                    placeholder="WHERE DO YOU LIE AWAKE?"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>

                <div className="flex items-center justify-between mb-8 bg-white/5 p-4 border border-white/10 cursor-pointer"
                     onClick={() => setFormData({...formData, isAnonymous: !formData.isAnonymous})}>
                   <div>
                      <div className={styles.bebas} style={{ fontSize: '14px', color: formData.isAnonymous ? '#8b0000' : '#aaa' }}>
                        {formData.isAnonymous ? "ANONYMOUS RECRUIT" : "KNOWN OPERATIVE"}
                      </div>
                      <p className="text-[9px] opacity-40 uppercase">Toggle Privacy Status</p>
                   </div>
                   <div className={`w-10 h-5 flex items-center p-1 rounded-full ${formData.isAnonymous ? 'bg-[#8b0000]' : 'bg-gray-800'}`}>
                      <div className={`w-3 h-3 bg-white rounded-full transition-all ${formData.isAnonymous ? 'ml-auto' : 'mr-auto'}`} />
                   </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className={`${styles.bebas} ${styles.submitBtn}`}
                >
                  {loading ? "RECORDING..." : "ENTER THE CIRCLE"}
                </button>

                <p className={styles.footerText}>
                  ALREADY A RECRUIT? 
                  <Link to="/login" className={styles.link}>SIGN IN</Link>
                </p>
              </form>
            </motion.div>
          )}

          {phase === 4 && (
            <motion.div
              key="phase4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <h1 className={`${styles.bebas} ${styles.title}`} style={{ border: 'none', padding: 0, color: '#8b0000' }}>
                ACCESS GRANTED
              </h1>
              <p className={styles.subtitle} style={{ padding: 0 }}>WELCOME TO THE UNDERGROUND.</p>
              <div className="mt-8 flex justify-center">
                 <div className="w-12 h-12 border-4 border-fc-red border-t-transparent rounded-full animate-spin" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Register;
