'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminProtectedRoute from "../../components/AdminProtectedRoute";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    skills: [''],
    location: '',
    availability: 'Available',
    profileImage: '',
    bio: '',
    experience: '',
    contact: {
      email: '',
      linkedin: '',
      github: '',
      website: ''
    }
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      skills: newSkills.length > 0 ? newSkills : ['']
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanedSkills = formData.skills.filter(skill => skill.trim() !== '');
      
      const submitData = {
        ...formData,
        skills: cleanedSkills
      };

      const response = await fetch('/api/talents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success!",
          description: "Talent profile created successfully.",
        });
        router.push('/talents');
      } else {
        throw new Error(result.error || 'Failed to create talent profile');
      }
    } catch (error) {
      console.error('Error creating talent:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create talent profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSeedData = async () => {
    setSeeding(true);
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success!",
          description: "Sample data added successfully.",
        });
        router.push('/talents');
      } else {
        throw new Error(result.error || 'Failed to seed data');
      }
    } catch (error) {
      console.error('Error seeding data:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to seed data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/talents">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Talents
            </Button>
          </Link>
          <Link href="/admin/dashboard">
            <Button variant="outline">
              View Dashboard
            </Button>
          </Link>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Add New Talent
              </CardTitle>
              <p className="text-gray-600">Create a new talent profile for the platform</p>
              <div className="mt-4">
                <Button 
                  onClick={handleSeedData} 
                  variant="outline" 
                  disabled={seeding}
                  className="text-sm"
                >
                  {seeding ? 'Adding Sample Data...' : 'Add Sample Data for Testing'}
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                  
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      required
                      placeholder="e.g., San Francisco, CA"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="availability">Availability *</Label>
                    <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Busy">Busy</SelectItem>
                        <SelectItem value="Unavailable">Unavailable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="profileImage">Profile Image URL *</Label>
                    <Input
                      id="profileImage"
                      value={formData.profileImage}
                      onChange={(e) => handleInputChange('profileImage', e.target.value)}
                      required
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Skills *</h3>
                    <Button type="button" onClick={addSkill} size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Skill
                    </Button>
                  </div>
                  
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        placeholder="Enter a skill"
                        required={index === 0}
                      />
                      {formData.skills.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeSkill(index)}
                          size="sm"
                          variant="outline"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Brief bio or introduction"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="experience">Experience</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      placeholder="Work experience and background"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      value={formData.contact.linkedin}
                      onChange={(e) => handleContactChange('linkedin', e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input
                      id="github"
                      value={formData.contact.github}
                      onChange={(e) => handleContactChange('github', e.target.value)}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                      id="website"
                      value={formData.contact.website}
                      onChange={(e) => handleContactChange('website', e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Talent Profile'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </AdminProtectedRoute>
  );
}
