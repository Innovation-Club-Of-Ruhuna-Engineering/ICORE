export function TechStack() {
  const technologies = [
    { name: "React", color: "text-blue-500" },
    { name: "Python", color: "text-yellow-500" },
    { name: "Node.js", color: "text-green-500" },
    { name: "Arduino", color: "text-teal-500" },
    { name: "TensorFlow", color: "text-orange-500" },
    { name: "Docker", color: "text-blue-600" },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Technologies We Use</h2>
          <p className="text-xl text-gray-600">
            Our members work with cutting-edge technologies across various domains
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {technologies.map((tech, index) => (
            <div key={index} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div
                className={`w-16 h-16 ${tech.color} bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3`}
              >
                <span className="text-2xl font-bold">{tech.name.charAt(0)}</span>
              </div>
              <p className="text-sm font-medium text-gray-700">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}