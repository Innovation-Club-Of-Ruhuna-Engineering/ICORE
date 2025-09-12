'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/userAuthContext";

import { Sparkles, ArrowRight, GraduationCap, BookOpen, LightbulbIcon, Users } from "lucide-react";

const AcademicStaffRegStepTwo = () => {
    const router = useRouter();
    const { user } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black px-4 py-8 sm:py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden"
            >
                {/* Background decorative elements */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-50"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-100 dark:bg-green-900/20 rounded-full opacity-40"></div>
                <div className="absolute top-1/3 right-10 w-6 h-6 bg-amber-300 dark:bg-amber-500 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-10 w-4 h-4 bg-pink-300 dark:bg-pink-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Content (layered on top of decorative elements) */}
                <div className="relative z-10">
                    {/* Progress indicator */}
                    

                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
                        className="w-full flex justify-center mb-8"
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

                    {/* Success Image & Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                        className="w-full flex justify-center mb-10 relative"
                    >
                        <div className="relative">
                            <Image
                                src="/success.png"
                                alt="Success"
                                width={180}
                                height={180}
                                priority
                                className="h-auto w-auto sm:w-[200px] md:w-[220px] z-10 relative"
                            />
                            {/* Animated sparkles */}
                            <motion.div
                                className="absolute -top-4 -right-2"
                                initial={{ opacity: 0, rotate: -10 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                <Sparkles className="w-6 h-6 text-amber-400" />
                            </motion.div>
                            <motion.div
                                className="absolute top-1/2 -left-4"
                                initial={{ opacity: 0, rotate: 10 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ delay: 1.0, duration: 0.5 }}
                            >
                                <Sparkles className="w-5 h-5 text-blue-400" />
                            </motion.div>
                            <motion.div
                                className="absolute -bottom-2 right-1/4"
                                initial={{ opacity: 0, rotate: -5 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ delay: 1.2, duration: 0.5 }}
                            >
                                <GraduationCap className="w-5 h-5 text-green-400" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Success Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                            Welcome, {user?.username || ""}!
                        </h2>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                            You&apos;ve joined the ICORE academic community!
                        </h3>
                        <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Thank you for joining the Innovation Club of Ruhuna Engineering.
                            Your mentorship and expertise will inspire our students and guide innovative projects.
                        </p>
                    </motion.div>

                    {/* Mentorship Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 mb-8 max-w-xl mx-auto"
                    >
                        <h4 className="font-semibold text-blue-700 dark:text-blue-300 flex items-center mb-3">
                            <BookOpen className="w-4 h-4 mr-2" /> Your Role as a Mentor
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                                <div className="flex items-center mb-2">
                                    <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full mr-2">
                                        <LightbulbIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <h5 className="font-medium text-gray-800 dark:text-gray-200">Guide Innovation</h5>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-xs">Provide feedback on student projects and help refine their innovative ideas</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                                <div className="flex items-center mb-2">
                                    <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full mr-2">
                                        <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h5 className="font-medium text-gray-800 dark:text-gray-200">Foster Collaboration</h5>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-xs">Connect students with resources and facilitate interdisciplinary teamwork</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Button */}
                    <motion.div
                        className="text-center mt-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                    >
                        <Button
                            onClick={() => router.push("/me")}
                            className="relative overflow-hidden group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
                        >
                            <span className="flex items-center justify-center gap-2">
                                Begin Mentoring
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>

                            {/* Animated background */}
                            <span className="absolute inset-0 h-full w-0 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-300 group-hover:w-full opacity-50"></span>
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default AcademicStaffRegStepTwo;