"use client"

export default function BlogPage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">
              <span className="text-foreground">Innovation</span> <span className="text-primary">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Stay updated with the latest news, achievements, and innovations from the Innovation Club of Ruhuna
              Engineering
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-7xl text-center">
        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">Coming Soon</h2>
        <p className="text-muted-foreground text-lg">
          This page will soon feature a searchable and filterable list of blog articles. Stay tuned!
        </p>
      </div>
    </div>
  )
}