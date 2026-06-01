"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function Logo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(2.9);
  const [rotate, setRotate] = useState(-90);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const { top, height } = container.getBoundingClientRect();
      const middle = top + height / 2;
      const viewportMiddle = window.innerHeight / 2;

      const scrollProgress = Math.min(
        Math.max(1 - (middle - viewportMiddle) / (height / 2), 0),
        1
      );

      const newScale = 2.9 - scrollProgress * (2.9 - 1);
      const newRotate = 0 - scrollProgress * 90;

      setScale(newScale);
      setRotate(newRotate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-screen items-center justify-center bg-[#0556fa] overflow-hidden"
    >
      <Image
        src="/white.png"
        alt="ICORE Logo"
        width={600}
        height={600}
        style={{
          transform: `scale(${scale}) rotate(${rotate}deg)`,
          transformOrigin: "center",
          transition: "transform 0.05s linear",
          willChange: "transform",
        }}
      />
    </div>
  );
}

export default Logo;