'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/userAuthContext";
import { studentRegApi } from "@/lib/student-onboarding/studentRegMethods";
import toast from 'react-hot-toast';
import { Loader2, CheckCircle, AlertCircle, ChevronRight, Lightbulb } from "lucide-react";

const StudentRegStepTwo = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [pitch, setPitch] = useState("");
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState("");
    const [isValid, setIsValid] = useState(false);
    const maxWords = 200;
    const minWords = 20;

    useEffect(() => {
        if (touched) {
            const words = pitch.trim().split(/\s+/).filter(word => word.length > 0);
            const wordCount = words.length;

            if (wordCount === 0) {
                setError("Please share your innovative idea");
                setIsValid(false);
            } else if (wordCount < minWords) {
                setError(`Please elaborate more (minimum ${minWords} words)`);
                setIsValid(false);
            } else if (wordCount > maxWords) {
                setError(`Please limit your idea to ${maxWords} words`);
                setIsValid(false);
            } else {
                setError("");
                setIsValid(true);
            }
        }
    }, [pitch, touched, minWords, maxWords]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTouched(true);

        // Validate pitch length
        const words = pitch.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;

        if (wordCount < minWords || wordCount > maxWords) {
            return;
        }

        try {
            setLoading(true);
            if (user && user.id) {
                await studentRegApi.updatePitch( { pitch });
                toast.success('Your idea was submitted successfully!');
                router.push('/signup/student/3');
            }
        } catch (err) {
            console.error('Error submitting pitch:', err);
            toast.error('Submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePitchChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPitch(e.target.value);
    };

    const handleBlur = () => {
        setTouched(true);
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
                                    Step 2 of 2
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-semibold inline-block text-blue-600">
                                    100% Complete
                                </span>
                            </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                            <div style={{ width: "100%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
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
                        Share Your Innovation
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-2"
                    >
                        What&apos;s your big idea for the ICORE community?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto"
                    >
                        Tell us about an innovative idea you believe could make a difference.
                    </motion.p>
                </div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-full"
                    onSubmit={handleSubmit}
                >
                    <LabelInputContainer className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <Label htmlFor="idea" className="flex items-center text-sm sm:text-base font-medium">
                                <Lightbulb className="w-4 h-4 mr-2 text-amber-500" />
                                Your Innovative Idea <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <span className={cn(
                                "text-xs font-medium px-2 py-1 rounded-full",
                                isValid ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                            )}>
                                {pitch.trim().split(/\s+/).filter(word => word).length} / {maxWords} words
                            </span>
                        </div>
                        <div className="relative">
                            <textarea
                                id="idea"
                                className={cn(
                                    "w-full min-h-[180px] sm:min-h-[220px] p-4 border rounded-xl text-sm sm:text-base transition-all",
                                    "focus:outline-none focus:ring-2 resize-none",
                                    error && touched ? "border-red-300 focus:ring-red-500 bg-red-50" :
                                        isValid ? "border-green-300 focus:ring-green-500 bg-green-50" :
                                            "border-gray-300 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                                )}
                                placeholder="Describe your idea in detail... What problem does it solve? How would it benefit the engineering community? What makes it innovative?"
                                value={pitch}
                                onChange={handlePitchChange}
                                onBlur={handleBlur}
                            />
                            {touched && (
                                error ? (
                                    <AlertCircle className="absolute right-3 top-3 h-5 w-5 text-red-500" />
                                ) : isValid ? (
                                    <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                                ) : null
                            )}
                        </div>

                        {touched && error && (
                            <p className="text-red-500 text-xs mt-1">{error}</p>
                        )}

                        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                            <p className="font-medium mb-1">Tips for a great innovation pitch:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Be specific about the problem you&apos;re addressing</li>
                                <li>Explain how your idea is different from existing solutions</li>
                                <li>Consider feasibility and potential impact</li>
                                <li>Aim for {minWords}-{maxWords} words for clarity</li>
                            </ul>
                        </div>
                    </LabelInputContainer>

                    {/* Submit Button */}
                    <div className="flex flex-col items-center mt-8">
                        <Button
                            type="submit"
                            className={cn(
                                "w-full sm:w-auto min-w-[200px] relative overflow-hidden group transition-all",
                                isValid ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                            )}
                            disabled={loading || !isValid}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Submitting...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    Submit & Continue
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}

                            {/* Animated background for enabled button */}
                            {isValid && !loading && (
                                <span className="absolute inset-0 h-full w-0 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-300 group-hover:w-full opacity-50"></span>
                            )}
                        </Button>

                        {/* Validation message */}
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            {!touched ? (
                                <span className="flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-1 text-blue-500" /> Share your innovative idea
                                </span>
                            ) : error ? (
                                <span className="flex items-center text-red-500">
                                    <AlertCircle className="w-4 h-4 mr-1" /> {error}
                                </span>
                            ) : (
                                <span className="flex items-center text-green-500">
                                    <CheckCircle className="w-4 h-4 mr-1" /> Your idea looks great!
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
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};

export default StudentRegStepTwo;