import { Suspense } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { ArrowRight, Users, MapPin, Clock, Star, Briefcase, Code, Palette } from "lucide-react";
import { FeaturedTalents } from "../components/FeaturedTalents.jsx";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TalentHub
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="/talents" className="text-gray-600 hover:text-gray-900 transition-colors">
                Talents
              </Link>
              <Link href="/admin/login">
                <Button size="sm" variant="outline">
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Discover Exceptional Talent
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Connect with top professionals who bring creativity, expertise, and passion to every project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/talents">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Browse Talent
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg">
            <Users className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
            <h3 className="text-3xl font-bold text-gray-800 mb-2">3+</h3>
            <p className="text-gray-600">Talented Professionals</p>
          </div>
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-3xl font-bold text-gray-800 mb-2">100+</h3>
            <p className="text-gray-600">Skills Covered</p>
          </div>
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg">
            <Star className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-3xl font-bold text-gray-800 mb-2">5.0</h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>

        {/* Featured Talents Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Talent</h2>
            <p className="text-xl text-gray-600">Meet some of our exceptional professionals</p>
          </div>

          <Suspense fallback={
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading featured talents...</p>
            </div>
          }>
            <FeaturedTalents />
          </Suspense>

          <div className="text-center mt-12">
            <Link href="/talents">
              <Button size="lg" variant="outline">
                View All Talents
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular Skills</h2>
            <p className="text-xl text-gray-600">Expertise across multiple domains</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg">
              <Code className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Development</h3>
              <p className="text-gray-600">Full-stack developers, mobile specialists, and DevOps engineers</p>
            </div>
            
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg">
              <Palette className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Design</h3>
              <p className="text-gray-600">UI/UX designers, graphic artists, and brand specialists</p>
            </div>
            
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Business</h3>
              <p className="text-gray-600">Project managers, marketers, and business strategists</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-16 text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Match?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful collaborations and discover talent that transforms ideas into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/talents">
              <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100">
                Explore Talents
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600">
                Join as Talent
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4 block">
              TalentHub
            </Link>
            <p className="text-gray-400 mb-6">Connecting exceptional talent with amazing opportunities</p>
            <div className="flex justify-center space-x-8">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/talents" className="text-gray-400 hover:text-white transition-colors">
                Talents
              </Link>
              <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                Join
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
