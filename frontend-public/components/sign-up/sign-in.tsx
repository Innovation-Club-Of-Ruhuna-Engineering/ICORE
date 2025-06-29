"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuth } from "@/contexts/userAuthContext";
import toast from "react-hot-toast";

const SignInForm = () => {
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await login(formData.email, formData.password);
      toast.success("Login successful!");
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-white p-4 md:p-6 dark:bg-black">
      <form className="my-0" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <button
          className="w-full px-8 py-2 rounded-md bg-icoreBlue text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-icoreBlue"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
          <BottomGradient />
        </button>
      </form>
      <p className="text-[12px] text-gray-500 mt-2 text-center">
        By signing up, you agree to our{" "}
        <Link href="/#" className="text-icoreBlue font-bold">
          Terms of Service
        </Link>{" "}
        &{" "}
        <Link href="/#" className="text-icoreBlue font-bold">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

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

export default SignInForm;