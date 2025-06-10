'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Registration from './registration'
import SignInForm from './sign-in'
import { AnimatePresence, motion } from 'framer-motion'

const SignUp = () => {
  const [activeTab, setActiveTab] = useState('signup')
  const signUpFormVariants = {
    hidden: { opacity: 0, x: 25 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -25 }
  }
  const signInFormVariants = {
    hidden: { opacity: 0, x: -25 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 25 }
  }


  return (
    <div className='flex min-h-screen w-full flex-col md:flex-row bg-slate-50 items-start justify-center p-8'>
      {/* Left Section with Image - Hidden on small screens, visible on md and up */}
      <div className='hidden md:flex md:w-5/12 items-start justify-end p-4'>
        <motion.div initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
          className="relative w-[500px] max-w-xl h-[650px] p-8">
          {/* Background Image */}
          <Image
            src="/reg.png"
            alt="Innovation Club of Ruhuna Engineering"
            fill
            priority
            className="rounded-[20px] object-cover"
          />

          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-icoreBlue/30 rounded-[20px]"></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-md px-4 text-white">
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut", delay: 0.2 }}
                className="text-2xl md:text-[40px] font-bold mt-2"
              >
                Welcome to the
              </motion.h4>

              <motion.h1 className="text-3xl md:text-[44px] font-black mt-2">
                {Array.from("Innovation Club Of Ruhuna Engineering").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.1,
                      delay: 0.5 + index * 0.05,
                      ease: "easeInOut"
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.9 }}
                className="mt-2 text-xl md:text-[22px]"
              >
                Your Journey from Concept to Creation.
              </motion.h3>

              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="mt-24 md:mt-52 text-2xl md:text-[34px] font-bold"
              >
                Beyond Ideas, Into Action.
              </motion.h2>

              <motion.h4
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.7 }}
                className="text-base md:text-[18px] mt-2"
              >
                Innovate together, inspire others, and make a real difference.
              </motion.h4>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Section with Form */}
      <div className='w-full md:w-5/12 flex flex-col items-center md:items-center justify-start p-4 md:pl-8 md:pr-10 md:pt-4'>
        {/* Logo - Centered on all screen sizes */}
        <motion.div initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}  className='self-center w-full flex justify-center mb-4'>
          <Image
            src="/icore-logo.png"
            alt="Innovation Club of Ruhuna Engineering"
            width={100}
            height={30}
            priority
          />
        </motion.div>

        {/* Mobile-only welcome text */}
        <div className="md:hidden text-center mb-6 text-gray-800">
          
          <h1 className="mt-2 font-bold text-3xl">Welcome to the Innovation Club Of Ruhuna Engineering</h1>
        </div>

        {/* Card Container */}
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm px-6 md:px-8 md:py-3">
          {/* Tab Navigation */}
          <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }} className="w-full max-w-md py-2 px-5">
            <div className="flex  border-gray-300">
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
          </motion.div>

          {/* Form Content */}
          <div className="w-full overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'signup' ? (
                <motion.div
                  key="signup"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={signUpFormVariants}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <Registration />
                </motion.div>
              ) : (
                <motion.div
                  key="signin"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={signInFormVariants}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <SignInForm />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUp