
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGroup } from '../../utils/groups';

const CreateGroup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    location: '',
    date: '',
    time: '',
    maxMembers: 10,
    tags: '',
    isPublic: true
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Group Name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    else if (formData.description.length < 20) newErrors.description = 'Min 20 characters';
    else if (formData.description.length > 300) newErrors.description = 'Max 300 characters';
    
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (formData.maxMembers < 3 || formData.maxMembers > 50) newErrors.maxMembers = 'Must be 3-50 members';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const groupData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      };
      createGroup(groupData);
      navigate('/groups');
    }
  };

  const categories = ['Anxiety', 'Depression', 'Stress', 'Sleep', 'Grief', 'General'];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-[#1C1C1C] border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          Host a <span className="text-[#C9A84C]">New Group</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-[#9A9A9A] uppercase mb-2">Group Name</label>
            <input 
              type="text"
              placeholder="e.g. Midnight Solitude Support"
              className={`w-full bg-[#0D0D0D] border ${errors.title ? 'border-red-500' : 'border-[#2a2a2a]'} text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition-all`}
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
            {errors.title && <p className="text-[#C9A84C] text-xs mt-1 border-l-2 border-[#C9A84C] pl-2">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-[#9A9A9A] uppercase mb-2">What it's about</label>
            <textarea 
              rows="4"
              placeholder="Introduce your group... (20-300 characters)"
              className={`w-full bg-[#0D0D0D] border ${errors.description ? 'border-red-500' : 'border-[#2a2a2a]'} text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition-all resize-none`}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
            <div className="flex justify-between mt-1">
              {errors.description ? (
                <p className="text-[#C9A84C] text-xs border-l-2 border-[#C9A84C] pl-2">{errors.description}</p>
              ) : <span></span>}
              <span className={`text-[10px] ${formData.description.length > 300 ? 'text-red-500' : 'text-[#9A9A9A]'}`}>
                {formData.description.length}/300
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-[#9A9A9A] uppercase mb-2">Category</label>
              <select 
                className="w-full bg-[#0D0D0D] border border-[#2a2a2a] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition-all"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-bold text-[#9A9A9A] uppercase mb-2">Location</label>
              <input 
                type="text"
                placeholder="City or 'Online'"
                className={`w-full bg-[#0D0D0D] border ${errors.location ? 'border-red-500' : 'border-[#2a2a2a]'} text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition-all`}
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
              {errors.location && <p className="text-[#C9A84C] text-xs mt-1 border-l-2 border-[#C9A84C] pl-2">{errors.location}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date */}
            <div>
              <label className="block text-sm font-bold text-[#9A9A9A] uppercase mb-2">Date</label>
              <input 
                type="date"
                className={`w-full bg-[#0D0D0D] border ${errors.date ? 'border-red-500' : 'border-[#2a2a2a]'} text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition-all`}
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
              {errors.date && <p className="text-[#C9A84C] text-xs mt-1 border-l-2 border-[#C9A84C] pl-2">{errors.date}</p>}
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-bold text-[#9A9A9A] uppercase mb-2">Time</label>
              <input 
                type="time"
                className={`w-full bg-[#0D0D0D] border ${errors.time ? 'border-red-500' : 'border-[#2a2a2a]'} text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition-all`}
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
              {errors.time && <p className="text-[#C9A84C] text-xs mt-1 border-l-2 border-[#C9A84C] pl-2">{errors.time}</p>}
            </div>

            {/* Max Members */}
            <div>
              <label className="block text-sm font-bold text-[#9A9A9A] uppercase mb-2">Max Members</label>
              <input 
                type="number"
                min="3"
                max="50"
                className={`w-full bg-[#0D0D0D] border ${errors.maxMembers ? 'border-red-500' : 'border-[#2a2a2a]'} text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition-all`}
                value={formData.maxMembers}
                onChange={(e) => setFormData({...formData, maxMembers: parseInt(e.target.value)})}
              />
              {errors.maxMembers && <p className="text-[#C9A84C] text-xs mt-1 border-l-2 border-[#C9A84C] pl-2">{errors.maxMembers}</p>}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-bold text-[#9A9A9A] uppercase mb-2">Tags (comma separated)</label>
            <input 
              type="text"
              placeholder="e.g. no judgment, beginners, safe space"
              className="w-full bg-[#0D0D0D] border border-[#2a2a2a] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition-all"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
            />
          </div>

          {/* Public Toggle */}
          <div className="flex items-center justify-between py-4 border-t border-[#2a2a2a]">
            <div>
              <h4 className="text-white font-bold">Public Group</h4>
              <p className="text-[11px] text-[#9A9A9A]">Anyone can see and request to join this group.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={formData.isPublic}
                onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
              />
              <div className="w-11 h-6 bg-[#2a2a2a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A84C]"></div>
            </label>
          </div>

          {/* Submit */}
          <button 
            type="submit"
            className="w-full bg-[#C9A84C] text-black font-black py-4 rounded-lg uppercase tracking-widest hover:bg-[#d4b96a] transition-all transform active:scale-[0.98]"
          >
            Post Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
