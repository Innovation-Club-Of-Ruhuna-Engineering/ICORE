"use client"

import { useEffect, useRef, useState } from "react"

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is standard tablet breakpoint
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
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

          const isDark = document.documentElement.classList.contains("dark")
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
              dotElement.style.transform = `scale(${1 + intensity * 0.8}) translate(${
                (dotX - x) * intensity * 0.1
              }px, ${(dotY - y) * intensity * 0.1}px)`
              const isDark = document.documentElement.classList.contains("dark")
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
    <div>
      {/* <section ref={heroRef} id="home"> */}
      {/* {!isMobile && (
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
      )} */}
      <div className="flex min-h-[70vh] md:h-[85vh] items-center justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-0">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[120px] font-medium text-center leading-tight animated-gradient-text">
          <span className="block">INNOVATION CLUB of</span>
          <span className="block">Ruhuna Engineering</span>
        </h1>
      </div>
    </div>
  )
}

export default Hero