"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/userAuthContext";
import toast from "react-hot-toast";
import {
    Eye,
    EyeOff,
    Loader2,
    CheckCircle,
    AlertCircle,
    Mail,
    User,
    UserCircle,
    Lock,
    GraduationCap,
    Briefcase
} from "lucide-react";
import { Button } from "../ui/button";



const SignUpForm = () => {
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        memberType: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        username: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    const [touched, setTouched] = useState({
        email: false,
        username: false,
        password: false,
        firstName: false,
        lastName: false,
        memberType: false,
    });

    const [formComplete, setFormComplete] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    // Password strength indicators
    const [passwordStrength, setPasswordStrength] = useState(0); // 0-3 (weak to strong)

    // Validate form fields in real-time
    useEffect(() => {
        // Email validation
        if (touched.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formData.email) {
                setErrors(prev => ({ ...prev, email: "Email is required" }));
            } else if (!emailRegex.test(formData.email)) {
                setErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
            } else {
                setErrors(prev => ({ ...prev, email: "" }));
            }
        }

        // Username validation
        if (touched.username) {
            if (!formData.username) {
                setErrors(prev => ({ ...prev, username: "Username is required" }));
            } else if (formData.username.length < 3) {
                setErrors(prev => ({ ...prev, username: "Username must be at least 3 characters" }));
            } else {
                setErrors(prev => ({ ...prev, username: "" }));
            }
        }

        // Password validation and strength calculation
        if (touched.password) {
            let strength = 0;
            let message = "";

            if (!formData.password) {
                message = "Password is required";
            } else {
                // Length check
                if (formData.password.length >= 8) strength += 1;

                // Character variety checks
                if (/[A-Z]/.test(formData.password)) strength += 1;
                if (/[0-9]/.test(formData.password)) strength += 1;
                if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;

                if (formData.password.length < 8) {
                    message = "Password must be at least 8 characters";
                } else if (strength < 3) {
                    message = "Password is too weak";
                }
            }

            setPasswordStrength(strength);
            setErrors(prev => ({ ...prev, password: message }));
        }

        // Name validations
        if (touched.firstName && !formData.firstName) {
            setErrors(prev => ({ ...prev, firstName: "First name is required" }));
        } else if (touched.firstName) {
            setErrors(prev => ({ ...prev, firstName: "" }));
        }

        if (touched.lastName && !formData.lastName) {
            setErrors(prev => ({ ...prev, lastName: "Last name is required" }));
        } else if (touched.lastName) {
            setErrors(prev => ({ ...prev, lastName: "" }));
        }

        // Check if form is complete and valid
        const isComplete =
            formData.email !== "" &&
            formData.username !== "" &&
            formData.password !== "" &&
            formData.firstName !== "" &&
            formData.lastName !== "" &&
            formData.memberType !== "" &&
            !errors.email &&
            !errors.username &&
            !errors.password &&
            !errors.firstName &&
            !errors.lastName;

        setFormComplete(isComplete);
    }, [formData, touched, errors.email, errors.username, errors.password, errors.firstName, errors.lastName]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Mark all fields as touched to trigger validation
        setTouched({
            email: true,
            username: true,
            password: true,
            firstName: true,
            lastName: true,
            memberType: true,
        });

        if (!formComplete) {
            toast.error("Please complete all required fields correctly");
            return;
        }

        setLoading(true);
        try {
            await register({
                email: formData.email,
                username: formData.username,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                role: formData.memberType === "student" ? "GENERAL" : "ACADEMIC",
            });

            toast.success("Account created successfully!");
            if (formData.memberType === "student") {
                router.push("/signup/student/1");
            } else {
                router.push("/signup/academic/1");
            }
        } catch (err) {
            console.error("Registration error:", err);
            // Display more specific error message if available
            const errorMessage = err instanceof Error ? err.message : "Registration failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Mark field as touched
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({
            ...prev,
            [field]: true
        }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl rounded-2xl shadow-xl bg-white dark:bg-gray-950 p-8 relative border border-gray-200 dark:border-gray-800"
            >
                {/* Subtle decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full opacity-60 blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-full opacity-40 blur-2xl -z-10"></div>

                {/* Logo + Heading */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center mb-8 relative z-10"
                >
                    <Image
                        src="/icore-logo.png"
                        alt="iCore Logo"
                        width={70}
                        height={70}
                        className="mb-4"
                    />
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        Create Your Account
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Join the ICORE community today
                    </p>
                </motion.div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-5"
                    onSubmit={handleSubmit}
                >

                    <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-5 sm:space-y-0">
                        {/* Email field */}
                        <LabelInputContainer>
                            <Label htmlFor="email" className="flex items-center text-sm font-medium">
                                Email Address <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                </div>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onBlur={() => handleBlur('email')}
                                    className={cn(
                                        "pl-10 pr-10",
                                        errors.email && touched.email ? "border-red-300 focus:ring-red-500" :
                                            formData.email && !errors.email ? "border-green-300 focus:ring-green-500" : ""
                                    )}
                                />
                                {touched.email && (
                                    errors.email ? (
                                        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                                    ) : formData.email ? (
                                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                                    ) : null
                                )}
                            </div>
                            {touched.email && errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </LabelInputContainer>

                        {/* Username field */}
                        <LabelInputContainer>
                            <Label htmlFor="username" className="flex items-center text-sm font-medium">
                                Username <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <User className="h-4 w-4 text-gray-400" />
                                </div>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="johnsmith"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    onBlur={() => handleBlur('username')}
                                    className={cn(
                                        "pl-10 pr-10",
                                        errors.username && touched.username ? "border-red-300 focus:ring-red-500" :
                                            formData.username && !errors.username ? "border-green-300 focus:ring-green-500" : ""
                                    )}
                                />
                                {touched.username && (
                                    errors.username ? (
                                        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                                    ) : formData.username ? (
                                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                                    ) : null
                                )}
                            </div>
                            {touched.username && errors.username && (
                                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                            )}
                        </LabelInputContainer>
                    </div>

                    {/* Name fields */}
                    <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-5 sm:space-y-0">
                        <LabelInputContainer className="flex-1">
                            <Label htmlFor="firstName" className="flex items-center text-sm font-medium">
                                First name <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <UserCircle className="h-4 w-4 text-gray-400" />
                                </div>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    placeholder="John"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    onBlur={() => handleBlur('firstName')}
                                    className={cn(
                                        "pl-10 pr-10",
                                        errors.firstName && touched.firstName ? "border-red-300 focus:ring-red-500" :
                                            formData.firstName && !errors.firstName ? "border-green-300 focus:ring-green-500" : ""
                                    )}
                                />
                                {touched.firstName && (
                                    errors.firstName ? (
                                        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                                    ) : formData.firstName ? (
                                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                                    ) : null
                                )}
                            </div>
                            {touched.firstName && errors.firstName && (
                                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                            )}
                        </LabelInputContainer>
                        <LabelInputContainer className="flex-1">
                            <Label htmlFor="lastName" className="flex items-center text-sm font-medium">
                                Last name <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Smith"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    onBlur={() => handleBlur('lastName')}
                                    className={cn(
                                        "pr-10",
                                        errors.lastName && touched.lastName ? "border-red-300 focus:ring-red-500" :
                                            formData.lastName && !errors.lastName ? "border-green-300 focus:ring-green-500" : ""
                                    )}
                                />
                                {touched.lastName && (
                                    errors.lastName ? (
                                        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                                    ) : formData.lastName ? (
                                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                                    ) : null
                                )}
                            </div>
                            {touched.lastName && errors.lastName && (
                                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                            )}
                        </LabelInputContainer>
                    </div>

                    {/* Password field with strength indicator */}
                    <LabelInputContainer>
                        <Label htmlFor="password" className="flex items-center text-sm font-medium">
                            Password <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Lock className="h-4 w-4 text-gray-400" />
                            </div>
                            <Input
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleInputChange}
                                onBlur={() => handleBlur('password')}
                                className={cn(
                                    "pl-10 pr-10",
                                    errors.password && touched.password ? "border-red-300 focus:ring-red-500" :
                                        formData.password && !errors.password ? "border-green-300 focus:ring-green-500" : ""
                                )}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        {/* Password strength meter */}
                        {touched.password && formData.password && (
                            <div className="mt-2">
                                <div className="flex space-x-1">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "h-1.5 flex-1 rounded-full transition-all",
                                                i < passwordStrength
                                                    ? passwordStrength === 1
                                                        ? "bg-red-400"
                                                        : passwordStrength === 2
                                                            ? "bg-yellow-400"
                                                            : passwordStrength >= 3
                                                                ? "bg-green-400"
                                                                : "bg-gray-200 dark:bg-gray-700"
                                                    : "bg-gray-200 dark:bg-gray-700"
                                            )}
                                        />
                                    ))}
                                </div>
                                <p className="text-xs mt-1 text-gray-500">
                                    {passwordStrength === 0 && "Use 8+ characters with letters, numbers & symbols"}
                                    {passwordStrength === 1 && "Weak - Add uppercase letters & symbols"}
                                    {passwordStrength === 2 && "Medium - Add more variety"}
                                    {passwordStrength >= 3 && "Strong password"}
                                </p>
                            </div>
                        )}

                        {touched.password && errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </LabelInputContainer>

                    {/* Member Type Selection */}
                    <LabelInputContainer>
                        <Label htmlFor="memberType" className="flex items-center text-sm font-medium">
                            Member Type <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="flex flex-col sm:flex-row gap-3 mt-1">
                            <div
                                className={cn(
                                    "flex-1 relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                                    formData.memberType === "student"
                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                                        : "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
                                )}
                                onClick={() => {
                                    setFormData(prev => ({ ...prev, memberType: "student" }));
                                    setTouched(prev => ({ ...prev, memberType: true }));
                                }}
                            >
                                <GraduationCap size={30} className={formData.memberType === "student" ? "text-blue-500" : "text-gray-400"} />
                                <span className={cn(
                                    "mt-2 font-medium",
                                    formData.memberType === "student" ? "text-blue-700 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                                )}>
                                    Student
                                </span>
                                <input
                                    type="radio"
                                    name="memberType"
                                    value="student"
                                    checked={formData.memberType === "student"}
                                    onChange={handleInputChange}
                                    className="sr-only"
                                />
                                {formData.memberType === "student" && (
                                    <div className="absolute top-2 right-2">
                                        <CheckCircle className="h-5 w-5 text-blue-500" />
                                    </div>
                                )}
                            </div>

                            <div
                                className={cn(
                                    "flex-1 relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                                    formData.memberType === "academic"
                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                                        : "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
                                )}
                                onClick={() => {
                                    setFormData(prev => ({ ...prev, memberType: "academic" }));
                                    setTouched(prev => ({ ...prev, memberType: true }));
                                }}
                            >
                                <Briefcase size={30} className={formData.memberType === "academic" ? "text-blue-500" : "text-gray-400"} />
                                <span className={cn(
                                    "mt-2 font-medium",
                                    formData.memberType === "academic" ? "text-blue-700 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                                )}>
                                    Academic Staff
                                </span>
                                <input
                                    type="radio"
                                    name="memberType"
                                    value="academic"
                                    checked={formData.memberType === "academic"}
                                    onChange={handleInputChange}
                                    className="sr-only"
                                />
                                {formData.memberType === "academic" && (
                                    <div className="absolute top-2 right-2">
                                        <CheckCircle className="h-5 w-5 text-blue-500" />
                                    </div>
                                )}
                            </div>
                        </div>
                        {touched.memberType && !formData.memberType && (
                            <p className="text-red-500 text-xs mt-1">Please select your member type</p>
                        )}
                    </LabelInputContainer>

                    <Button
                        variant="default"
                        className="w-full h-12 rounded-xl text-base font-medium shadow-md hover:shadow-lg transition bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                        type="submit"
                        disabled={loading || !formComplete}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="animate-spin" size={18} />
                                Creating Account...
                            </span>
                        ) : (
                            "Create Account"
                        )}
                    </Button>
                </motion.form>

                {/* Already have account */}
                <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
                    Already have an account?{" "}
                    <Link
                        href="/signin"
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {/* Terms */}
                <p className="text-xs text-gray-500 mt-4 text-center">
                    By signing up, you agree to our{" "}
                    <Link
                        href="/#"
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                        Terms of Service
                    </Link>{" "}
                    &{" "}
                    <Link
                        href="/#"
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
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

export default SignUpForm;
