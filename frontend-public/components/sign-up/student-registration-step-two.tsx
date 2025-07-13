'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/userAuthContext";
import { studentRegApi } from "@/lib/student-onboarding/studentRegMethods";
import toast from 'react-hot-toast';

const StudentRegStepTwo = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [pitch, setPitch] = useState("");
  const maxWords = 200;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate pitch length
    const words = pitch.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length > maxWords) {
      alert(`Please limit your pitch to ${maxWords} words.`);
      return;
    }

    try {
      if (user && user.id) {
        await studentRegApi.updatePitch(user.id, { pitch });
        toast.success('Idea submitted successfully!');
        router.push('/student-reg-3'); // Redirect to next step
      }
    } catch (err) {
      console.error('Error submitting pitch:', err);
      toast.error('Submission failed. Please try again.');
    }

  }

  const handlePitchChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = e.target.value.split(/\s+/).filter(word => word.length > 0);
    if (words.length <= maxWords) {
      setPitch(e.target.value);
    }
  };

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
          className='w-full flex justify-center mb-6'
        >
          <Image
            src="/icore-logo.png"
            alt="Innovation Club of Ruhuna Engineering"
            width={90}
            height={27}
            priority
          />
        </motion.div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <p className="text-icoreGray text-base sm:text-lg my-2 sm:my-4">2 / 2</p>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-600">Pitch Your Idea for the Club</h2>
          <p className="text-sm sm:text-base text-gray-400 mt-1">Tell us one idea you believe could make a difference.</p>
        </div>

        {/* Form */}
        <form className="w-full" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <div className="flex justify-between items-end">
              <Label htmlFor="idea" className="text-sm sm:text-base">
                Innovative Idea <span className="text-red-500">*</span>
              </Label>
              <p className="text-xs text-gray-400">
                Maximum: {maxWords} words
              </p>
            </div>
            <textarea
              id="idea"
              className="w-full min-h-[150px] sm:min-h-[180px] p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base text-gray-700 mt-2"
              placeholder="Describe your idea here..."
              value={pitch}
              onChange={handlePitchChange}
            />
            <p className="text-right text-xs text-gray-400 mt-1">
              {pitch.trim().split(/\s+/).filter(word => word).length} / {maxWords} words
            </p>
          </LabelInputContainer>

          {/* Continue Button */}
          <div className="text-center mt-6 sm:mt-8">
            <button
              type="submit"
              className="w-full sm:w-2/3 md:w-1/3 px-6 py-2.5 rounded-md bg-icoreBlue text-white font-medium transition duration-200 hover:bg-white hover:text-icoreBlue border-2 border-transparent hover:border-icoreBlue"
            >
              Continue
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default StudentRegStepTwo;