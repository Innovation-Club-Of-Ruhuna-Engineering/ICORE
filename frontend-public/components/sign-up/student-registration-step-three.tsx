// filepath: d:\dev\ICORE\frontend-public\components\sign-up\student-registration-step-three.tsx
'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const StudentRegStepThree = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white p-4 sm:p-6 rounded-2xl shadow-lg sm:px-8 md:px-16"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
          className='w-full flex justify-center mb-8'
        >
          <Image
            src="/icore-logo.png"
            alt="Innovation Club of Ruhuna Engineering"
            width={90}
            height={27}
            priority
          />
        </motion.div>

        {/* Success Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className='w-full flex justify-center mb-8'
        >
          <Image
            src="/succes.png"
            alt="Success"
            width={160}
            height={160}
            priority
            className="h-auto w-auto sm:w-[180px] md:w-[200px]"
          />
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">
            Account created successfully!
          </h2>
          <h3 className="text-lg sm:text-xl font-medium text-gray-600 mb-3">
            Welcome to the Innovation Club of Ruhuna Engineering!
          </h3>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Thank you for joining! Get ready to bring your ideas to life.
          </p>
        </motion.div>

        {/* Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/")}
            type="button"
            className="w-full sm:w-2/3 md:w-1/3 px-6 py-2.5 rounded-md bg-icoreBlue text-white font-medium transition duration-200 hover:bg-white hover:text-icoreBlue border-2 border-transparent hover:border-icoreBlue"
          >
            Let&apos;s Innovate!
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentRegStepThree;