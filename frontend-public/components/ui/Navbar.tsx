import React from 'react';
import { User } from 'lucide-react';

interface NavbarProps {
  user?: {
    name: string;
    avatar?: string;
  };
  currentPage?: 'home' | 'projects' | 'shop';
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user = { name: 'John Doe' }, 
  currentPage = 'projects' 
}) => {
  const isActive = (page: string) => currentPage === page;

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
                IC
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">ICORE</span>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex space-x-8">
              <a 
                href="/" 
                className={`${
                  isActive('home') 
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Home
              </a>
              <a 
                href="/projects" 
                className={`${
                  isActive('projects') 
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Projects
              </a>
              <a 
                href="/shop" 
                className={`${
                  isActive('shop') 
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Shop
              </a>
            </nav>
          </div>
          
          {/* User Section */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{user.name}</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-gray-600" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};