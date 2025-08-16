"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    image: "/ai-analytics-dashboard.png",
    title: "AI-Powered Analytics",
    subtitle: "Advanced Data Intelligence",
    description: "Harness the power of machine learning to derive actionable insights from your data.",
  },
  {
    id: 2,
    image: "/ai-analytics-dashboard.png",
    title: "Cloud-Native Architecture",
    subtitle: "Scalable Infrastructure",
    description: "Scalable, resilient, and efficient solutions built for the modern cloud ecosystem.",
  },
  {
    id: 3,
    image: "/ai-analytics-dashboard.png",
    title: "Enterprise-Grade Security",
    subtitle: "Advanced Protection",
    description: "State-of-the-art security measures to protect your most valuable assets.",
  },
  {
    id: 4,
    image: "/ai-analytics-dashboard.png",
    title: "High-Performance Systems",
    subtitle: "Optimized Solutions",
    description: "Optimized for speed and efficiency, our solutions deliver unparalleled performance.",
  },
  {
    id: 5,
    image: "/ai-analytics-dashboard.png",
    title: "Mobile Innovation",
    subtitle: "Cross-Platform Apps",
    description: "Cutting-edge mobile applications that work seamlessly across all devices.",
  },
  {
    id: 6,
    image: "/ai-analytics-dashboard.png",
    title: "Blockchain Solutions",
    subtitle: "Decentralized Systems",
    description: "Revolutionary blockchain technology for transparent and secure transactions.",
  },
]

export default function Features() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const itemsPerSlide = 2
  const maxIndex = Math.ceil(projects.length / itemsPerSlide) - 1

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 4000) // 4 seconds

    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying, maxIndex])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const getTranslateX = () => {
    return `translateX(-${currentIndex * 100}%)`
  }

  return (
    <section className="py-24 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing projects done by ICORE members
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: getTranslateX() }}>
              {Array.from({ length: maxIndex + 1 }).map((_, slideIndex) => {
                const startIndex = slideIndex * itemsPerSlide
                const slideProjects = projects.slice(startIndex, startIndex + itemsPerSlide)

                return (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2 gap-8 px-2">
                      {slideProjects.map((project) => (
                        <Card key={project.id} className="group hover:shadow-lg transition-shadow duration-300">
                          <CardContent className="p-0">
                            <div className="relative overflow-hidden rounded-t-lg">
                              <Image
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                width={300}
                                height={200}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-6">
                              <div className="mb-2">
                                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                                <p className="text-sm text-blue-600 font-medium">{project.subtitle}</p>
                              </div>
                              <p className="text-muted-foreground">{project.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-blue-600" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
