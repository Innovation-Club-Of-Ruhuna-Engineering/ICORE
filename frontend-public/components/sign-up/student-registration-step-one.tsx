'use client';
import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/userAuthContext";
import React from "react";
import toast from 'react-hot-toast';
import { studentRegApi } from "@/lib/student-onboarding/studentRegMethods";

const StudentRegStepOne = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    regNumber: "",
    contactNumber: "",
    gender: "",
    batch: "",
    department: ""
  });

  const {user} = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all required fields
    if (!formData.regNumber || !formData.contactNumber || !formData.gender || !formData.batch || !formData.department) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      if(user && user.id) {
        await studentRegApi.updateProfile(user.id, {
          regNumber: formData.regNumber,
          contactNumber: formData.contactNumber,
          gender: formData.gender,
          batch: formData.batch,
          department: formData.department
        });
        toast.success('Update successful!');
        router.push('/student-reg-2');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Update failed. Please try again.');
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    // For radio buttons, use the name attribute instead of id
    const fieldName = type === 'radio' ? name : e.target.id;
    
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
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
        <div className="text-center mb-8">
          <p className="text-icoreGray text-base sm:text-lg my-2 sm:my-4">1 / 2</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-700 mb-1">Hello {user?.username},</h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-600">We&apos;re excited to have you!</h2>
          <p className="text-base sm:text-lg text-gray-400">Help us set up your profile with the right details.</p>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" onSubmit={handleSubmit}>
          {/* Registration Number */}
          <LabelInputContainer>
            <Label htmlFor="regNumber" className="flex items-center text-sm sm:text-base">
              Registration Number<p className="text-red-500 ml-1">*</p>
            </Label>
            <Input id="regNumber" placeholder="EG/20##/####" type="text" onChange={handleInputChange} />
          </LabelInputContainer>

          {/* Contact Number */}
          <LabelInputContainer>
            <Label htmlFor="contactNumber" className="flex items-center text-sm sm:text-base">
              Contact Number<p className="text-red-500 ml-1">*</p>
              <span className="ml-1 text-xs sm:text-sm text-gray-500">(WhatsApp Preferred)</span>
            </Label>
            <Input id="contactNumber" placeholder="+94 71 234 5678" type="tel" onChange={handleInputChange} />
          </LabelInputContainer>

          {/* Gender */}
          <LabelInputContainer>
            <Label htmlFor="gender" className="flex text-sm sm:text-base">
              Gender<p className="text-red-500 ml-1">*</p>
            </Label>
            <div className="flex flex-wrap gap-4 mt-1">
              <div className="flex items-center">
                <Input
                  id="gender"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={(e) => handleInputChange(e)}
                  type="radio"
                  className="h-4 w-4 mr-2"
                />
                <Label htmlFor="gender" className="text-sm font-normal">
                  Male
                </Label>
              </div>
              <div className="flex items-center">
                <Input
                  id="gender"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={(e) => handleInputChange(e)}
                  type="radio"
                  className="h-4 w-4 mr-2"
                />
                <Label htmlFor="gender" className="text-sm font-normal">
                  Female
                </Label>
              </div>
            </div>
          </LabelInputContainer>

          {/* Batch */}
          <LabelInputContainer>
            <Label htmlFor="batch" className="flex text-sm sm:text-base">
              Batch <p className="text-red-500 ml-1">*</p>
            </Label>
            <div className="flex flex-wrap gap-4 mt-1">
              {[22, 23, 24, 25].map(year => (
                <div key={year} className="flex items-center">
                  <Input
                    id={`batch-${year}`}
                    name="batch"
                    value={`${year}`}
                    checked={formData.batch === `${year}`}
                    onChange={handleInputChange}
                    type="radio"
                    className="h-4 w-4 mr-2"
                  />
                  <Label htmlFor={`batch-${year}`} className="text-sm font-normal">
                    {year}
                  </Label>
                </div>
              ))}
            </div>
          </LabelInputContainer>

          {/* Department */}
          <LabelInputContainer className="md:col-span-2">
            <Label htmlFor="department" className="flex text-sm sm:text-base">
              Department<p className="text-red-500 ml-1">*</p>
            </Label>
            <div className="flex flex-wrap gap-4 mt-1">
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
                    value={dept.label}
                    checked={formData.department === dept.label}
                    onChange={handleInputChange}
                    type="radio"
                    className="h-4 w-4 mr-2"
                  />
                  <Label htmlFor={`department-${dept.id}`} className="text-sm font-normal">
                    {dept.label}
                  </Label>
                </div>
              ))}
            </div>
          </LabelInputContainer>

          {/* Continue Button */}
          <div className="md:col-span-2 text-center mt-6">
            <button
              className="w-full sm:w-2/3 md:w-1/3 px-6 py-2.5 rounded-md bg-icoreBlue text-white font-medium transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-icoreBlue"
              type="submit"
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

export default StudentRegStepOne;