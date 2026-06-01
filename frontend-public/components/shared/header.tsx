'use client';
import { LogIn } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Menu from "./menu";
import Link from "next/link";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`h-[80px] fixed top-0 left-0 w-full flex items-center justify-center z-50 transition-colors duration-300 ${
          menuOpen ? "bg-transparent" : "bg-white"
        }`}
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
        <Link href="/">
          <Image
            src={menuOpen ? "/text white.png" : "/text black.png"}
            alt="Logo"
            height={80}
            width={200}
            className="my-4"
            onClick={() => setMenuOpen(false)}
          />
        </Link>

        {/* Button */}
        <Link href="/signin" className="absolute right-4 bg-[#0556fa] text-white px-6 py-4">
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