import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

export function FeaturedProjects() {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Featured Projects</h2>
          <p className="text-xl text-gray-600">Discover the innovative projects created by our talented members</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600"></div>
            <CardHeader>
              <div className="flex gap-2 mb-2">
                <Badge variant="secondary">IoT</Badge>
                <Badge variant="secondary">Arduino</Badge>
              </div>
              <CardTitle>Smart Campus Monitoring</CardTitle>
              <CardDescription>
                An IoT-based system for monitoring environmental conditions across campus facilities in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                View More <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600"></div>
            <CardHeader>
              <div className="flex gap-2 mb-2">
                <Badge variant="secondary">Web</Badge>
                <Badge variant="secondary">React</Badge>
              </div>
              <CardTitle>Student Project Hub</CardTitle>
              <CardDescription>
                A collaborative platform for students to showcase projects, find teammates, and share resources.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                View More <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600"></div>
            <CardHeader>
              <div className="flex gap-2 mb-2">
                <Badge variant="secondary">AI/ML</Badge>
                <Badge variant="secondary">Python</Badge>
              </div>
              <CardTitle>Predictive Maintenance System</CardTitle>
              <CardDescription>
                Machine learning solution for predicting equipment failures in industrial settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                View More <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}