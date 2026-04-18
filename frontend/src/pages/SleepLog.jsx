import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../api';
import { toast } from 'react-hot-toast';
import { Moon, Sun, Trash2, Clock, Sparkles, Activity, FileText } from 'lucide-react';

const SleepLog = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [bedtime, setBedtime] = useState("23:30");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [quality, setQuality] = useState(3);
  const [mood, setMood] = useState('OK');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [logsRes, statsRes] = await Promise.all([
        api.get('/sleep'),
        api.get('/sleep/stats')
      ]);
      setLogs(logsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      toast.error("Could not retrieve sleep data.");
    } finally {
      setLoading(false);
    }
  };

  const calculateDuration = () => {
    const start = new Date(`2000-01-01T${bedtime}`);
    const end = new Date(`2000-01-01T${wakeTime}`);
    if (end < start) end.setDate(end.getDate() + 1);
    return (end - start) / (1000 * 60 * 60);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const duration = calculateDuration();
      await api.post('/sleep', {
        bedtime,
        wakeTime,
        sleepDuration: duration,
        quality,
        mood,
        notes
      });
      toast.success("Night recorded successfully.");
      fetchData();
      setNotes('');
    } catch (err) {
      toast.error("Could not record night.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this entry?")) {
      await api.delete(`/sleep/${id}`);
      fetchData();
    }
  };

  const getQualityLabel = (q) => ["Restless", "Poor", "Sufficient", "Good", "Restorative"][q-1];
  const getQualityColor = (q) => ["#FF6B6B", "#FF9F43", "#54A0FF", "#5F27CD", "#C9A84C"][q-1];

  return (
    <div className="max-w-[1240px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* LEFT: LOG FORM */}
      <div className="w-full lg:w-[400px]">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-8 md:p-10 border-g/10 shadow-[0_32px_128px_rgba(0,0,0,0.5)] lg:sticky lg:top-24"
        >
          <div className="flex items-center gap-3 mb-2 text-g">
            <Moon size={20} />
            <span className="text-[10px] font-bold tracking-[3px] uppercase">Night Sanctuary</span>
          </div>
          <h2 className="font-heading text-4xl font-bold text-white mb-2 italic">Record Rest</h2>
          <p className="font-body text-[#8892B0] text-sm mb-10 leading-relaxed">Honest tracking is the first step toward better healing.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#4A5370] tracking-[2px] uppercase ml-1">Fell Asleep</label>
                <div className="relative">
                  <Moon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5370]" size={14} />
                  <input 
                    type="time" 
                    value={bedtime}
                    onChange={(e) => setBedtime(e.target.value)}
                    className="w-full bg-s1/40 border border-white/5 pl-9 pr-4 py-3 rounded-xl font-heading text-lg text-white outline-none focus:border-g/30 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#4A5370] tracking-[2px] uppercase ml-1">Woke Up</label>
                <div className="relative">
                  <Sun className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5370]" size={14} />
                  <input 
                    type="time" 
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    className="w-full bg-s1/40 border border-white/5 pl-9 pr-4 py-3 rounded-xl font-heading text-lg text-white outline-none focus:border-g/30 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-g/5 border border-dashed border-g/20 text-center">
               <span className="font-heading text-4xl font-bold text-g">
                 {calculateDuration().toFixed(1)} <span className="text-[12px] font-body text-white/40 uppercase tracking-widest ml-1">Hours Captured</span>
               </span>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-[#4A5370] tracking-[2px] uppercase ml-1">Sleep Quality</label>
              <div className="grid grid-cols-5 gap-2">
                 {[1,2,3,4,5].map(q => (
                   <button
                     key={q}
                     type="button"
                     onClick={() => setQuality(q)}
                     className={`h-12 rounded-xl flex items-center justify-center text-xl border transition-all ${
                       quality === q ? 'bg-g/10 border-g text-g shadow-[0_0_20px_rgba(201,168,76,0.1)] scale-[1.05]' : 'bg-s1/30 border-white/5 text-[#4A5370]'
                     }`}
                   >
                     {["😵", "😞", "😐", "🙂", "😴"][q-1]}
                   </button>
                 ))}
              </div>
              <p className="text-center text-[10px] font-bold text-g/60 uppercase tracking-widest leading-none mt-1">{getQualityLabel(quality)}</p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#4A5370] tracking-[2px] uppercase ml-1">Personal Notes</label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 text-[#4A5370]" size={14} />
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Atmosphere, internal state, reflections..."
                  className="w-full bg-s1/30 border border-white/5 rounded-xl pl-10 pr-4 py-3 font-body text-[14px] text-white outline-none focus:border-g/30 transition-all resize-none h-24 italic"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={submitting}
              className="btn-gold w-full flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {submitting ? 'Recording...' : 'Record Sanctuary Night'}
              {!submitting && <Sparkles size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> }
            </button>
          </form>
        </motion.div>
      </div>

      {/* RIGHT: HISTORY + CHARTS */}
      <div className="flex-grow space-y-8">
        {/* STATS SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { label: 'Avg Rest', val: stats?.avgDuration || '0.0', unit: 'HRS', icon: Clock },
             { label: 'Peak Night', val: stats?.bestNight || '0.0', unit: 'HRS', icon: Activity },
             { label: 'Consistency', val: stats?.streak || '0', unit: 'DAYS', icon: Sparkles },
             { label: 'Total Logs', val: stats?.totalLogs || '0', unit: 'ENTRIES', icon: FileText }
           ].map((s, i) => (
             <div key={i} className="glass p-5 flex flex-col items-center text-center border-white/5">
                <div className="w-8 h-8 rounded-lg bg-g/5 flex items-center justify-center text-g mb-3">
                   <s.icon size={16} />
                </div>
                <div className="font-heading text-3xl font-bold text-white mb-1 leading-none">{s.val}</div>
                <div className="text-[9px] font-bold text-[#4A5370] tracking-[2px] uppercase">{s.label}</div>
             </div>
           ))}
        </div>

        {/* CHART SECTION */}
        <div className="glass p-8 md:p-10 border-white/5 h-[400px]">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-[11px] font-bold text-g uppercase tracking-[3px]">Sleep Architecture</h3>
              <span className="text-[10px] text-[#4A5370] uppercase tracking-widest italic">Last 14 Nights</span>
           </div>
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={logs.slice(0, 14).reverse()}>
               <defs>
                 <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3}/>
                   <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
               <XAxis 
                 dataKey="createdAt" 
                 axisLine={false} 
                 tickLine={false} 
                 tick={{ fill: '#4A5370', fontSize: 10, fontWeight: 'bold' }}
                 tickFormatter={(v) => new Date(v).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
               />
               <YAxis 
                 axisLine={false} 
                 tickLine={false} 
                 tick={{ fill: '#4A5370', fontSize: 10, fontWeight: 'bold' }}
               />
               <Tooltip 
                 contentStyle={{ backgroundColor: 'rgba(10, 13, 26, 0.95)', border: '1px solid rgba(201, 168, 76, 0.2)', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', padding: '12px' }}
                 itemStyle={{ color: '#C9A84C', fontWeight: 'bold', fontSize: '13px' }}
                 labelStyle={{ color: '#8892B0', fontSize: '11px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}
                 cursor={{ stroke: 'rgba(201, 168, 76, 0.1)', strokeWidth: 2 }}
               />
               <Area 
                  type="monotone" 
                  dataKey="sleepDuration" 
                  stroke="#C9A84C" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSleep)" 
                  animationDuration={2000}
               />
             </AreaChart>
           </ResponsiveContainer>
        </div>

        {/* LOG HISTORY */}
        <div className="space-y-4">
           <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[3px] ml-1">Past Sanctuary Records</h3>
           <div className="space-y-3">
              <AnimatePresence>
                {logs.map((log) => (
                  <motion.div 
                    key={log._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row items-center justify-between glass p-5 md:px-8 bg-white/5 border-white/5 group hover:border-g/20 transition-all border-l-[4px]"
                    style={{ borderLeftColor: getQualityColor(log.quality) }}
                  >
                    <div className="flex gap-4 md:gap-8 items-center w-full sm:w-auto mb-4 sm:mb-0">
                       <div className="w-12 h-12 rounded-2xl bg-s1 flex flex-col items-center justify-center shrink-0">
                         <span className="text-white font-bold text-[16px] leading-tight">{new Date(log.createdAt).getDate()}</span>
                         <span className="text-[8px] text-[#4A5370] font-bold uppercase tracking-widest">{new Date(log.createdAt).toLocaleDateString(undefined, { month: 'short' })}</span>
                       </div>
                       <div>
                          <div className="font-heading text-lg font-bold text-white leading-tight">
                            {new Date(log.createdAt).toLocaleDateString(undefined, { weekday: 'long' }).toUpperCase()}
                          </div>
                          <div className="font-body text-[10px] text-[#4A5370] font-bold uppercase tracking-widest mt-0.5">
                            {log.bedtime} — {log.wakeTime}
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-12 w-full sm:w-auto">
                       <div className="flex flex-col items-center">
                          <div className="font-heading text-3xl font-bold text-g leading-tight">{log.sleepDuration.toFixed(1)}</div>
                          <div className="text-[8px] text-[#4A5370] font-bold uppercase tracking-widest">Hours</div>
                       </div>
                       <div className="hidden xl:block">
                          <div className="font-body text-[13px] text-[#8892B0] text-right line-clamp-1 max-w-[200px] italic">
                            "{log.notes || "Peaceful night silently recorded."}"
                          </div>
                       </div>
                       <div className="text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">{["😵", "😞", "😐", "🙂", "😴"][log.quality-1]}</div>
                       <button 
                         onClick={() => handleDelete(log._id)} 
                         className="p-2.5 rounded-xl bg-red-500/5 text-red-500/20 hover:text-red-500 hover:bg-red-500/10 transition-all"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {logs.length === 0 && (
                <div className="text-center py-16 glass border-dashed border-white/5 opacity-40">
                   <p className="text-[11px] font-bold uppercase tracking-[4px]">No nights have been woven yet</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default SleepLog;
