'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminProtectedRoute from '../../../components/AdminProtectedRoute';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { 
  Users, 
  Plus, 
  LogOut, 
  Settings, 
  BarChart3, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  MapPin,
  Mail
} from 'lucide-react';
import { useAdminAuth } from '../../../contexts/AdminAuthContext';
import { useToast } from '../../../hooks/use-toast';

export default function AdminDashboard() {
  const router = useRouter();
  const { logout, adminUser } = useAdminAuth();
  const { toast } = useToast();
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    busy: 0,
    unavailable: 0
  });

  useEffect(() => {
    fetchTalents();
  }, []);

  const fetchTalents = async () => {
    try {
      const response = await fetch('/api/talents');
      const data = await response.json();
      if (data.success) {
        setTalents(data.data);
        calculateStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching talents:', error);
      toast({
        title: "Error",
        description: "Failed to load talents",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (talentsData) => {
    const stats = talentsData.reduce((acc, talent) => {
      acc.total++;
      switch (talent.availability) {
        case 'Available':
          acc.available++;
          break;
        case 'Busy':
          acc.busy++;
          break;
        case 'Unavailable':
          acc.unavailable++;
          break;
      }
      return acc;
    }, { total: 0, available: 0, busy: 0, unavailable: 0 });
    
    setStats(stats);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    router.push('/admin/login');
  };

  const handleDeleteTalent = async (id) => {
    if (!confirm('Are you sure you want to delete this talent?')) return;
    
    try {
      const response = await fetch(`/api/talents/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "Talent deleted successfully",
        });
        fetchTalents(); // Refresh the list
      } else {
        throw new Error('Failed to delete talent');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete talent",
        variant: "destructive",
      });
    }
  };

  const getAvailabilityBadge = (availability) => {
    switch (availability) {
      case 'Available':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Available</Badge>;
      case 'Busy':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Busy</Badge>;
      case 'Unavailable':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Unavailable</Badge>;
      default:
        return <Badge variant="outline">{availability}</Badge>;
    }
  };

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  Welcome, <span className="font-medium">{adminUser?.name}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Talents</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Available</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.available}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Busy</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.busy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Settings className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Unavailable</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.unavailable}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Manage Talents</h2>
            <div className="flex space-x-3">
              <Link href="/admin">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Talent
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  View Public Site
                </Button>
              </Link>
            </div>
          </div>

          {/* Talents Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Talents</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading talents...</p>
                </div>
              ) : talents.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No talents found</h3>
                  <p className="text-gray-600 mb-4">Get started by adding your first talent profile.</p>
                  <Link href="/admin">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Talent
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {talents.map((talent) => (
                    <div key={talent._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <img
                          src={talent.profileImage}
                          alt={talent.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{talent.name}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {talent.location}
                            {talent.contact?.email && (
                              <>
                                <Mail className="w-3 h-3 ml-3 mr-1" />
                                {talent.contact.email}
                              </>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {talent.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {talent.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{talent.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {getAvailabilityBadge(talent.availability)}
                        <div className="flex space-x-2">
                          <Link href={`/talents/${talent._id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteTalent(talent._id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
