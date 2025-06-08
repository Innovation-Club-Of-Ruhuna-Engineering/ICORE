'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import SignInForm from "./sign-in" // Assuming you have this component
import Registration from "./registration" // Assuming you have this component


const StepOneForm = () => {
  const [activeTab, setActiveTab] = useState('signup')

  return (
    <div className="flex flex-col items-center justify-start text-white relative overflow-hidden p-6">
      {/* Centered Logo */}
      <div className='mt-2'>
        <Image
          src="/icore-logo.png"
          alt="Innovation Club of Ruhuna Engineering"
          width={100}
          height={35}
          priority
        />
      </div>

      {/* Tab Navigation */}
      <div className="w-full max-w-md py-6">
        <div className="flex border-b border-gray-300">
          <button
            onClick={() => setActiveTab('signup')}
            className={`py-2 px-4 flex-1 font-medium text-center ${activeTab === 'signup'
                ? 'text-white border-b-2 border-icoreBlue rounded-l-[8px] bg-icoreBlue '
              : 'text-white border-b-2 border-icoreGray rounded-l-[8px] bg-icoreGray'
              }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setActiveTab('signin')}
            className={`py-2 px-4 flex-1 font-medium text-center ${activeTab === 'signin'
              ? 'text-white border-b-2 border-icoreBlue rounded-r-[8px] bg-icoreBlue '
              : 'text-white border-b-2 border-icoreGray rounded-r-[8px] bg-icoreGray'
              }`}
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="w-full max-w-md">
        {activeTab === 'signup' ? (
          <Registration />
        ) : (
          <SignInForm />
        )}
      </div>
    </div>
  )
}

export default StepOneForm