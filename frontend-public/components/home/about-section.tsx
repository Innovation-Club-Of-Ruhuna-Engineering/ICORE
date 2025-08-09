import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Users, Target } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About ICORE</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The Innovation Club of Ruhuna Engineering is a dynamic community of students passionate about pushing the
            boundaries of technology and engineering. We foster a culture of creativity, collaboration, and engineering
            excellence through hands-on projects and innovative solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Encouraging creative thinking and breakthrough solutions to real-world engineering challenges.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Building a supportive community where students learn from each other and work together.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Engineering Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Maintaining high standards in design, development, and implementation of technical projects.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}