"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const SCALE = 6.0;
const END_SCALE = 15.0;

function Logo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(2.9);
  const [isEnd, setIsEnd] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let fadeTimer: ReturnType<typeof setTimeout> | null = null;

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
        // Clear any pending fade if user scrolls back up
        if (fadeTimer) {
          clearTimeout(fadeTimer);
          fadeTimer = null;
        }
        setScale(newScale);
        setRotation(0);
        setIsEnd(false);
        setFadeOut(false);
      } else {
        setIsEnd(true);
        setRotation(-90);
        setScale(END_SCALE);
        // Only start the timer if not already fading
        if (!fadeTimer) {
          // Lock scroll during scale-up
          document.body.style.overflow = "hidden";

          fadeTimer = setTimeout(() => {
            document.body.style.overflow = "";
            setFadeOut(true);
          }, 1000);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (fadeTimer) clearTimeout(fadeTimer);
      document.body.style.overflow = ""; // restore if unmounted early
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen items-center justify-center overflow-hidden"
      style={{
        zIndex: 10,
        backgroundImage: isEnd
          ? "none"
          : "url('/cgpt.png')", // Place image in /public
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: isEnd ? "#000000" : "transparent",
        opacity: fadeOut ? 0 : 1,
        transition: fadeOut
          ? "opacity 0.8s ease-in-out, background-color 0.5s"
          : "background-color 0.5s",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
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