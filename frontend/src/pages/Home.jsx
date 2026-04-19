import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  ArrowRight, Sparkles, MessageCircle, Heart, Moon, Users, Shield, 
  CheckCircle2, AlertTriangle, Users2, CloudRain, Flame, Handshake 
} from 'lucide-react';
import api from '../api';
import toast from 'react-hot-toast';

const Home = () => {
    const navigate = useNavigate();
    const { token, user } = useSelector(state => state.auth || { token: null, user: null });
    const [recentStories, setRecentStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const res = await api.get('/stories');
                setRecentStories(res.data.slice(0, 3));
            } catch (err) {
                console.error("Home feed fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecent();
    }, []);

    const navTo = (pg) => navigate('/' + pg);

    const copyCrisisNum = () => {
      navigator.clipboard.writeText('9152987821');
      toast.success("Number copied to clipboard. We are here.");
    };

    // Section 6: Mocked Meetups
    const MOCK_MEETUPS = [
        { 
            id: 1, 
            title: 'Sunday Anxiety Support Circle', 
            cat: 'Anxiety Support', 
            area: 'Hyderabad', 
            when: 'Weekly Sunday', 
            time: '6pm', 
            spots: 4, 
            outcomes: ['↓ Depression', '↑ Confidence', '↓ Social anxiety'], 
            host: 'Anika K.' 
        },
        { 
            id: 2, 
            title: 'Late Night Depression Talk', 
            cat: 'Depression Talk', 
            area: 'Online', 
            when: 'Weekly Tuesday', 
            time: '10pm', 
            spots: 8, 
            outcomes: ['↓ Depression', '↑ Confidence'], 
            host: 'Priya R.' 
        },
        { 
            id: 3, 
            title: 'Work Stress Survivors', 
            cat: 'Stress Relief', 
            area: 'Bangalore', 
            when: 'Weekly Friday', 
            time: '7:30pm', 
            spots: 2, 
            outcomes: ['↓ Social anxiety', '↑ Confidence', '↓ Depression'], 
            host: 'Rohan V.' 
        },
        { 
            id: 4, 
            title: 'Sleep & Calm Circle', 
            cat: 'Sleep Hygiene', 
            area: 'Chennai', 
            when: 'Weekly Saturday', 
            time: '8pm', 
            spots: 6, 
            outcomes: ['↓ Depression', '↓ Social anxiety'], 
            host: 'Jaya S.' 
        },
        { 
            id: 5, 
            title: 'Grief Without Filters', 
            cat: 'Grief Support', 
            area: 'Mumbai', 
            when: 'Weekly Monday', 
            time: '5pm', 
            spots: 1, 
            outcomes: ['↓ Depression', '↑ Confidence'], 
            host: 'Meena D.' 
        }
    ];

    const handleJoinRequest = (id) => {
        const key = `join_request_${id}`;
        localStorage.setItem(key, 'pending');
        toast.success("Request sent! Host will approve you soon.");
        // Force refresh state for mocked behavior if needed
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <div className="flex flex-col">
            
            {/* SECTION 2 — HERO (Full Viewport Height) */}
            <section className="min-h-screen flex items-center justify-center text-center p-6 md:p-12 relative overflow-hidden">
                <div className="max-w-[1000px] relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-g/10 border border-g/20 rounded-full px-5 py-2 text-[10px] font-black tracking-[3px] uppercase text-g mb-12 shadow-[0_0_20px_rgba(201,168,76,0.1)]"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-g animate-pulse shadow-[0_0_8px_#C9A84C]" />
                        NO ONE FIGHTS ALONE
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="font-heading text-6xl md:text-[clamp(48px,10vw,96px)] font-bold leading-[0.9] tracking-[-2px] mb-10 text-white"
                    >
                        Real meetups for <br />
                        <span className="text-g italic drop-shadow-[0_0_30px_rgba(201,168,76,0.2)] block">real healing.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-[20px] text-muted leading-relaxed max-w-[680px] mx-auto mb-14 font-body"
                    >
                        Depression, anxiety and insomnia thrive in isolation. <b className="text-white">In-person circles</b> change that. Show up. Be heard. Feel less alone.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-4 justify-center mb-16"
                    >
                        {['Reduces depression', 'Builds confidence', 'Reduces social anxiety', 'Free always'].map(item => (
                            <div key={item} className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] text-[10px] font-black uppercase tracking-[1.5px] text-muted">
                                <CheckCircle2 size={12} className="text-g" /> {item}
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-5 justify-center mb-20 px-4"
                    >
                        <button onClick={() => navTo('groups')} className="btn-gold !px-12 !py-5 flex items-center gap-3 shadow-[0_20px_40px_rgba(201,168,76,0.25)] group w-full sm:w-auto">
                            Find a Meetup Near Me <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button onClick={() => navTo('groups/create')} className="btn-outline !px-12 !py-5 w-full sm:w-auto">
                            Host a Group
                        </button>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-16 border-t border-white/5 mt-20 max-w-2xl mx-auto">
                        <div className="stat-item flex flex-col items-center sm:items-start">
                            <h3 className="font-heading text-4xl font-bold text-white mb-1">280M</h3>
                            <p className="text-[10px] font-black uppercase tracking-[1px] text-muted">People with depression worldwide</p>
                        </div>
                        <div className="stat-item flex flex-col items-center sm:items-start border-y sm:border-y-0 sm:border-x border-white/5 py-6 sm:py-0 sm:px-10">
                            <h3 className="font-heading text-4xl font-bold text-white mb-1">1 in 5</h3>
                            <p className="text-[10px] font-black uppercase tracking-[1px] text-muted">Adults experience insomnia yearly</p>
                        </div>
                        <div className="stat-item flex flex-col items-center sm:items-start text-g">
                            <h3 className="font-heading text-4xl font-bold mb-1">Free</h3>
                            <p className="text-[10px] font-black uppercase tracking-[1px] opacity-80">Always — no paywall ever</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3 — CRISIS STATS BAND (Fight Club Style) */}
            <section className="bg-ink/90 border-t border-white/5 py-32 relative overflow-hidden">
                <div className="max-w-[1240px] mx-auto px-6">
                    <motion.span 
                        initial={{ opacity: 0 }} 
                        whileInView={{ opacity: 1 }}
                        className="text-red-500 font-black tracking-[4px] text-[12px] uppercase mb-6 block"
                    >
                        ⚠ THE REALITY WE ARE FIGHTING
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="font-heading text-5xl md:text-7xl font-bold text-white mb-8 leading-tight italic"
                    >
                        Depression is not talked about enough. <br />
                        <span className="text-white/80">The numbers prove it.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[18px] text-muted max-w-[800px] mb-20 leading-relaxed italic"
                    >
                        "These are not statistics. These are people — sleeping next to you, sitting across from you, looking fine from the outside. This is why real meetups exist."
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { n: '800K', t: 'People die by suicide every year globally — the majority linked to untreated depression', src: 'Source: WHO Global Health Estimates, 2023', color: 'rgba(255,107,107,0.8)', arrow: '↑' },
                            { n: '75%', t: 'Of people with depression in lower-income countries receive no treatment at all', src: 'Source: WHO Mental Health Atlas, 2023', color: 'rgba(245,158,11,0.8)', arrow: '↑' },
                            { n: '1 in 3', t: 'Indians will experience a mental health condition in their lifetime — depression being most common', src: 'Source: NIMHANS National Mental Health Survey, 2022', color: 'rgba(201,168,76,0.8)', arrow: '↑' },
                            { n: '40%', t: 'Reduction in depressive symptoms reported by people who join peer support groups consistently', src: 'Source: Journal of Affective Disorders, Meta-analysis 2021', color: 'rgba(59,130,246,0.8)', arrow: '↓' }
                        ].map((s, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-10 border-t-[3px] flex flex-col justify-between" 
                                style={{ borderTopColor: s.color, background: 'rgba(10,13,26,0.8)', borderColor: 'rgba(255,70,70,0.1)' }}
                            >
                                <div>
                                    <span className="text-2xl block mb-2 font-bold" style={{ color: s.color }}>{s.arrow}</span>
                                    <div className="font-heading text-5xl font-bold mb-6" style={{ color: s.color }}>{s.n}</div>
                                    <p className="text-[15px] leading-relaxed text-white/80 mb-8">{s.t}</p>
                                </div>
                                <span className="text-[9px] font-bold text-muted uppercase tracking-[1px]">{s.src}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-20 glass p-10 flex flex-col lg:flex-row items-center justify-between gap-10 bg-gradient-to-r from-g/10 to-transparent border-g/30"
                    >
                        <div className="flex items-center gap-8">
                            <span className="text-4xl">🤝</span>
                            <p className="text-[20px] font-heading font-bold text-white italic">Our answer to these numbers: real human connection, in real rooms, every week.</p>
                        </div>
                        <button onClick={() => navTo('groups')} className="btn-gold !px-12 !py-4 whitespace-nowrap shadow-[0_15px_30px_rgba(201,168,76,0.2)]">Find a Meetup →</button>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 4 — WHY MEETUPS (3-Column Cards) */}
            <section className="py-32 max-w-[1240px] mx-auto px-6">
                <span className="text-g font-black tracking-[4px] text-[11px] uppercase mb-6 block">WHY IN-PERSON MEETUPS</span>
                <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-8 leading-tight italic">Meetups exist to do <br /><span className="text-white/80">three things.</span></h2>
                <p className="text-[18px] text-muted max-w-[700px] mb-20 leading-relaxed italic">Every group, every session, every circle is designed around these three outcomes. We measure ourselves against them.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <CloudRain className="text-g" size={48} />, title: 'Defeat Depression', body: 'Isolation is the fuel that depression runs on. When you sit with others who are going through the same thing — and no one flinches — depression loses its grip. Research shows peer support reduces depressive symptoms by up to 40%.', tag: 'Clinically validated' },
                        { icon: <Flame className="text-g" size={48} />, title: 'Build Real Confidence', body: 'Being heard without judgment is one of the most powerful confidence-building experiences available. Our groups are structured so every voice is equal, every story matters, and no one performs for approval.', tag: 'Every session, every week' },
                        { icon: <Handshake className="text-g" size={48} />, title: 'Reduce Social Anxiety', body: 'Social anxiety shrinks the world. Our groups are small (6–15 people), structured and safe — giving you repeated, low-stakes exposure to being with people. Over weeks, the anxiety that once stopped you.', tag: 'Exposure therapy in action' }
                    ].map((card, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -10, borderColor: 'rgba(201,168,76,0.4)' }}
                            className="glass p-12 border-white/5 bg-ink/40 group transition-all h-full flex flex-col"
                        >
                            <div className="mb-8 opacity-60 group-hover:opacity-100 transition-opacity">{card.icon}</div>
                            <h3 className="font-heading text-3xl font-bold mb-6 text-white italic">{card.title}</h3>
                            <p className="text-muted text-[16px] leading-[1.8] mb-12 flex-grow">{card.body}</p>
                            <span className="text-[10px] font-black uppercase tracking-[2px] text-g border border-g/20 px-4 py-2 rounded self-start">{card.tag}</span>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 mt-20">
                    {[
                        { t: 'Reduces depressive symptoms', c: '#3DD68C' },
                        { t: 'Increases social confidence', c: '#3B82F6' },
                        { t: 'Reduces isolation & loneliness', c: '#C9A84C' },
                        { t: 'Improves sleep quality', c: '#3DD68C' },
                        { t: 'Builds trusted friendships', c: '#3B82F6' },
                        { t: 'Reduces social anxiety', c: '#C9A84C' }
                    ].map((pill, i) => (
                        <div key={i} className="flex items-center gap-3 px-6 py-3 glass !rounded-full border-white/5 bg-white/[0.02] text-[11px] font-bold uppercase tracking-[1.5px] text-muted">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pill.c }} />
                            {pill.t}
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 5 & 6 — PRE-LOGIN & MEETUPS GRID */}
            <section className="py-32 bg-ink/50 border-t border-white/5 relative">
                <div className="max-w-[1340px] mx-auto px-6">
                    
                    {/* SECTION 5: Pre-Login Block */}
                    {!token ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="glass p-20 text-center relative overflow-hidden mb-32 group"
                            style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 100%)' }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center font-heading text-[15vw] font-black text-white/[0.012] pointer-events-none select-none uppercase italic opacity-20 group-hover:scale-105 transition-transform duration-[10s]">
                                No One Fights Alone
                            </div>
                            <div className="relative z-10">
                                <h2 className="font-heading text-6xl md:text-8xl font-bold text-white mb-10 leading-tight">Create a free account to <br /><span className="text-g italic">find your circle.</span></h2>
                                <p className="text-[20px] text-muted italic max-w-[640px] mx-auto mb-14 leading-relaxed">See every meetup in your city. Request to join. Or host your own group in 5 minutes. Everything is free — always.</p>
                                <div className="flex flex-wrap gap-6 justify-center mb-16">
                                    <button onClick={() => navTo('register')} className="btn-gold !px-14 !py-5 shadow-[0_20px_40px_rgba(201,168,76,0.3)]">Create Free Account →</button>
                                    <button onClick={() => navTo('login')} className="btn-outline !px-14 !py-5">I Already Have an Account</button>
                                </div>
                                <p className="text-[11px] font-bold uppercase tracking-[4px] text-muted opacity-60">No credit card. No subscription. No ads. Ever.</p>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="mb-20 text-center">
                            <h2 className="font-heading text-5xl font-bold text-white mb-4 italic">Welcome back, <span className="text-g">{user?.username || 'Seeker'}</span></h2>
                            <p className="text-muted tracking-[2px] uppercase text-[12px] font-bold">The circle is waiting for you.</p>
                        </div>
                    )}

                    {/* SECTION 6: Meetup Cards Grid */}
                    <span className="text-g font-black tracking-[4px] text-[11px] uppercase mb-6 block">REAL MEETUPS · REAL CITIES</span>
                    <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-8 leading-tight italic">Find your circle</h2>
                    <p className="text-[18px] text-muted italic max-w-[800px] mb-20 leading-relaxed">Every group below is hosted by a real person who went through something real and decided to create the space they wished existed.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_MEETUPS.map((m, i) => {
                            const isPending = localStorage.getItem(`join_request_${m.id}`) === 'pending';
                            return (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass group hover:border-g/40 transition-all relative overflow-hidden flex flex-col h-full"
                                >
                                    <div className="absolute top-0 left-0 w-full h-[3px] bg-g transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                                    
                                    <div className="p-10 flex flex-col h-full">
                                        <div className="flex justify-between items-center mb-10">
                                            <span className="text-[10px] font-black tracking-widest text-g uppercase border border-g/20 px-4 py-1.5 rounded bg-g/5">{m.cat}</span>
                                            <span className={`text-[10px] font-black tracking-widest uppercase ${m.spots < 3 ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
                                                {m.spots === 1 ? 'Last Spot Left' : `${m.spots} Spots Left`}
                                            </span>
                                        </div>

                                        <h3 className="font-heading text-3xl font-bold text-white mb-6 leading-tight italic">{m.title}</h3>

                                        <div className="flex flex-wrap gap-2 mb-10">
                                            {m.outcomes.map(o => (
                                                <span key={o} className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm bg-white/[0.04] ${o.includes('Depression') ? 'text-blue-400' : o.includes('Confidence') ? 'text-green-400' : 'text-g'}`}>
                                                    {o}
                                                </span>
                                            ))}
                                        </div>

                                        <p className="text-muted text-[15px] italic leading-relaxed mb-10 line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity">A safe space for real healing. Hosted by the community, for the community. No one fights alone.</p>

                                        <div className="mt-auto">
                                            <div className="flex items-center gap-4 py-8 border-y border-white/5 mb-10">
                                                <div className="w-10 h-10 rounded-xl bg-ink/80 border border-g/10 flex items-center justify-center text-g font-bold text-[14px] font-heading">
                                                    {m.host.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span className="text-[12px] font-black tracking-[1px] text-muted italic">Hosted by {m.host}</span>
                                            </div>

                                            <div className="flex flex-col gap-3 text-[11px] font-black text-muted/60 uppercase tracking-[1.5px] mb-12">
                                                <div className="flex items-center gap-2">📍 <span className="text-white/70">{m.area}</span></div>
                                                <div className="flex items-center gap-2">📅 <span className="text-white/70">{m.when} · {m.time}</span></div>
                                            </div>

                                            <div className="flex items-center justify-between gap-4 mt-auto">
                                                <div className="flex -space-x-4">
                                                    {[1, 2, 3].map(j => (
                                                        <div key={j} className="w-9 h-9 rounded-full border-2 border-ink bg-surface flex items-center justify-center text-[9px] font-bold text-g/40 uppercase">A{j}</div>
                                                    ))}
                                                    <div className="w-9 h-9 rounded-full border-2 border-ink bg-surface flex items-center justify-center text-[9px] font-bold text-g ring-2 ring-g/10">+12</div>
                                                </div>
                                                <button 
                                                    disabled={isPending}
                                                    onClick={(e) => { e.stopPropagation(); handleJoinRequest(m.id); }}
                                                    className={`btn-${isPending ? 'outline opacity-50' : 'gold'} !px-8 !py-3 !text-[10px] shadow-lg shadow-g/5`}
                                                >
                                                    {isPending ? 'Pending…' : 'Request to Join'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                        
                        {/* Host a Group Card */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ borderColor: 'rgba(201,168,76,0.6)', background: 'rgba(201,168,76,0.02)' }}
                            onClick={() => navTo('groups/create')}
                            className="glass border-dashed border-g/30 h-full flex items-center justify-center p-20 text-center transition-all group cursor-pointer"
                        >
                            <div>
                                <div className="w-20 h-20 rounded-full border-2 border-dashed border-g/40 flex items-center justify-center text-g mb-8 mx-auto group-hover:scale-110 transition-transform">
                                    <Users2 size={32} />
                                </div>
                                <h3 className="font-heading text-4xl font-bold text-g mb-6 italic">+ Host a Group</h3>
                                <p className="text-muted text-[15px] mb-12 italic opacity-60">Create the space you wish existed. Change lives.</p>
                                <button className="btn-outline !px-12 !py-4 !text-[11px] group-hover:border-g group-hover:text-g transition-all">START HOSTING</button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 7 — HOST A GROUP CTA BLOCK */}
            <section className="py-32 max-w-[1340px] mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="glass p-20 flex flex-col lg:flex-row items-center justify-between gap-16 bg-gradient-to-br from-g/5 via-transparent to-ink/40 border-g/10"
                >
                    <div className="max-w-[520px]">
                        <h2 className="font-heading text-6xl md:text-7xl font-bold text-white mb-8 italic">Host your own group. <br /><span className="text-g">Change someone's life.</span></h2>
                        <p className="text-[19px] text-muted italic leading-relaxed opacity-80">"You don't need to be a therapist. You need to have been through something — and be willing to hold space for others too."</p>
                    </div>
                    <div className="flex-1 flex flex-col gap-14 w-full lg:w-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                            {[
                                { n: '01', t: 'Name & Purpose', d: 'Give your group a clear reason to exist.' },
                                { n: '02', t: 'Set Location & Time', d: 'Choose a real room or a recurring slot.' },
                                { n: '03', t: 'Approve Members', d: 'You control who sits in your circle.' }
                            ].map((step, i) => (
                                <div key={i} className="group">
                                    <div className="font-heading text-4xl text-g/20 mb-3 group-hover:text-g transition-colors duration-500 font-bold tracking-tighter">{step.n}</div>
                                    <div className="text-[12px] font-black uppercase tracking-[2px] text-white mb-2">{step.t}</div>
                                    <p className="text-[14px] text-muted italic opacity-60 leading-relaxed">{step.d}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            <button onClick={() => navTo('groups/create')} className="btn-gold !px-16 !py-6 text-[13px] shadow-[0_20px_50px_rgba(201,168,76,0.2)] hover:shadow-g/40">Host a Group — It's Free →</button>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* SECTION 8 — TESTIMONIALS (Fight Club Style) */}
            <section className="py-32 max-w-[1240px] mx-auto px-6">
                <span className="text-g font-black tracking-[4px] text-[11px] uppercase mb-6 block">REAL STORIES</span>
                <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-20 leading-tight italic">What happens when <br /><span className="text-white/80 whitespace-nowrap">you show up.</span></h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { b: '↓ Depression lifted', bc: '#3DD68C', tc: 'AK', name: 'Anika K.', group: 'Sunday Anxiety Circle, Hyderabad', quote: "The first night I didn't say a single word. I just listened. And that was enough. Within 3 weeks I was talking. Within 2 months I was sleeping again." },
                        { b: '↑ Confidence rebuilt', bc: '#3B82F6', tc: 'RV', name: 'Rohan V.', group: 'Work Stress Survivors, Bangalore', quote: "I used to cancel every social event I signed up for. After 6 weeks of the group I started showing up to things I hadn't in years. It wasn't therapy. It was just people." },
                        { b: '↓ Social anxiety reduced', bc: '#C9A84C', tc: 'PR', name: 'Priya R.', group: 'Late Night Depression Talk, Online', quote: "I was terrified to walk in. My hands were shaking. Nobody made me feel weird about it. They just moved over and made room. That changed something in me permanently." }
                    ].map((test, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-12 flex flex-col justify-between group h-full hover:border-g/30 transition-all"
                        >
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded mb-12 inline-block shadow-sm" style={{ backgroundColor: `${test.bc}10`, color: test.bc, border: `1px solid ${test.bc}20` }}>{test.b}</span>
                                <p className="font-body text-[20px] italic text-white leading-relaxed mb-12 pl-10 border-l-[3px] border-g/20 group-hover:border-g/50 transition-all opacity-90 italic">"{test.quote}"</p>
                            </div>
                            <div className="flex items-center gap-5 pt-12 border-t border-white/5">
                                <div className="w-12 h-12 rounded-2xl bg-ink/80 border border-g/10 flex items-center justify-center text-g font-heading text-xl font-bold group-hover:bg-g group-hover:text-black transition-all">
                                    {test.tc}
                                </div>
                                <div>
                                    <span className="text-[14px] font-bold text-white block mb-0.5">{test.name}</span>
                                    <span className="text-[10px] font-black uppercase tracking-[1px] text-muted italic opacity-60">{test.group}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* Note: All names above are fictional for wellness context. */}
            </section>

            {/* SECTION 9 — CRISIS HELPLINE FOOTER BAND (Sticky/Always Visible on Home Page Bottom) */}
            <div className="w-full bg-[#C9A84C]/[0.05] border-t border-[#C9A84C]/15 py-12 px-10 relative overflow-hidden mt-20">
                <div className="absolute -left-40 -top-40 w-96 h-96 bg-g/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-[1340px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                    <div className="flex items-center gap-10">
                        <div className="w-20 h-20 rounded-3xl bg-g/10 flex items-center justify-center text-g shadow-[0_0_30px_rgba(201,168,76,0.15)] animate-pulse">
                            <Handshake size={44} />
                        </div>
                        <div>
                            <p className="text-[11px] font-black tracking-[4px] text-g uppercase mb-3">If you are in crisis right now:</p>
                            <p className="text-2xl font-heading font-bold italic text-white max-w-md">We are here. Reach out to our vetted emergency partners immediately.</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-12 justify-center lg:justify-end items-center">
                        <div className="text-center lg:text-right">
                            <p className="text-[9px] font-black text-muted uppercase tracking-widest mb-1.5 opacity-60">iCall (India) · MON–SAT 8AM–10PM</p>
                            <p className="text-3xl font-heading font-bold text-white tracking-widest select-all">9152987821</p>
                        </div>
                        <div className="text-center lg:text-right">
                            <p className="text-[9px] font-black text-muted uppercase tracking-widest mb-1.5 opacity-60">Vandrevala Foundation · 24/7</p>
                            <p className="text-3xl font-heading font-bold text-white tracking-widest select-all">1860-2662-345</p>
                        </div>
                        <button 
                            onClick={copyCrisisNum} 
                            className="btn-gold !px-14 !py-5 shadow-[0_20px_50px_rgba(201,168,76,0.3)] hover:scale-105 active:scale-95 transition-transform"
                        >
                            GET HELP NOW
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="h-20" /> {/* Spacer for footer overlap */}
        </div>
    );
};

export default Home;
