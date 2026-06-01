"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const SCALE = 6.0;
const END_SCALE = 15.0; // new scale after background turns black

function Logo() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(2.9);
  const [isEnd, setIsEnd] = useState(false);
  const [rotation, setRotation] = useState(0);

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

      const newScale = SCALE - scrollProgress * (SCALE - 1);

      if (scrollProgress < 1) {
        setScale(newScale);
        setRotation(0);
        setIsEnd(false);
      } else {
        setIsEnd(true);

        // rotate anticlockwise and zoom further
        setRotation(-90); // degrees
        setScale(END_SCALE);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex h-screen items-center justify-center overflow-hidden transition-colors duration-500 ${
        isEnd ? "bg-black" : "bg-[#0556fa]"
      }`}
    >
      <Image
        src="/white.png"
        alt="ICORE Logo"
        width={300}
        height={300}
        style={{
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          transformOrigin: "center",
          transition: isEnd
            ? "transform 1s ease-in-out"
            : "transform 0.05s linear",
          willChange: "transform",
        }}
      />
    </div>
  );
}

export default Logo;