"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is standard tablet breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return // Don't add mouse events on mobile
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const dots = heroRef.current.querySelectorAll(".dot")
        dots.forEach((dot: Element) => {
          const dotElement = dot as HTMLElement
          const dotRect = dotElement.getBoundingClientRect()
          const dotX = dotRect.left + dotRect.width / 2 - rect.left
          const dotY = dotRect.top + dotRect.height / 2 - rect.top

          const distance = Math.sqrt((x - dotX) ** 2 + (y - dotY) ** 2)

          const isDark = document.documentElement.classList.contains('dark')
          if (distance < 100) {
            dotElement.style.backgroundColor = isDark ? "#ffffff" : "#000000"
            const scale = 1.2 - distance / 100
            dotElement.style.transform = `scale(${scale})`
            // Add wiggle animation only when dots are very close
            if (distance < 50) {
              dotElement.style.animation = "dot-wiggle 0.5s ease-in-out infinite"
            } else {
              dotElement.style.animation = "none"
            }
          } else {
            dotElement.style.backgroundColor = isDark ? "#3b82f6" : "#93c5fd"
            dotElement.style.transform = "scale(1)"
            dotElement.style.animation = "none"
          }
        })
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (heroRef.current && !isMobile) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const dots = heroRef.current.querySelectorAll(".dot")
        dots.forEach((dot: Element) => {
          const dotElement = dot as HTMLElement
          const dotRect = dotElement.getBoundingClientRect()
          const dotX = dotRect.left + dotRect.width / 2 - rect.left
          const dotY = dotRect.top + dotRect.height / 2 - rect.top

          const distance = Math.sqrt((x - dotX) ** 2 + (y - dotY) ** 2)
          const maxDistance = 200

          if (distance < maxDistance) {
            const delay = (distance / maxDistance) * 500
            const intensity = 1 - distance / maxDistance

            setTimeout(() => {
              dotElement.style.transform = `scale(${1 + intensity * 0.8}) translate(${(dotX - x) * intensity * 0.1}px, ${(dotY - y) * intensity * 0.1}px)`
              const isDark = document.documentElement.classList.contains('dark')
              dotElement.style.backgroundColor = isDark ? "#60a5fa" : "#1d4ed8"

              setTimeout(() => {
                dotElement.style.transform = "scale(1) translate(0, 0)"
                dotElement.style.backgroundColor = isDark ? "#3b82f6" : "#93c5fd"
              }, 300)
            }, delay)
          }
        })
      }
    }

    const heroElement = heroRef.current
    if (heroElement && !isMobile) {
      heroElement.addEventListener("mousemove", handleMouseMove)
      heroElement.addEventListener("click", handleClick)
      return () => {
        heroElement.removeEventListener("mousemove", handleMouseMove)
        heroElement.removeEventListener("click", handleClick)
      }
    }
  }, [isMobile])

  return (
    <section ref={heroRef} className="relative min-h-screen bg-background overflow-hidden" id="home">
      {!isMobile && (
        <div className="absolute inset-0 opacity-60 hidden md:block">
          {Array.from({ length: 800 }).map((_, i) => (
            <div
              key={i}
              className="dot absolute w-1 h-1 rounded-full transition-all duration-300 ease-out"
              style={{
                left: `${(i % 40) * 2.5}%`,
                top: `${Math.floor(i / 40) * 5}%`,
                backgroundColor: "var(--dot-color, #93c5fd)",
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-40 md:py-48 lg:py-56">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
              <span className="text-foreground">Innovation Club of </span>
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Ruhuna Engineering</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              The Innovation Club of Ruhuna Engineering empowers students to explore creativity, develop technologies,
              and build solutions that make an impact.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button size="lg" className="px-8 py-3 text-base font-semibold">
              Explore Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-base font-semibold bg-white">
              Join ICORE
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
