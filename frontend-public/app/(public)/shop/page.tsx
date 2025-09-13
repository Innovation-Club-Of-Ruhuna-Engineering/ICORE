import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">
              <span className="text-foreground">ICORE</span>{" "}
              <span className="text-primary">Shop</span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Discover exclusive merchandise and innovative products created by the talented members of Innovation Club of Ruhuna Engineering
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                We&apos;re working hard to bring you an amazing shopping experience. Our shop will feature:
              </p>
              <ul className="space-y-2 text-left max-w-md mx-auto">
                <li className="flex items-center space-x-2">
                  <span className="text-primary">•</span>
                  <span>Exclusive ICORE branded merchandise and apparel</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-primary">•</span>
                  <span>Innovative products developed by our talented members</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-primary">•</span>
                  <span>Student projects and prototypes available for purchase</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-primary">•</span>
                  <span>Limited edition engineering-themed collectibles</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground mt-8">
              Stay tuned!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default page