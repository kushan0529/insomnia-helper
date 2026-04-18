require('dotenv').config({ path: './backend/.env' });
const mongoose = require('mongoose');
const Room = require('../models/Room');

const rooms = [
  {
    name: "3AM INSOMNIACS",
    category: "Chronic Insomnia",
    description: "For those who haven't seen sunrise from the sleeping side in months.",
    isNightOwlRoom: true,
    emoji: "🌑",
    color: "#8b0000",
    tags: ["insomnia", "3am", "sleepless"]
  },
  {
    name: "ANXIETY AFTER DARK",
    category: "Anxiety Sleep",
    description: "When your brain won't stop. Racing thoughts. What-ifs at midnight.",
    isNightOwlRoom: false,
    emoji: "⚡",
    color: "#3b0a45",
    tags: ["anxiety", "racing-thoughts", "panic"]
  },
  {
    name: "SHIFT WORKERS UNITE",
    category: "Shift Worker",
    description: "Day shift, night shift, rotating hell. Your schedule destroyed your sleep.",
    isNightOwlRoom: false,
    emoji: "🔄",
    color: "#1a3a1a",
    tags: ["shift-work", "irregular-hours"]
  },
  {
    name: "SURVIVING TRAUMA",
    category: "Post-Trauma",
    description: "Nightmares. Flashbacks. Sleep that never feels safe. You're not alone.",
    isNightOwlRoom: false,
    emoji: "🩹",
    color: "#4a1a0a",
    tags: ["trauma", "ptsd", "nightmares"]
  },
  {
    name: "THE FIGHT BACK ROOM",
    category: "Recovery",
    description: "For those actively fighting. CBT-I, progress, small wins. Share them here.",
    isNightOwlRoom: false,
    emoji: "✊",
    color: "#1a2a0a",
    tags: ["recovery", "cbt-i", "progress"]
  },
  {
    name: "DEEP DEPRESSION WARD",
    category: "Depression",
    description: "Heavy. Numb. Can't explain it to anyone who hasn't felt it. We have.",
    isNightOwlRoom: false,
    emoji: "🌫️",
    color: "#0a0a2a",
    tags: ["depression", "hopeless", "numb"]
  }
];

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error("MONGO_URI not found in .env");
    
    await mongoose.connect(mongoUri);
    console.log('🌱 Connected to MongoDB for seeding...');
    
    await Room.deleteMany({});
    console.log('🗑️  Old rooms cleared.');
    
    await Room.insertMany(rooms);
    console.log('✅ Rooms seeded successfully!');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
