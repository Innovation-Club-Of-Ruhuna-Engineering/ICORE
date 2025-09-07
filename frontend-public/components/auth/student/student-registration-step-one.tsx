'use client';
import { ChangeEvent, useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertCircle, ChevronRight } from "lucide-react";

const StudentRegStepOne = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    regNumber: "",
    contactNumber: "",
    gender: "",
    batch: "",
    department: ""
  });

  const [errors, setErrors] = useState({
    regNumber: "",
    contactNumber: "",
    batch: "",
  });

  const [touched, setTouched] = useState({
    regNumber: false,
    contactNumber: false,
    gender: false,
    batch: false,
    department: false
  });

  const [formComplete, setFormComplete] = useState(false);

  useEffect(() => {
    // Validate registration number format
    if (touched.regNumber) {
      const regNumberPattern = /^EG\/20\d{2}\/\d{4}$/;
      if (!formData.regNumber) {
        setErrors(prev => ({ ...prev, regNumber: "Registration number is required" }));
      } else if (!regNumberPattern.test(formData.regNumber)) {
        setErrors(prev => ({ ...prev, regNumber: "Format should be EG/20XX/XXXX" }));
      } else {
        setErrors(prev => ({ ...prev, regNumber: "" }));
      }
    }

    // Validate contact number format
    if (touched.contactNumber) {
      const phonePattern = /^(\+94|0)[1-9][0-9]{8}$/;
      if (!formData.contactNumber) {
        setErrors(prev => ({ ...prev, contactNumber: "Contact number is required" }));
      } else if (!phonePattern.test(formData.contactNumber.replace(/\s+/g, ''))) {
        setErrors(prev => ({ ...prev, contactNumber: "Please enter a valid Sri Lankan phone number" }));
      } else {
        setErrors(prev => ({ ...prev, contactNumber: "" }));
      }
    }

    // Validate batch format (01-99)
    if (touched.batch) {
      const batchPattern = /^(0[1-9]|[1-9][0-9])$/;
      if (!formData.batch) {
        setErrors(prev => ({ ...prev, batch: "Batch is required" }));
      } else if (!batchPattern.test(formData.batch)) {
        setErrors(prev => ({ ...prev, batch: "Batch must be a two-digit number (01-99)" }));
      } else {
        setErrors(prev => ({ ...prev, batch: "" }));
      }
    }

    // Check if form is complete
    const isComplete =
      formData.regNumber !== "" &&
      formData.contactNumber !== "" &&
      formData.gender !== "" &&
      formData.batch !== "" &&
      formData.department !== "" &&
      !errors.regNumber &&
      !errors.contactNumber &&
      !errors.batch;

    setFormComplete(isComplete);
  }, [formData, touched, errors.regNumber, errors.contactNumber, errors.batch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched to trigger validation
    setTouched({
      regNumber: true,
      contactNumber: true,
      gender: true,
      batch: true,
      department: true
    });

    if (!formComplete) {
      toast.error('Please complete all required fields correctly');
      return;
    }

    try {
      setLoading(true);

      if (user && user.id) {
        await studentRegApi.updateProfile({
          regNumber: formData.regNumber,
          contactNumber: formData.contactNumber,
          gender: formData.gender,
          batch: formData.batch,
          department: formData.department
        });
        toast.success('Update successful!');
        router.push('/signup/student/2');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Update failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const fieldName = type === 'radio' ? name : e.target.id;

    // Remove field name prefix for radio buttons
    const cleanFieldName = fieldName.includes('-')
      ? fieldName.split('-').slice(1).join('-')
      : fieldName;

    setFormData(prevState => ({
      ...prevState,
      [cleanFieldName]: value
    }));

    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [cleanFieldName]: true
    }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800"
      >
        {/* Progress indicator */}
        <div className="w-full mb-8">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Step 1 of 2
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  50% Complete
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
              <div style={{ width: "50%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
            </div>
          </div>
        </div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
          className="w-full flex justify-center mb-6"
        >
          <Image
            src="/icore-logo.png"
            alt="Innovation Club of Ruhuna Engineering"
            width={120}
            height={36}
            priority
            className="h-auto"
          />
        </motion.div>

        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-1"
          >
            Welcome, {user?.username || "Student"}!
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-2"
          >
            We&apos;re excited to have you join ICORE!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto"
          >
            Please complete your profile information below. All fields are required.
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Registration Number */}
          <LabelInputContainer>
            <Label htmlFor="regNumber" className="flex items-center text-sm sm:text-base font-medium">
              Registration Number <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="regNumber"
                placeholder="EG/20XX/XXXX"
                type="text"
                value={formData.regNumber}
                onChange={handleInputChange}
                onBlur={() => handleBlur('regNumber')}
                className={cn(
                  "pr-10",
                  errors.regNumber && touched.regNumber ? "border-red-500 focus:ring-red-500" :
                    formData.regNumber && !errors.regNumber ? "border-green-500 focus:ring-green-500" : ""
                )}
              />
              {touched.regNumber && (
                errors.regNumber ? (
                  <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                ) : formData.regNumber ? (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                ) : null
              )}
            </div>
            {touched.regNumber && errors.regNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.regNumber}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">Example: EG/2022/1234</p>
          </LabelInputContainer>

          {/* Contact Number */}
          <LabelInputContainer>
            <Label htmlFor="contactNumber" className="flex items-center text-sm sm:text-base font-medium">
              Contact Number <span className="text-red-500 ml-1">*</span>
              <span className="ml-1 text-xs text-gray-500">(WhatsApp Preferred)</span>
            </Label>
            <div className="relative">
              <Input
                id="contactNumber"
                placeholder="+94 71 234 5678"
                type="tel"
                value={formData.contactNumber}
                onChange={handleInputChange}
                onBlur={() => handleBlur('contactNumber')}
                className={cn(
                  "pr-10",
                  errors.contactNumber && touched.contactNumber ? "border-red-500 focus:ring-red-500" :
                    formData.contactNumber && !errors.contactNumber ? "border-green-500 focus:ring-green-500" : ""
                )}
              />
              {touched.contactNumber && (
                errors.contactNumber ? (
                  <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                ) : formData.contactNumber ? (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                ) : null
              )}
            </div>
            {touched.contactNumber && errors.contactNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">Example: +94 71 234 5678</p>
          </LabelInputContainer>

          {/* Gender */}
          <LabelInputContainer>
            <Label className="flex text-sm sm:text-base font-medium">
              Gender <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="flex gap-3 mt-1">
              {["male", "female"].map((g) => (
                <label
                  key={g}
                  className={cn(
                    "flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer transition-all border",
                    formData.gender === g
                      ? "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                  )}
                >
                  <input
                    id={`gender-${g}`}
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleInputChange}
                    type="radio"
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{g.charAt(0).toUpperCase() + g.slice(1)}</span>
                  {formData.gender === g && (
                    <CheckCircle className="ml-2 h-4 w-4 text-blue-500 dark:text-blue-400" />
                  )}
                </label>
              ))}
            </div>
            {touched.gender && !formData.gender && (
              <p className="text-red-500 text-xs mt-1">Please select your gender</p>
            )}
          </LabelInputContainer>

          {/* Batch */}
          <LabelInputContainer>
            <Label htmlFor="batch" className="flex items-center text-sm sm:text-base font-medium">
              Batch <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="batch"
                placeholder="23"
                type="text"
                value={formData.batch}
                onChange={handleInputChange}
                onBlur={() => handleBlur('batch')}
                maxLength={2}
                className={cn(
                  "pr-10 text-left",
                  errors.batch && touched.batch ? "border-red-500 focus:ring-red-500" :
                    formData.batch && !errors.batch ? "border-green-500 focus:ring-green-500" : ""
                )}
              />
              {touched.batch && (
                errors.batch ? (
                  <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                ) : formData.batch ? (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                ) : null
              )}
            </div>
            {touched.batch && errors.batch && (
              <p className="text-red-500 text-xs mt-1">{errors.batch}</p>
            )}
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">
                Enter two-digit batch number (01-99)
              </p>
              {formData.batch && !errors.batch && (
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  Batch 20{formData.batch}
                </p>
              )}
            </div>
          </LabelInputContainer>

          {/* Department */}
          <LabelInputContainer className="md:col-span-2">
            <Label className="flex text-sm sm:text-base font-medium">
              Department <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="flex flex-wrap gap-3 mt-1">
              {[
                { id: "DEIE", name: "Electrical & Information Engineering" },
                { id: "DMENA", name: "Mechanical & Manufacturing Engineering" },
                { id: "DCEE", name: "Civil & Environmental Engineering" },
                { id: "DMME", name: "Marine Engineering & Naval Architecture" }
              ].map((dept) => (
                <label
                  key={dept.id}
                  className={cn(
                    "flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer transition-all border",
                    formData.department === dept.id
                      ? "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                  )}
                >
                  <input
                    id={`department-${dept.id}`}
                    name="department"
                    value={dept.id}
                    checked={formData.department === dept.id}
                    onChange={handleInputChange}
                    type="radio"
                    className="sr-only"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{dept.id}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{dept.name}</span>
                  </div>
                  {formData.department === dept.id && (
                    <CheckCircle className="ml-2 h-4 w-4 text-blue-500 dark:text-blue-400" />
                  )}
                </label>
              ))}
            </div>
            {touched.department && !formData.department && (
              <p className="text-red-500 text-xs mt-1">Please select your department</p>
            )}
          </LabelInputContainer>

          {/* Continue Button */}
          <div className="md:col-span-2 flex flex-col items-center mt-8">
            <Button
              type="submit"
              className={cn(
                "w-full sm:w-auto min-w-[200px] relative overflow-hidden group transition-all",
                formComplete ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
              )}
              disabled={loading || !formComplete}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Continue
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}

              {/* Animated background for enabled button */}
              {formComplete && !loading && (
                <span className="absolute inset-0 h-full w-0 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-300 group-hover:w-full opacity-50"></span>
              )}
            </Button>

            {/* Form completion indicator */}
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {formComplete ? (
                <span className="flex items-center text-green-500">
                  <CheckCircle className="w-4 h-4 mr-1" /> All fields completed
                </span>
              ) : (
                <span className="flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1 text-amber-500" /> Please complete all required fields
                </span>
              )}
            </div>
          </div>
        </motion.form>
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
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};

export default StudentRegStepOne;
