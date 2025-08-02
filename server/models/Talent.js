import mongoose from 'mongoose';

const talentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  skills: [{
    type: String,
    required: true
  }],
  location: {
    type: String,
    required: true,
    trim: true
  },
  availability: {
    type: String,
    required: true,
    enum: ['Available', 'Busy', 'Unavailable'],
    default: 'Available'
  },
  profileImage: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    maxLength: 500
  },
  experience: {
    type: String
  },
  portfolio: [{
    title: String,
    description: String,
    url: String,
    image: String
  }],
  contact: {
    email: String,
    linkedin: String,
    github: String,
    website: String
  }
}, {
  timestamps: true
});

export default mongoose.models.Talent || mongoose.model('Talent', talentSchema);
