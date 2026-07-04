'use client';
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
        className={`h-[80px] fixed top-0 left-0 w-full flex items-center justify-center z-50 
        transition-transform duration-300
        ${showHeader ? "translate-y-0" : "-translate-y-full"}
        ${menuOpen ? "bg-transparent" : "bg-white"}`}
      >
        {/* Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-10 h-4 flex flex-col justify-between">
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
            className={`text-sm tracking-wide font-medium transition-colors duration-300 ${
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
          className="group relative block w-[200px] h-[80px]"
        >
          {/* Default logo */}
          <Image
            src={menuOpen ? "/text white.png" : "/text black.png"}
            alt="Logo"
            fill
            className={`object-contain transition-opacity duration-300 ${
              menuOpen ? "opacity-100" : "opacity-100"
            }`}
          />

          {/* Hover logo */}
          {!menuOpen && (
            <Image
              src="/text blue.png"
              alt="Logo Hover"
              fill
              className="object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}
        </Link>

        {/* Button */}
        <Link
          href="/signin"
          className="absolute right-4 bg-[#0556fa] text-white px-6 py-4 rounded-sm"
        >
          Sign in
          <LogIn className="inline-block ml-2" />
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