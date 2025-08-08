import React, { useState } from 'react'
import Image from 'next/image'
import SignUpForm from './sign-up-form'
import SignInForm from './sign-in-form'
import { AnimatePresence, motion } from 'framer-motion'

const RightSection = () => {
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
                  <SignUpForm />
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
    )
}

export default RightSection