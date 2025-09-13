import { Button } from "@/components/ui/button"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">
                <span className="text-foreground">Innovation</span>{" "}
                <span className="text-primary">Projects</span>
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl">
                Discover groundbreaking projects from the Innovation Club of Ruhuna Engineering
              </p>
            </div>
            <Button size="lg" className="shadow-lg">
              New Project
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-7xl text-center">
        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">Coming Soon</h2>
        <p className="text-muted-foreground text-lg">
          This page will soon feature a searchable and filterable list of projects. Stay tuned!
        </p>
      </div>
    </div>
  )
}
