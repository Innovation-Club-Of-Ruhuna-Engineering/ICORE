"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { ButtonM } from "@/components/shared/button";

const Hero = () => {
  return (
    <div className="h-120 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center space-y-4">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
     <h1 className={cn("md:text-5xl text-4xl text-white relative z-20 text-center")}>
        Innovation Club of Ruhuna Engineering
      </h1>

      <ButtonM  />      
    </div>
  );
}

export default Hero;