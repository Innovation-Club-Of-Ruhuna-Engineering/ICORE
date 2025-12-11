"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { label: "Members", value: 48, suffix: "+" },
  { label: "Projects", value: 11, suffix: "+" },
  { label: "Partnerships", value: 1, suffix: "+" },
  { label: "Success Rate", value: 99, suffix: "%" },
]

export function StatsSection() {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        setHasStarted(true)
      }
    })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const intervals: NodeJS.Timeout[] = []

    stats.forEach((stat, index) => {
      let current = 0
      const increment = stat.value / 50

      const interval = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(interval)
        }
        setCounts((prev) => ({
          ...prev,
          [index]: Math.floor(current),
        }))
      }, 30)

      intervals.push(interval)
    })

    return () => intervals.forEach((int) => clearInterval(int))
  }, [hasStarted])

  return (
    <section ref={sectionRef} className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 md:p-8 rounded-lg bg-gray-50 border border-gray-200 hover:border-primary transition-all duration-300 text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-1 md:mb-2">
                {counts[index] || 0}
                <span className="text-xl sm:text-2xl md:text-3xl ml-1">{stat.suffix}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
