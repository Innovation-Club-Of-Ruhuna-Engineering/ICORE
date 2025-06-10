"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";



const Registration = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };
    return (
        <div className=" mx-auto w-full max-w-md rounded-none bg-white p-4  md:py-6 dark:bg-black">
            

            <form className="my-0" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-1">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-1">
                    <Label htmlFor="firstname">Username</Label>
                    <Input id="firstname" placeholder="Tyler" type="text" />
                </LabelInputContainer>
                
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    <LabelInputContainer>
                        <Label htmlFor="firstname">First name</Label>
                        <Input id="firstname" placeholder="Tyler" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="lastname">Last name</Label>
                        <Input id="lastname" placeholder="Durden" type="text" />
                    </LabelInputContainer>
                </div>
                
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="membertype">Member Type</Label>
                    <div className="flex space-x-4 mt-1">
                        <div className="flex items-center">
                            <Input
                                id="membertype-student"
                                name="membertype"
                                value="student"
                                type="radio"
                                className="h-4 w-4 mr-2"
                            />
                            <Label
                                htmlFor="membertype-student"
                                className="text-sm font-normal"
                            >
                                Student
                            </Label>
                        </div>
                        <div className="flex items-center">
                            <Input
                                id="membertype-academic"
                                name="membertype"
                                value="academic"
                                type="radio"
                                className="h-4 w-4 mr-2"
                            />
                            <Label
                                htmlFor="membertype-academic"
                                className="text-sm font-normal"
                            >
                                Academic Staff
                            </Label>
                        </div>
                    </div>
                </LabelInputContainer>
                <LabelInputContainer className="mb-8">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="••••••••" type="password" />
                </LabelInputContainer>
                

                <Link href="/sign-up/student-1"> <button className=" w-full px-8 py-2 rounded-md bg-icoreBlue text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-icoreBlue"
                   
                    type="submit"
                >
                    Create Account
                    <BottomGradient />
                </button></Link>
                

             

                
            </form>
            <p className="text-[12px] text-gray-500 mt-2 text-center">
                By signing up, you agree to our <Link href="/#" className="text-icoreBlue font-bold">Terms of Service</Link> & <Link href="/#" className="text-icoreBlue font-bold">Privacy Policy</Link>.
            </p>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
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

export default Registration;