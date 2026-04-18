const mongoose = require('mongoose');
const Room = require('./models/Room');
const dotenv = require('dotenv');

dotenv.config();

const seedRooms = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const count = await Room.countDocuments();
    if (count > 0) {
      console.log('Sanctuary circles already exist. Skipping seed.');
      process.exit();
    }

    const defaultRooms = [
      {
        name: "Zenith Dawn",
        category: "Anxiety",
        description: "A sanctuary for those who greet the sunrise with worry. We share calming techniques and morning meditations.",
        emoji: "🌅",
        color: "#C9A84C",
        tags: ["Anxiety", "Morning", "Meditation"],
        isNightOwlRoom: false
      },
      {
        name: "Ink & Echoes",
        category: "Depression",
        description: "Finding light in the deep shadows. A place for raw honesty and mutual support when the weight feels too heavy.",
        emoji: "🖋️",
        color: "#4A5370",
        tags: ["Depression", "Support", "Honesty"],
        isNightOwlRoom: false
      },
      {
        name: "The Void Watchers",
        category: "Sleep",
        description: "For the true insomniacs. When the world is silent but your mind is screaming. Active during the late hours.",
        emoji: "🌌",
        color: "#111525",
        tags: ["Insomnia", "Night", "Venting"],
        isNightOwlRoom: true
      },
      {
        name: "Breath & Bone",
        category: "Stress",
        description: "Somatic healing and deep relaxation for the burnt out. We focus on physical release and box breathing.",
        emoji: "🌬️",
        color: "#3DD68C",
        tags: ["Stress", "Burnout", "Somatic"],
        isNightOwlRoom: false
      }
    ];

    await Room.insertMany(defaultRooms);
    console.log('Collective Sanctuary Circles seeded successfully.');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedRooms();
