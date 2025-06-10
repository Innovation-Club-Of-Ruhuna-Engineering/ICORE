'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const StudentRegStepTwo =() =>{
  const [] = useState({
    registrationNumber: "",
    contactNumber: "",
    gender: "",
    batch: "",
    department: ""
  });

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:max-w-3xl  bg-white p-6 rounded-2xl shadow-lgg"
      >
        <div>
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
        </div>
       
        <div className="text-center mb-26">
          <p className="text-icoreGray text-lg my-4">1 / 2</p>
          <h1 className="text-4xl font-semibold text-blue-700 mb-1">Hello Username,</h1>
          <h2 className="text-gray-600 text-2xl">We&apos;re excited to have you!</h2>
          <p className="text-xl text-gray-400">Help us set up your profile with the right details.</p>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabelInputContainer className="mb-1">
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input id="registrationNumber" placeholder="EG/20##/####" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-1">
            <Label htmlFor="firstname">Contact Number (WhatsApp Preferred)</Label>
            <Input id="firstncontactNumberame" placeholder="+94 71 234 5678" type="text" />
          </LabelInputContainer>

           <LabelInputContainer className="mb-4">
                              <Label htmlFor="gendertype">Gender</Label>
                              <div className="flex space-x-4 mt-1">
                                  <div className="flex items-center">
                                      <Input
                                          id="gender-male"
                                          name="gendertype"
                                          value="male"
                                          type="radio"
                                          className="h-4 w-4 mr-2"
                                      />
                                      <Label
                                          htmlFor="gender-male"
                                          className="text-sm font-normal"
                                      >
                                          Male
                                      </Label>
                                  </div>
                                  <div className="flex items-center">
                                      <Input
                                          id="gendertype-female"
                                          name="gendertype"
                                          value="female"
                                          type="radio"
                                          className="h-4 w-4 mr-2"
                                      />
                                      <Label
                                          htmlFor="gendertype-female"
                                          className="text-sm font-normal"
                                      >
                                          Female 
                                      </Label>
                                  </div>
                              </div>
          </LabelInputContainer>

           
          
          <LabelInputContainer className="mb-4">
            <Label htmlFor="batch">Batch</Label>
            <div className="flex space-x-4 mt-1">
              <div className="flex items-center">
                <Input
                  id="batch-22"
                  name="batch"
                  value="22"
                  type="radio"
                  className="h-4 w-4 mr-2"
                />
                <Label
                  htmlFor="gender-male"
                  className="text-sm font-normal"
                >
                  22
                </Label>
              </div>
              <div className="flex items-center">
                <Input
                  id="batch-23"
                  name="batch"
                  value="23"
                  type="radio"
                  className="h-4 w-4 mr-2"
                />
                <Label
                  htmlFor="batch-23"
                  className="text-sm font-normal"
                >
                  23  
                </Label>                
              </div>
              
              <div className="flex items-center">
                <Input
                  id="batch-24"
                  name="batch"
                  value="24"
                  type="radio"
                  className="h-4 w-4 mr-2"
                />
                <Label
                  htmlFor="batch-24"
                  className="text-sm font-normal"
                >
                  24  
                </Label>
              </div>

              <div className="flex items-center">
                <Input
                  id="batch-25"
                  name="batch"
                  value="25"
                  type="radio"
                  className="h-4 w-4 mr-2"
                />
                <Label
                  htmlFor="batch-25"
                  className="text-sm font-normal"
                >
                25  
                </Label>
              </div>

            </div>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="department">Department</Label>
            <div className="flex space-x-4 mt-1">
              <div className="flex items-center">
                <Input
                  id="department-deie"
                  name="department"
                  value="DEIE"
                  type="radio"
                  className="h-4 w-4 mr-2"
                />
                <Label
                  htmlFor="department-deie"
                  className="text-sm font-normal"
                >
                  DEIE
                </Label>
              </div>
              <div className="flex items-center">
                <Input
                  id="department-dmena"
                  name="department"
                  value="DMENA"
                  type="radio"
                  className="h-4 w-4 mr-2"
                />
                <Label
                  htmlFor="department-dmena"
                  className="text-sm font-normal"
                >
                  DMENA
                </Label>
              </div>
              <div className="flex items-center">
                <Input
                  id="department-dcee"
                  name="department"
                  value="DCEE"
                  type="radio"
                  className="h-4 w-4 mr-2"
                />
                <Label
                  htmlFor="department-dcee"
                  className="text-sm font-normal"
                >
                  DCEE
                </Label>
              </div>
              <div className="flex items-center">
                <Input
                  id="department-dmme"
                  name="department"
                  value="DMME"
                  type="radio"
                  className="h-4 w-4 mr-2"
                />
                <Label
                  htmlFor="department-dmme"
                  className="text-sm font-normal"
                >
                  DMME
                </Label>
              </div>
            </div>
          </LabelInputContainer>
          

          <div className="md:col-span-2 text-center mt-4">
            <Link href="/sign-up/student-1"> <button className=" w-1/4 px-8 py-2 rounded-md bg-icoreBlue text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-icoreBlue"

              type="submit"
            >
              Continue
              
            </button></Link>
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
export default StudentRegStepTwo;


