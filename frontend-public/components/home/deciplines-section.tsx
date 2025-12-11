"use client"

import { Wrench, Zap, Code, Building2 } from "lucide-react"

const disciplines = [
  {
    icon: Wrench,
    title: "Mechanical Engineering",
    description: "Design and manufacture innovative mechanical systems and products.",
  },
  {
    icon: Zap,
    title: "Electrical Engineering",
    description: "Develop advanced electrical systems and information technologies.",
  },
  {
    icon: Code,
    title: "Computer Engineering",
    description: "Create intelligent software solutions and computational innovations.",
  },
  {
    icon: Building2,
    title: "Civil Engineering",
    description: "Build sustainable infrastructure and environmental solutions.",
  },
]

export function DisciplinesSection() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 md:mb-4">Engineering Disciplines</h2>
          <p className="text-base md:text-lg text-muted-foreground">Multidisciplinary collaboration for maximum impact</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {disciplines.map((discipline, index) => {
            const Icon = discipline.icon
            return (
              <div
                key={index}
                className="group p-4 md:p-6 rounded-lg bg-white border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-4 transition-all duration-300"
                  style={{
                    backgroundColor: "#f0f4ff",
                  }}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-foreground mb-2 md:mb-3">{discipline.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{discipline.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
