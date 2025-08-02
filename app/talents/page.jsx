'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeft, MapPin, Clock, ExternalLink } from "lucide-react";

export default function TalentsPage() {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTalents();
  }, []);

  const fetchTalents = async () => {
    try {
      const response = await fetch('/api/talents');
      const data = await response.json();
      if (data.success) {
        setTalents(data.data);
      }
    } catch (error) {
      console.error('Error fetching talents:', error);
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
          <p className="text-gray-600">Loading talents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <Link href="/admin/login">
            <Button variant="outline">
              Admin Access
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Our Talented Professionals
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover exceptional talent ready to bring your projects to life
          </p>
        </div>

        {talents.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 max-w-md mx-auto">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Talents Yet</h3>
              <p className="text-gray-600 mb-6">
                Be the first to add a talent profile to our platform.
              </p>
              <Link href="/admin">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Add First Talent
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {talents.map((talent) => (
              <Card key={talent._id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:bg-white/90">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <img
                      src={talent.profileImage}
                      alt={talent.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{talent.name}</h3>
                    <div className="flex items-center justify-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{talent.location}</span>
                    </div>
                    <div className="flex justify-center">
                      <Badge className={`${getAvailabilityColor(talent.availability)} border`}>
                        <Clock className="w-3 h-3 mr-1" />
                        {talent.availability}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {talent.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {talent.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{talent.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {talent.bio && (
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                      {talent.bio}
                    </p>
                  )}
                  
                  <Link href={`/talents/${talent._id}`}>
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 group-hover:scale-105 transition-transform">
                      View Profile
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
