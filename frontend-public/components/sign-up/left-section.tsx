import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export const LeftSection = () => {
  return (
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
    )
}

export default LeftSection