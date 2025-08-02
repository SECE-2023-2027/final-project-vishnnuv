'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button.jsx";
import { Badge } from "./ui/badge.jsx";
import { Card, CardContent } from "./ui/card.jsx";
import { MapPin, Clock } from "lucide-react";

export function FeaturedTalents() {
  const [featuredTalents, setFeaturedTalents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedTalents();
  }, []);

  const fetchFeaturedTalents = async () => {
    try {
      const response = await fetch('/api/talents');
      const data = await response.json();
      if (data.success) {
        setFeaturedTalents(data.data.slice(0, 3)); // Show first 3 talents
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
      <div className="text-center py-16">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading featured talents...</p>
      </div>
    );
  }

  if (featuredTalents.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-gray-100 max-w-md mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Talents Yet</h3>
          <p className="text-gray-600 mb-6">
            Be the first to showcase talent on our platform.
          </p>
          <Link href="/admin">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              Add First Talent
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredTalents.map((talent) => (
        <Card key={talent._id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:bg-white/90">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <img
                src={talent.profileImage}
                alt={talent.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{talent.name}</h3>
              <div className="flex items-center justify-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{talent.location}</span>
              </div>
              <Badge className={`${getAvailabilityColor(talent.availability)} border`}>
                <Clock className="w-3 h-3 mr-1" />
                {talent.availability}
              </Badge>
            </div>
            
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {talent.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {talent.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{talent.skills.length - 3}
                  </Badge>
                )}
              </div>
            </div>
            
            <Link href={`/talents/${talent._id}`}>
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 group-hover:scale-105 transition-transform">
                View Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
