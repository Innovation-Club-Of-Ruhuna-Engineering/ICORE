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
    <div className="flex h-full items-center justify-center bg-black">
      <canvas id="canvas" className="absolute inset-0" />
      Hello
    </div>
  )
}

export default Menu
