"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/userAuthContext";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Eye, EyeOff, Loader2, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";

const SignInForm = () => {
  const { login, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [formComplete, setFormComplete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

    // Password validation
    if (touched.password) {
      if (!formData.password) {
        setErrors(prev => ({ ...prev, password: "Password is required" }));
      } else if (formData.password.length < 8) {
        setErrors(prev => ({ ...prev, password: "Password must be at least 8 characters" }));
      } else {
        setErrors(prev => ({ ...prev, password: "" }));
      }
    }

    // Check if form is complete and valid
    const isComplete =
      formData.email !== "" &&
      formData.password !== "" &&
      !errors.email &&
      !errors.password;

    setFormComplete(isComplete);
  }, [formData, touched, errors.email, errors.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched to trigger validation
    setTouched({
      email: true,
      password: true,
    });

    if (!formComplete) {
      toast.error("Please fill in all fields correctly");
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl shadow-2xl bg-white dark:bg-gray-950 p-8 relative border border-gray-100 dark:border-gray-800"
      >
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-200 dark:bg-blue-900/30 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-green-200 dark:bg-green-900/30 rounded-full opacity-40 blur-xl"></div>

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
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sign in to continue to your account
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
                placeholder="you@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                disabled={loading || authLoading}
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

          {/* Password field */}
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
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                disabled={loading || authLoading}
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
            {touched.password && errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </LabelInputContainer>

          {/* Forgot password */}
          <div className="flex justify-end text-sm">
            <Link
              href="/forgot-password"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            variant="default"
            className="w-full h-12 rounded-xl text-base font-medium shadow-md hover:shadow-lg transition bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            type="submit"
            disabled={loading || authLoading || !formComplete}
          >
            {loading || authLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </motion.form>

        {/* Register link */}
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Terms & Privacy */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          By signing in, you agree to our{" "}
          <Link href="/#" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Terms of Service
          </Link>{" "}
          &{" "}
          <Link href="/#" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
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

export default SignInForm;
