"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 96; // set to your actual frame count
const FRAMES_DIR = "/ai";

const frameSrc = (index: number) =>
  `${FRAMES_DIR}/frame_${String(index).padStart(4, "0")}.jpg`;

function AI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    let loadedCount = 0;
    // Array index 0 = frame_0001, index 1 = frame_0002, etc.
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));

        if (loadedCount === 1 && canvasRef.current) {
          canvasRef.current.width = img.naturalWidth;
          canvasRef.current.height = img.naturalHeight;
          drawFrame(0);
        }
        if (loadedCount === TOTAL_FRAMES) setLoaded(true);
      };
      img.onerror = () => {
        // Don't crash on a missing frame — just count it as done
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) setLoaded(true);
      };
      img.src = frameSrc(i + 1); // files are 1-based: frame_0001, frame_0002 …
      images[i] = img;
    }

    imagesRef.current = images;
  }, [drawFrame]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const { top, height } = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max(-top / (height - windowHeight), 0), 1);
      const frameIndex = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  return (
    <div ref={containerRef} style={{ height: `${(TOTAL_FRAMES / 30) * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full object-contain" />

        {/* OVERLAY TEXT */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <h1 className="text-white text-6xl md:text-8xl font-bold tracking-tight text-center">
            Artificial Intelligence and Data Engineering
            </h1>
        </div>

        {/* LOADING UI stays above everything */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white gap-4 z-20">
            <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-150 rounded-full"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="text-sm tabular-nums tracking-widest opacity-60">
              {loadProgress}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AI;