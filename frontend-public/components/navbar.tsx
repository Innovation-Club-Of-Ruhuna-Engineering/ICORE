import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function Navbar() {
  return (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900"
            >
              ICORE
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-8">
                <Link href="#" className="text-sm text-gray-700 hover:text-gray-900">
                  Home
                </Link>
                <Link href="#" className="text-sm text-gray-700 hover:text-gray-900">
                  Projects
                </Link>
                <Link href="#" className="text-sm text-gray-700 hover:text-gray-900">
                  Shop
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-sm text-gray-700 hover:text-gray-900">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar