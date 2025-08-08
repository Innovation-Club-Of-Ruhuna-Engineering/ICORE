import { Card, CardContent } from "@/components/ui/card"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "ICORE gave me the platform to turn my ideas into reality. The collaborative environment and mentorship helped me grow both technically and personally.",
      name: "Amara Silva",
      role: "Computer Engineering, 2023",
      initials: "AS",
      color: "bg-blue-500",
    },
    {
      quote:
        "The projects I worked on at ICORE directly contributed to landing my dream internship. The hands-on experience is invaluable.",
      name: "Ravindu Perera",
      role: "Electronic Engineering, 2024",
      initials: "RP",
      color: "bg-green-500",
    },
    {
      quote:
        "ICORE is more than a club - it's a family of innovators. The friendships and professional networks I built here are priceless.",
      name: "Nishani Fernando",
      role: "Mechanical Engineering, 2022",
      initials: "NF",
      color: "bg-purple-500",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Members Say</h2>
          <p className="text-xl text-gray-600">Hear from students who have been part of our innovation journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center mr-4`}>
                    <span className="text-white font-semibold">{testimonial.initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
