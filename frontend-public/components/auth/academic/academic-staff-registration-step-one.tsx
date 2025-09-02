'use client';
import { ChangeEvent, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/userAuthContext";
import Image from "next/image";
import toast from "react-hot-toast";
import { academicRegApi } from "@/lib/academic-onboarding/academicRegMethods";
import { Loader2, CheckCircle, AlertCircle, ChevronRight, Phone } from "lucide-react";

const AcademicStaffRegStepOne = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        contactNumber: "",
        department: ""
    });

    const [errors, setErrors] = useState({
        contactNumber: "",
    });

    const [touched, setTouched] = useState({
        contactNumber: false,
        department: false
    });

    const [formComplete, setFormComplete] = useState(false);

    useEffect(() => {
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

        // Check if form is complete
        const isComplete =
            formData.contactNumber !== "" &&
            formData.department !== "" &&
            !errors.contactNumber;

        setFormComplete(isComplete);
    }, [formData, touched, errors.contactNumber]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Mark all fields as touched to trigger validation
        setTouched({
            contactNumber: true,
            department: true
        });

        if (!formComplete) {
            toast.error('Please complete all required fields correctly');
            return;
        }

        try {
            setLoading(true);

            if (user && typeof user.id === 'string') {
                await academicRegApi.updateProfile({
                    contactNumber: formData.contactNumber,
                    department: formData.department
                });
                toast.success('Profile updated successfully!');
                router.push('/signup/academic/2');
            } else {
                toast.error('User ID is missing or invalid.');
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            toast.error('Update failed. Please try again.');
        } finally {
            setLoading(false);
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

        // Mark field as touched
        if (fieldName === 'contactNumber') {
            setTouched(prev => ({
                ...prev,
                contactNumber: true
            }));
        } else if (fieldName === 'department') {
            setTouched(prev => ({
                ...prev,
                department: true
            }));
        }
    }

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
                        Welcome, {user?.username || "academic Staff Member"}!
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
                        Your expertise and mentorship will be invaluable to our community.
                    </motion.p>
                </div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 gap-6"
                    onSubmit={handleSubmit}
                >
                    {/* Contact Number */}
                    <LabelInputContainer>
                        <Label htmlFor="contactNumber" className="flex items-center text-sm sm:text-base font-medium">
                            Contact Number <span className="text-red-500 ml-1">*</span>
                            <span className="ml-1 text-xs text-gray-500">(WhatsApp Preferred)</span>
                        </Label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Phone className="h-4 w-4 text-gray-400" />
                            </div>
                            <Input
                                id="contactNumber"
                                placeholder="+94 71 234 5678"
                                type="tel"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                onBlur={() => handleBlur('contactNumber')}
                                className={cn(
                                    "pl-10 pr-10",
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

                    {/* Department Selection */}
                    <LabelInputContainer>
                        <Label htmlFor="department" className="flex text-sm sm:text-base font-medium">
                            Department <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                            {[
                                { id: "DEIE", name: "Electrical & Information Engineering" },
                                { id: "DMENA", name: "Mechanical & Manufacturing Engineering" },
                                { id: "DCEE", name: "Civil & Environmental Engineering" },
                                { id: "DMME", name: "Marine Engineering & Naval Architecture" }
                            ].map(dept => (
                                <label
                                    key={dept.id}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all border text-center h-full",
                                        formData.department === dept.id
                                            ? "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                                    )}
                                >
                                    <input
                                        id={`department-${dept.id}`}
                                        name="department"
                                        value={dept.id}
                                        type="radio"
                                        checked={formData.department === dept.id}
                                        onChange={handleInputChange}
                                        className="sr-only"
                                    />
                                    <div className="flex flex-col items-center">
                                        <span className="text-sm font-medium mb-1">{dept.id}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{dept.name}</span>
                                    </div>
                                    {formData.department === dept.id && (
                                        <CheckCircle className="mt-2 h-4 w-4 text-blue-500 dark:text-blue-400" />
                                    )}
                                </label>
                            ))}
                        </div>
                        {touched.department && !formData.department && (
                            <p className="text-red-500 text-xs mt-1">Please select your department</p>
                        )}
                    </LabelInputContainer>

                    {/* Continue Button */}
                    <div className="flex flex-col items-center mt-8">
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