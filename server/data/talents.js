// In-memory data store for demo purposes
let talents = [];

export function getAllTalents() {
  return talents.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getTalentById(id) {
  return talents.find(talent => talent._id === id);
}

export function addTalent(talentData) {
  const newTalent = {
    _id: Date.now().toString(),
    ...talentData,
    createdAt: new Date()
  };
  talents.push(newTalent);
  return newTalent;
}

export function removeTalentById(id) {
  const index = talents.findIndex(talent => talent._id === id);
  if (index !== -1) {
    talents.splice(index, 1);
    return true;
  }
  return false;
}

export function clearAllTalents() {
  talents = [];
}

export function seedTalents() {
  // Reset to original sample data
  talents = [
    {
      _id: "1",
      name: "Sarah Chen",
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      location: "San Francisco, CA",
      availability: "Available",
      profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face&auto=format",
      bio: "Full-stack developer with 5+ years of experience building scalable web applications. Passionate about clean code and user experience.",
      experience: "Senior Software Engineer at Meta, previously at startups. Led development of multiple React applications serving millions of users.",
      contact: {
        email: "sarah.chen@example.com",
        linkedin: "https://linkedin.com/in/sarahchen",
        github: "https://github.com/sarahchen",
        website: "https://sarahchen.dev"
      },
      createdAt: new Date()
    },
    {
      _id: "2",
      name: "Marcus Johnson",
      skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
      location: "New York, NY",
      availability: "Busy",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Creative designer focused on crafting intuitive user experiences. Specialized in mobile-first design and accessibility.",
      experience: "Lead UX Designer at Airbnb. 7+ years designing for Fortune 500 companies and startups. Expert in design systems and user research.",
      contact: {
        email: "marcus.johnson@example.com",
        linkedin: "https://linkedin.com/in/marcusjohnson",
        website: "https://marcusdesigns.co"
      },
      createdAt: new Date()
    },
    {
      _id: "3",
      name: "Elena Rodriguez",
      skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics", "Social Media"],
      location: "Austin, TX",
      availability: "Available",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Growth marketing specialist with a track record of increasing organic traffic by 300%+ for multiple SaaS companies.",
      experience: "Marketing Director at HubSpot. Expertise in B2B marketing, content strategy, and marketing automation. Certified in Google Analytics and SEO.",
      contact: {
        email: "elena.rodriguez@example.com",
        linkedin: "https://linkedin.com/in/elenarodriguez",
        website: "https://elenamarketing.com"
      },
      createdAt: new Date()
    }
  ];
  return talents;
}

// Initialize with clean seed data
seedTalents();
