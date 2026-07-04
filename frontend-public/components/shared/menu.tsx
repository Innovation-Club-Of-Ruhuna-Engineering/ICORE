"use client";

import { useEffect } from "react";
import Link from "next/link";
import { renderCanvas } from "@/components/ui/canvas";

function Menu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    // Only render canvas on large screens
    if (window.innerWidth >= 1024) {
      renderCanvas();
    }
  }, []);

  return (
    <div className="fixed inset-0 flex items-center bg-black">
      {/* Canvas only on lg+ */}
      <canvas
        id="canvas"
        className="absolute inset-0 hidden h-full lg:block"
      />

      <div
        className="
          relative z-10
          flex flex-col
          gap-4 sm:gap-5 lg:gap-6
          px-8 sm:px-12 md:px-16 lg:pl-48
        "
      >
        <Link
          href="/about"
          onClick={onClose}
          className="
            text-white font-medium
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-[72px]
          "
        >
          About
        </Link>

        <Link
          href="/projects"
          onClick={onClose}
          className="
            text-white font-medium
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-[72px]
          "
        >
          Projects
        </Link>

        <Link
          href="/news"
          onClick={onClose}
          className="
            text-white font-medium
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-[72px]
          "
        >
          News
        </Link>
      </div>
    </div>
  );
}

export default Menu;