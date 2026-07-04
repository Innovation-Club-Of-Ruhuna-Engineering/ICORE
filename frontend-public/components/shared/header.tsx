"use client";
import { LogIn } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Menu from "./menu";
import Link from "next/link";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Only show header at the very top
      if (scrollY <= 0) {
        setShowHeader(true);
      } else if (scrollY > 100) {
        setShowHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`h-[64px] md:h-[80px] fixed top-0 left-0 w-full flex items-center justify-center z-50 
        transition-transform duration-300
        ${showHeader ? "translate-y-0" : "-translate-y-full"}
        ${menuOpen ? "bg-transparent" : "bg-white"}`}
      >
        {/* Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-8 h-4 md:w-10 md:h-4 flex flex-col justify-between">
            <span
              className={`block h-[1.5px] transition-all duration-300 origin-center ${
                menuOpen
                  ? "bg-white w-full rotate-45 translate-y-[7px]"
                  : "bg-black w-full group-hover:w-3/4"
              }`}
            />
            <span
              className={`block h-[1.5px] transition-all duration-300 origin-center ${
                menuOpen
                  ? "bg-white w-full -rotate-45 -translate-y-[7px]"
                  : "bg-black w-full group-hover:w-3/4"
              }`}
            />
          </div>

          <span
            className={`hidden md:inline text-sm tracking-wide font-medium transition-colors duration-300 ${
              menuOpen ? "text-white" : "text-black"
            }`}
          >
            Menu
          </span>
        </button>

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="group relative block w-[130px] h-[52px] md:w-[200px] md:h-[80px]"
        >
          {/* Default logo */}
          <Image
            src={menuOpen ? "/text white.png" : "/text black.png"}
            alt="Logo"
            fill
            sizes="(min-width: 768px) 200px, 130px"
            className="object-contain transition-opacity duration-300"
            priority
          />

          {/* Hover logo */}
          {!menuOpen && (
            <Image
              src="/text blue.png"
              alt="Logo Hover"
              fill
              sizes="(min-width: 768px) 200px, 130px"
              className="object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}
        </Link>

        {/* Button */}
        <Link
          href="/signin"
          aria-label="Sign in"
          className="absolute right-3 sm:right-4 bg-[#0556fa] text-white p-3 md:px-6 md:py-4 rounded-sm flex items-center"
        >
          <span className="hidden md:inline">Sign in</span>
          <LogIn className="inline-block md:ml-2 w-5 h-5 md:w-4 md:h-4" />
        </Link>
      </header>

      {/* Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40">
          <Menu onClose={() => setMenuOpen(false)} />
        </div>
      )}
    </>
  );
}

export default Header;