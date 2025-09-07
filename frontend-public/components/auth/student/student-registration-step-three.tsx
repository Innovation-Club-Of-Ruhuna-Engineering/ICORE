// filepath: d:\dev\ICORE\frontend-public\components\auth\student\student-registration-step-three.tsx
'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Rocket, Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/userAuthContext";

const StudentRegStepThree = () => {
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
                                <Sparkles className="w-5 h-5 text-green-400" />
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
                            Congratulations, {user?.username || "Student"}!
                        </h2>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                            You&apos;re now part of the ICORE community!
                        </h3>
                        <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Thank you for joining the Innovation Club of Ruhuna Engineering.
                            Your journey to bringing innovative ideas to life starts now!
                        </p>
                    </motion.div>

                    {/* What's Next Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 mb-8 max-w-xl mx-auto"
                    >
                        <h4 className="font-semibold text-blue-700 dark:text-blue-300 flex items-center mb-3">
                            <Rocket className="w-4 h-4 mr-2" /> What&apos;s Next?
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <li className="flex items-start">
                                <div className="bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</div>
                                <span>Explore your personalized dashboard to see upcoming events and projects</span>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</div>
                                <span>Connect with other members and start collaborating on innovative ideas</span>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</div>
                                <span>Join ongoing projects or propose your own innovative solutions</span>
                            </li>
                        </ul>
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
                                Let&apos;s Innovate Together
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

export default StudentRegStepThree;