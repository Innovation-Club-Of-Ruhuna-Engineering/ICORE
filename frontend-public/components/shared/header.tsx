'use client'

import { Button } from "@/components/ui/button"
import { Lightbulb } from "lucide-react"
import { useRouter } from "next/navigation";


export function Navigation() {
  const router = useRouter();
  const handleButtonCLick = () => {
    // Handle button click logic here
    router.push('/sign-up'); // Example: Navigate to the join page
  };
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ICORE</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#projects" className="text-gray-600 hover:text-blue-600 transition-colors">
              Projects
            </a>
            <a href="#join" className="text-gray-600 hover:text-blue-600 transition-colors">
              Join Us
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleButtonCLick}>Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
