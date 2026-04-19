import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createStory } from '../redux/slices/storySlice';
import api from '../api';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const PostStory = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('Numb');
  const [isTriggerWarning, setIsTriggerWarning] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [rooms, setRooms] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get('/rooms');
        setRooms(res.data);
      } catch (err) {
        console.error("Failed to fetch rooms");
      }
    };
    fetchRooms();
  }, []);

  const moods = [
    { label: 'HOPELESS', val: 'Hopeless', color: '#8b0000' },
    { label: 'ANGRY', val: 'Angry', color: '#92400e' },
    { label: 'NUMB', val: 'Numb', color: '#374151' },
    { label: 'SURVIVING', val: 'Surviving', color: '#166534' },
    { label: 'FIGHTING BACK', val: 'Fighting Back', color: '#c9a84c' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return toast.error("WORDS ARE NEEDED.");
    
    setIsSubmitting(true);
    const result = await dispatch(createStory({
      title,
      content,
      mood,
      isTriggerWarning,
      isAnonymous,
      roomId: roomId || undefined
    }));

    if (createStory.fulfilled.match(result)) {
      toast.success("RELEASED TO THE CIRCLE.");
      navigate('/stories');
    } else {
      toast.error("THE VOID REJECTED IT.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative z-10 pt-[72px]">
      <div className="max-w-[760px] mx-auto px-6 py-[60px]">
        {/* TOP ROW */}
        <motion.button 
          onClick={() => navigate(-1)}
          whileHover={{ x: -10 }}
          className="flex items-center gap-2 font-body text-[14px] text-white/60 mb-12 hover:text-fc-gold transition-colors tracking-widest uppercase"
        >
          <ArrowLeft size={16} /> BACK
        </motion.button>

        {/* TITLE SECTION */}
        <header className="mb-12">
          <h1 className="font-heading text-5xl md:text-[56px] text-white leading-none mb-2 tracking-tight">TELL YOUR STORY</h1>
          <p className="font-body text-[16px] text-fc-gold/80 tracking-widest uppercase">No judgment. No filters. Just truth.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* TITLE INPUT */}
          <div className="group">
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="GIVE IT A NAME"
              className="w-full bg-transparent border-none border-b border-white/30 py-4 font-heading text-[32px] text-white outline-none focus:border-fc-gold transition-all placeholder:text-white/20"
            />
          </div>

          {/* STORY TEXTAREA */}
          <div>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="START ANYWHERE. START WITH LAST NIGHT. START WITH THE WORST PART."
              className="w-full min-h-[280px] bg-black/40 border border-white/10 rounded-xl p-6 font-body text-[16px] leading-[1.9] text-white/90 outline-none focus:border-fc-gold/30 transition-all resize-none placeholder:text-white/20 placeholder:italic"
            />
            <div className="text-right font-body text-[12px] text-white/30 mt-2 uppercase tracking-widest">
              {content.length} / 2000 characters
            </div>
          </div>

          {/* MOOD ROW */}
          <div>
            <label className="font-heading text-[11px] text-fc-gold tracking-[0.3em] block mb-4 uppercase">HOW ARE YOU FEELING?</label>
            <div className="flex flex-wrap gap-2.5">
              {moods.map(m => (
                <button
                  key={m.val}
                  type="button"
                  onClick={() => setMood(m.val)}
                  style={{ 
                    backgroundColor: mood === m.val ? (m.val === 'FIGHTING BACK' ? '#c9a84c' : m.color) : 'transparent',
                    color: mood === m.val ? (m.val === 'FIGHTING BACK' ? 'black' : 'white') : 'rgba(255,255,255,0.7)',
                    borderColor: mood === m.val ? (m.val === 'FIGHTING BACK' ? '#c9a84c' : m.color) : 'rgba(255,255,255,0.15)'
                  }}
                  className={`px-[18px] py-2 rounded-full border font-body text-[13px] transition-all duration-200 uppercase tracking-widest hover:border-white/40`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* OPTIONS ROW */}
          <div className="flex flex-wrap gap-x-12 gap-y-6 items-center border-t border-white/5 pt-8">
            <div className="flex items-center gap-4">
              <label className="font-body text-[13px] text-white/70 uppercase tracking-widest cursor-pointer" onClick={() => setIsTriggerWarning(!isTriggerWarning)}>
                ⚠️ TRIGGER WARNING
              </label>
              <div 
                onClick={() => setIsTriggerWarning(!isTriggerWarning)}
                className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${isTriggerWarning ? 'bg-fc-gold' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${isTriggerWarning ? 'translate-x-[20px]' : 'translate-x-[4px]'}`} />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="font-body text-[13px] text-white/70 uppercase tracking-widest cursor-pointer" onClick={() => setIsAnonymous(!isAnonymous)}>
                👤 ANONYMOUS
              </label>
              <div 
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${isAnonymous ? 'bg-fc-gold' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${isAnonymous ? 'translate-x-[20px]' : 'translate-x-[4px]'}`} />
              </div>
            </div>
          </div>

          {/* ROOM SELECT */}
          <div className="space-y-4 pt-4">
            <label className="font-body text-[11px] text-fc-gold tracking-[0.3em] uppercase block">CHOOSE YOUR CIRCLE</label>
            <select 
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full bg-black/60 border border-fc-gold/20 rounded-lg px-4 py-3 font-body text-[14px] text-white outline-none focus:border-fc-gold transition-all appearance-none cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23c9a84c\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2rem' }}
            >
              <option value="" className="bg-fc-grey">GLOBAL FEED</option>
              {rooms.map(r => (
                <option key={r._id} value={r._id} className="bg-fc-grey">{r.name.toUpperCase()}</option>
              ))}
            </select>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-12">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-gradient-to-br from-fc-red to-fc-gold rounded-lg font-heading text-[20px] text-white tracking-[0.2em] shadow-lg hover:shadow-fc-gold/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <span className="relative z-10">{isSubmitting ? 'RELEASING...' : 'RELEASE IT'}</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostStory;
