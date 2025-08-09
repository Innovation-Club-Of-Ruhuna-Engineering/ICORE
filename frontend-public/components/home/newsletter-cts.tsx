import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "lucide-react"

export function NewsletterCTA() {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <Calendar className="w-16 h-16 text-blue-200 mx-auto mb-6" />
        <h2 className="text-4xl font-bold text-white mb-6">Stay Updated</h2>
        <p className="text-xl text-blue-100 mb-8">
          Get the latest updates on events, workshops, and project opportunities
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
          />
          <Button className="bg-white text-blue-600 hover:bg-gray-100">Subscribe</Button>
        </div>

        <p className="text-sm text-blue-200 mt-4">Join 500+ students already subscribed to our newsletter</p>
      </div>
    </section>
  )
}