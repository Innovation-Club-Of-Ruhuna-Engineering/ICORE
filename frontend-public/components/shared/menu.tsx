"use client";

// this is a client component
import { useEffect } from "react";
import Link from "next/link";
import { renderCanvas } from "@/components/ui/canvas"

import { Button } from "@/components/ui/button";

function Menu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center bg-black">
      <canvas id="canvas" className="absolute inset-0 h-full" />
      <div className="relative z-10 flex flex-col gap-6 pl-48">
        <Link href="/about" className="text-white text-[72px] font-medium" onClick={onClose}>
          About
        </Link>
        <Link href="/projects" className="text-white text-[72px] font-medium" onClick={onClose}>
          Projects
        </Link>
        <Link href="/news" className="text-white text-[72px] font-medium" onClick={onClose}>
          News
        </Link>
      </div>
    </div>
  )
}

export default Menu
