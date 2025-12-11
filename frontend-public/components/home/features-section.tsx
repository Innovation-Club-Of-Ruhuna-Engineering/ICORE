"use client"
import { Zap, Users, Lightbulb, TrendingUp, Code2, Rocket, ArrowUpRight } from "lucide-react"

const features = [
  {
    number: "01",
    icon: Zap,
    title: "Collaborate",
    description: "Work across disciplines combining mechanical, electrical, computer, and civil engineering expertise.",
  },
  {
    number: "02",
    icon: Users,
    title: "Partner",
    description:
      "Connect with industry leaders to transform research into real-world applications and business solutions.",
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Create",
    description:
      "Showcase your innovative ideas with multimedia projects featuring videos, images, and detailed documentation.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Accelerate",
    description: "Turn your innovations into business ventures through our shop platform and startup support.",
  },
  {
    number: "05",
    icon: Code2,
    title: "Develop",
    description: "Access technical workshops, mentorship, and resources from experienced professionals.",
  },
  {
    number: "06",
    icon: Rocket,
    title: "Impact",
    description:
      "Develop technologies and frameworks that improve the lives of Sri Lankans and contribute to national growth.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">What We Offer</h2>
          </div>
          <div className="w-16 h-1 bg-primary rounded-full"></div>
        </div>

        {/* Grid for features with numbered cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex gap-4 md:gap-8 group cursor-pointer">
                <div className="flex flex-col items-start flex-shrink-0">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-200 mb-4 md:mb-8">{feature.number}</div>
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-4 md:mb-6 transition-all duration-300"
                    style={{
                      backgroundColor: "#f0f4ff",
                    }}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1 pt-0 md:pt-2">
                  <h3 className="text-lg md:text-2xl font-bold text-foreground mb-2 md:mb-4">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">{feature.description}</p>
                  <button
                    className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full transition-all duration-300 bg-white"
                    style={{
                      border: "1px solid #e5e7eb",
                      color: "#1f2937",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f3f4f6"
                      e.currentTarget.style.color = "#1f2937"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "white"
                    }}
                  >
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
