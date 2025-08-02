import { getAllTalents, getTalentById as getTalentByIdFromData, addTalent } from "../data/talents.js";

// GET /api/talents - Get all talents
export const getTalents = async (req, res) => {
  try {
    const talents = getAllTalents();
    res.json({ success: true, data: talents });
  } catch (error) {
    console.error('Error fetching talents:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch talents' });
  }
};

// GET /api/talents/:id - Get single talent by ID
export const getTalentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const talent = getTalentByIdFromData(id);
    
    if (!talent) {
      return res.status(404).json({ success: false, error: 'Talent not found' });
    }
    
    res.json({ success: true, data: talent });
  } catch (error) {
    console.error('Error fetching talent:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch talent' });
  }
};

// POST /api/talents - Create new talent (for admin)
export const createTalent = async (req, res) => {
  try {
    const talent = addTalent(req.body);
    res.status(201).json({ success: true, data: talent });
  } catch (error) {
    console.error('Error creating talent:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};
