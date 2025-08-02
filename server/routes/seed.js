import { seedTalents } from "../data/talents.js";

export const seedSampleTalents = async (req, res) => {
  try {
    const talents = seedTalents();
    
    res.json({ 
      success: true, 
      message: `Successfully seeded ${talents.length} talents`,
      data: talents 
    });
  } catch (error) {
    console.error('Error seeding talents:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
