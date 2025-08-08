"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import navItems from "@/constants/shared";
import { useState } from "react";

const Header = () => {

export function Navigation() {
  const router = useRouter();
  const handleButtonCLick = () => {
    // Handle button click logic here
    router.push('/sign-up'); // Example: Navigate to the join page
  };
  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="primary" href="/sign-up">Get Started</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-black dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Get Started
              </NavbarButton>
            </div>
            <span className="text-xl font-bold text-gray-900">ICORE</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#projects" className="text-gray-600 hover:text-blue-600 transition-colors">
              Projects
            </a>
            <a href="#join" className="text-gray-600 hover:text-blue-600 transition-colors">
              Join Us
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleButtonCLick}>Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
