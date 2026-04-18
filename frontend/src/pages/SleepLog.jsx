import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import api from '../api';
import { toast } from 'react-hot-toast';

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
      toast.error("COULD NOT RETRIEVE SLEEP DATA.");
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
      toast.success("NIGHT RECORDED.");
      fetchData();
      setNotes('');
    } catch (err) {
      toast.error("COULD NOT RECORD NIGHT.");
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

  const getQualityLabel = (q) => ["😵 TERRIBLE", "😞 POOR", "😐 OK", "🙂 GOOD", "😴 GREAT"][q-1];
  const getQualityColor = (q) => ["#8b0000", "#92400e", "#4b5563", "#166534", "#c9a84c"][q-1];

  return (
    <div className="min-h-screen relative z-10 pt-[72px] pb-20 px-6 max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12">
      {/* LEFT: LOG FORM */}
      <div className="w-full lg:w-[420px]">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-[#050008]/80 backdrop-blur-xl border border-fc-gold/20 p-10 rounded-3xl sticky top-24"
        >
          <h2 className="font-heading text-4xl text-fc-gold tracking-tight mb-2">LOG LAST NIGHT</h2>
          <p className="font-body text-white/40 text-xs tracking-widest uppercase mb-10">Track it or keep pretending it's fine.</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="font-heading text-[10px] text-fc-gold tracking-[0.2em]">LIGHTS OUT</label>
                <input 
                  type="time" 
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                  className="w-full bg-black/40 border-b border-fc-gold/30 px-4 py-3 font-heading text-xl text-white outline-none focus:border-fc-gold transition-colors"
                />
              </div>
              <div className="space-y-3">
                <label className="font-heading text-[10px] text-fc-gold tracking-[0.2em]">PULLED BACK</label>
                <input 
                  type="time" 
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full bg-black/40 border-b border-fc-gold/30 px-4 py-3 font-heading text-xl text-white outline-none focus:border-fc-gold transition-colors"
                />
              </div>
            </div>

            <div className="py-4 text-center bg-fc-gold/5 border border-dashed border-fc-gold/20">
               <span className="font-heading text-3xl text-fc-gold">
                 {calculateDuration().toFixed(1)} <span className="text-sm">HRS SLEEP</span>
               </span>
            </div>

            <div className="space-y-4">
              <label className="font-heading text-[10px] text-fc-gold tracking-[0.2em]">HOW WAS THE QUALITY?</label>
              <div className="grid grid-cols-5 gap-2">
                 {[1,2,3,4,5].map(q => (
                   <button
                     key={q}
                     type="button"
                     onClick={() => setQuality(q)}
                     className={`h-12 flex items-center justify-center text-lg border transition-all ${
                       quality === q ? 'bg-fc-gold scale-110 border-fc-gold' : 'bg-white/5 border-white/10'
                     }`}
                     title={getQualityLabel(q)}
                   >
                     {["😵", "😞", "😐", "🙂", "😴"][q-1]}
                   </button>
                 ))}
              </div>
              <div className="text-center font-body text-[10px] text-white/40 italic">{getQualityLabel(quality)}</div>
            </div>

            <div className="space-y-4">
              <label className="font-heading text-[10px] text-fc-gold tracking-[0.2em]">ANYTHING ELSE?</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="NIGHTMARES, WOKE UP AT 3AM, STRESS..."
                className="w-full bg-transparent border-b border-white/10 py-2 font-body text-sm text-white outline-none focus:border-fc-gold transition-colors resize-none h-20"
              />
            </div>

            <button 
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-[#8b0000] to-[#c9a84c] py-5 font-heading text-xl text-black tracking-widest hover:brightness-110 transition-all disabled:opacity-50"
            >
              {submitting ? 'RECORDING...' : 'RECORD THIS NIGHT'}
            </button>
          </form>
        </motion.div>
      </div>

      {/* RIGHT: HISTORY + CHARTS */}
      <div className="flex-1 space-y-12">
        {/* STATS SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { label: 'AVG SLEEP', val: stats?.avgDuration || '0.0', unit: 'HRS' },
             { label: 'BEST NIGHT', val: stats?.bestNight || '0.0', unit: 'HRS' },
             { label: 'STREAK', val: stats?.streak || '0', unit: 'DAYS' },
             { label: 'TOTAL NIGHTS', val: stats?.totalLogs || '0', unit: 'LOGS' }
           ].map((s, i) => (
             <div key={i} className="bg-black/40 border border-fc-gold/10 p-6 rounded-2xl">
                <div className="font-heading text-4xl text-fc-gold mb-1">{s.val}</div>
                <div className="font-body text-[10px] text-white/30 tracking-widest uppercase">{s.label}</div>
             </div>
           ))}
        </div>

        {/* CHART SECTION */}
        <div className="bg-black/40 border border-white/5 p-8 rounded-3xl h-[400px]">
           <h3 className="font-heading text-xs text-fc-gold tracking-[0.2em] mb-8">SLEEP HISTORY (LAST 14 NIGHTS)</h3>
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={logs.slice(0, 14).reverse()}>
               <defs>
                 <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#8b0000" stopOpacity={0.8}/>
                   <stop offset="95%" stopColor="#8b0000" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
               <XAxis 
                 dataKey="createdAt" 
                 axisLine={false} 
                 tickLine={false} 
                 tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'Special Elite' }}
                 tickFormatter={(v) => new Date(v).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
               />
               <YAxis 
                 axisLine={false} 
                 tickLine={false} 
                 tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'Special Elite' }}
               />
               <Tooltip 
                 contentStyle={{ backgroundColor: '#050008', border: '1px solid #c9a84c', borderRadius: '12px' }}
                 itemStyle={{ color: '#c9a84c', fontFamily: 'Special Elite' }}
               />
               <Area type="monotone" dataKey="sleepDuration" stroke="#c9a84c" fillOpacity={1} fill="url(#colorSleep)" />
             </AreaChart>
           </ResponsiveContainer>
        </div>

        {/* LOG HISTORY */}
        <div className="space-y-4">
           <h3 className="font-heading text-xs text-white/40 tracking-[0.2em] uppercase">PAST NIGHTS</h3>
           <div className="space-y-3">
              <AnimatePresence>
                {logs.map((log) => (
                  <motion.div 
                    key={log._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between bg-black/20 border border-white/5 p-5 pr-8 rounded-2xl group hover:border-white/20 transition-all border-l-[4px]"
                    style={{ borderLeftColor: getQualityColor(log.quality) }}
                  >
                    <div className="flex gap-8 items-center">
                       <div>
                          <div className="font-heading text-lg text-white">
                            {new Date(log.createdAt).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()}
                          </div>
                          <div className="font-body text-[10px] text-white/40 tracking-widest uppercase">
                            {log.bedtime} → {log.wakeTime}
                          </div>
                       </div>
                       <div className="text-center">
                          <div className="font-heading text-3xl text-fc-gold leading-none">{log.sleepDuration.toFixed(1)}</div>
                          <div className="font-body text-[10px] text-white/30 uppercase tracking-tighter">HRS</div>
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-12">
                       <div className="hidden md:block">
                          <div className="font-body text-xs text-white/60 text-right line-clamp-1 max-w-[200px] italic">
                            {log.notes || "No notes recording."}
                          </div>
                       </div>
                       <div className="text-2xl">{["😵", "😞", "😐", "🙂", "😴"][log.quality-1]}</div>
                       <button onClick={() => handleDelete(log._id)} className="opacity-0 group-hover:opacity-40 hover:!opacity-100 text-fc-red transition-all">🗑</button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SleepLog;
