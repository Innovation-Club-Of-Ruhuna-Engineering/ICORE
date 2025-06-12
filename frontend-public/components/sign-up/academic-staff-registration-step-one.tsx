'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AcademicStaffRegStepOne = () => {
  const router = useRouter();
  const [] = useState({
    contactNumber: "",
    department: ""
  });

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
        <div className="text-center mb-8">
          <p className="text-icoreGray text-base sm:text-lg my-2 sm:my-4">1 / 2</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-700 mb-1">Hello Username,</h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-600">We&apos;re excited to have you!</h2>
          <p className="text-base sm:text-lg text-gray-400">Help us set up your profile with the right details.</p>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 gap-6">
          {/* Contact Number */}
          <LabelInputContainer>
            <Label htmlFor="contactNumber" className="flex items-center text-sm sm:text-base">
              Contact Number<p className="text-red-500 ml-1">*</p>
              <span className="ml-1 text-xs sm:text-sm text-gray-500">(WhatsApp Preferred)</span>
            </Label>
            <Input
              id="contactNumber"
              placeholder="+94 71 234 5678"
              type="tel"
              
            />
          </LabelInputContainer>

          {/* Department Selection */}
          <LabelInputContainer>
            <Label htmlFor="department" className="flex text-sm sm:text-base">
              Department<p className="text-red-500 ml-1">*</p>
            </Label>
            <div className="flex flex-wrap gap-4 mt-2">
              {[
                { id: "deie", label: "DEIE" },
                { id: "dmena", label: "DMENA" },
                { id: "dcee", label: "DCEE" },
                { id: "dmme", label: "DMME" }
              ].map(dept => (
                <div key={dept.id} className="flex items-center">
                  <Input
                    id={`department-${dept.id}`}
                    name="department"
                    value={dept.id.toUpperCase()}
                    type="radio"
                    className="h-4 w-4 mr-2"
                  />
                  <Label
                    htmlFor={`department-${dept.id}`}
                    className="text-sm font-normal"
                  >
                    {dept.label}
                  </Label>
                </div>
              ))}
            </div>
          </LabelInputContainer>

          

          {/* Continue Button */}
          <div className="text-center mt-6">
            <button
              className="w-full sm:w-2/3 md:w-1/3 px-6 py-2.5 rounded-md bg-icoreBlue text-white font-medium transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-icoreBlue"
              onClick={() => router.push("/academic-staff-reg-2")}
              type="button"
            >
              Continue
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

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

export default AcademicStaffRegStepOne;