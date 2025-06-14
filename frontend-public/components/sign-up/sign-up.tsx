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
    <div className='min-h-screen flex items-center justify-center bg-white px-4 py-8 sm:py-12 lg:px-2'>
      {/* Left Section with Image - Hidden on small screens, visible on lg and up */}
      <div className='hidden lg:flex lg:w-[52%] xl:w-5/12 items-center lg:justify-evenly p-4 lg:pr-1'>
        <motion.div initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
          className="relative w-full max-w-[500px] lg:max-w-[540px] h-[600px] sm:h-[650px]">
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
          <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
            <div className="text-center w-full max-w-md px-2 sm:px-4 text-white">
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut", delay: 0.2 }}
                className="text-2xl md:text-[32px] lg:text-[36px] xl:text-[40px] font-bold mt-2"
              >
                Welcome to the
              </motion.h4>

              <motion.h1 className="text-2xl md:text-3xl lg:text-[38px] xl:text-[44px] font-black mt-2">
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
                className="mt-2 text-lg md:text-xl lg:text-[20px] xl:text-[22px]"
              >
                Your Journey from Concept to Creation.
              </motion.h3>

              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="mt-12 md:mt-16 lg:mt-20 xl:mt-24 text-xl md:text-2xl lg:text-[30px] xl:text-[34px] font-bold"
              >
                Beyond Ideas, Into Action.
              </motion.h2>

              <motion.h4
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.7 }}
                className="text-base lg:text-[16px] xl:text-[18px] mt-2"
              >
                Innovate together, inspire others, and make a real difference.
              </motion.h4>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Section with Form */}
      <div className='w-full lg:w-[48%] xl:w-5/12 flex flex-col items-center justify-start p-4 lg:pl-1 lg:pr-4 lg:pt-4'>
        {/* Logo - Centered on all screen sizes */}
        <motion.div initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }} className='self-center w-full flex justify-center mb-4'>
          <Image
            src="/icore-logo.png"
            alt="Innovation Club of Ruhuna Engineering"
            width={100}
            height={30}
            priority
          />
        </motion.div>

        {/* Mobile-only welcome text */}
        <div className="lg:hidden text-center mb-6 text-gray-800">
          <h1 className="mt-2 font-bold text-2xl sm:text-3xl">Welcome to the Innovation Club Of Ruhuna Engineering</h1>
        </div>

        {/* Card Container */}
        <div className="w-full max-w-md lg:max-w-auto bg-white rounded-xl shadow-sm px-4 sm:px-6 lg:px-8 py-2 lg:py-3">
          {/* Tab Navigation */}
          <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }} className="w-full max-w-md lg:max-w-[460px] py-2 px-3 sm:px-5">
            <div className="flex  border-gray-300">
              <button
                onClick={() => setActiveTab('signup')}
                className={`py-2 px-3 sm:px-4 flex-1 font-medium text-center ${activeTab === 'signup'
                  ? 'text-white border-b-2 border-icoreBlue rounded-l-[8px] bg-icoreBlue '
                  : 'text-white border-b-2 border-icoreGray rounded-l-[8px] bg-icoreGray'
                  }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setActiveTab('signin')}
                className={`py-2 px-3 sm:px-4 flex-1 font-medium text-center ${activeTab === 'signin'
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