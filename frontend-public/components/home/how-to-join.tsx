import { Button } from "@/components/ui/button"
import { UserPlus, Wrench, HandHeart, ArrowRight } from "lucide-react"

export function HowToJoin() {
  return (
    <section id="join" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">How to Join</h2>
          <p className="text-xl text-gray-600">
            Ready to be part of our innovation community? Here&apos;s how to get started
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Sign Up</h3>
            <p className="text-gray-600">
              Register your interest and complete our simple application form to join the community.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wrench className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Build</h3>
            <p className="text-gray-600">
              Start working on projects, attend workshops, and develop your technical skills with guidance.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <HandHeart className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Collaborate</h3>
            <p className="text-gray-600">
              Connect with like-minded peers, share knowledge, and work together on innovative solutions.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
            Apply Now <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
