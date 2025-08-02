'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { ArrowLeft, MapPin, Clock, Mail, Linkedin, Github, Globe, ExternalLink } from "lucide-react";

export default function TalentProfilePage() {
  const params = useParams();
  const id = params.id;
  const [talent, setTalent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id && id.trim()) {
      fetchTalent(id);
    } else {
      setError('Invalid talent ID');
      setLoading(false);
    }
  }, [id]);

  const fetchTalent = async (talentId) => {
    try {
      const response = await fetch(`/api/talents/${talentId}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError('Talent not found');
        } else {
          setError(`Server error: ${response.status}`);
        }
        return;
      }

      const data = await response.json();

      if (data.success && data.data) {
        setTalent(data.data);
        setError(null);
      } else {
        setError(data.error || 'Talent not found');
      }
    } catch (error) {
      console.error('Error fetching talent:', error);
      setError('Failed to load talent profile');
    } finally {
      setLoading(false);
    }
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800 border-green-200';
      case 'Busy': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Unavailable': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading talent profile...</p>
        </div>
      </div>
    );
  }

  if (error || !talent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'This talent profile could not be found.'}</p>
          <Link href="/talents">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Talents
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/talents">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Talents
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <img
                  src={talent.profileImage}
                  alt={talent.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">{talent.name}</h1>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{talent.location}</span>
                    </div>
                    <Badge className={`${getAvailabilityColor(talent.availability)} border`}>
                      <Clock className="w-4 h-4 mr-2" />
                      {talent.availability}
                    </Badge>
                  </div>
                  
                  {talent.bio && (
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {talent.bio}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-3">
                    {talent.contact?.email && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${talent.contact.email}`}>
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </a>
                      </Button>
                    )}
                    {talent.contact?.linkedin && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={talent.contact.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    {talent.contact?.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={talent.contact.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {talent.contact?.website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={talent.contact.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />
                          Website
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {talent.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {talent.experience && (
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{talent.experience}</p>
                </CardContent>
              </Card>
            )}
          </div>
          
          {talent.portfolio && talent.portfolio.length > 0 && (
            <Card className="mt-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {talent.portfolio.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      {item.url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            View Project
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
