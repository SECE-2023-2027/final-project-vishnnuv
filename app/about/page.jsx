import Link from "next/link";
import { Button } from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: 'About - TalentHub',
  description: 'Learn about TalentHub and our mission to connect exceptional talent with amazing opportunities',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
            About TalentHub
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                TalentHub is dedicated to connecting exceptional talent with amazing opportunities. 
                We believe that the right match between skills and projects can create extraordinary results.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800">What We Do</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We curate a portfolio of talented professionals across various fields including 
                design, development, marketing, and more. Each talent profile showcases their 
                unique skills, experience, and availability.
              </p>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Why Choose Us</h2>
              <ul className="space-y-4 text-lg text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  Carefully vetted talent pool
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  Detailed skill assessments
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  Real-time availability updates
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  Seamless matching process
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="text-center text-gray-600 mb-8 text-lg">
              Browse our talented professionals and discover your next team member.
            </p>
            <div className="text-center">
              <Link href="/talents">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Explore Talents
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
