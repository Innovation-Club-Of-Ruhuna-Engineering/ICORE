"use client";
import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <BackgroundLines className="min-h-screen flex items-center justify-center w-full overflow-hidden bg-black dark:bg-black">
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Innovation Club of Ruhuna Engineering
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Where creativity meets engineering excellence. Join a community of innovators, builders, and dreamers shaping
          the future of technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3B82F6_0%,#1E40AF_50%,#3B82F6_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-lg font-medium text-white backdrop-blur-3xl">
              View Projects <ArrowRight className="ml-2 w-5 h-5" />
            </span>
          </button>
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] bg-transparent" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full border border-white bg-transparent px-8 py-1 text-lg font-medium text-white backdrop-blur-3xl hover:bg-white hover:text-gray-900 transition-colors">
              Join the Club
            </span>
          </button>
        </div>
      </div>
    </BackgroundLines>
  );
}

export default Hero;