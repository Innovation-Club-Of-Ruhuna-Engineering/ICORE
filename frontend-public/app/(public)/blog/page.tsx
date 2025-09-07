"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BlogCard } from "@/components/blog/blog-card"

const blogCategories = [
  { id: "all", name: "All", count: 24 },
  { id: "news", name: "News", count: 8 },
  { id: "achievements", name: "Achievements", count: 6 },
  { id: "products", name: "Products", count: 4 },
  { id: "projects", name: "Projects", count: 6 },
]

// Mock blog data - will be replaced with Strapi data
const mockBlogs = [
  {
    id: 1,
    title: "Revolutionary IoT Project Wins National Competition",
    excerpt:
      "Our team's innovative IoT solution for smart agriculture has been recognized at the national level, showcasing the potential of engineering innovation.",
    category: "achievements",
    author: {
      name: "Dr. Samantha Silva",
      avatar: "/diverse-professor-lecturing.png",
      role: "Faculty Advisor",
    },
    image: "/blog/iot-project.webp",
    publishedAt: "2024-01-15",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "New Research Lab Opens for AI Development",
    excerpt:
      "The faculty announces the opening of a state-of-the-art AI research laboratory equipped with the latest technology for student projects.",
    category: "news",
    author: {
      name: "Prof. Rajesh Kumar",
      avatar: "/professor-male.png",
      role: "Department Head",
    },
    image: "/blog/ai-lab.png",
    publishedAt: "2024-01-12",
    readTime: "3 min read",
  },
  {
    id: 3,
    title: "Smart Home Automation System - Product Spotlight",
    excerpt:
      "This week's featured product showcases an innovative home automation system developed by our final-year students.",
    category: "products",
    author: {
      name: "Amal Perera",
      avatar: "/diverse-students-studying.png",
      role: "Final Year Student",
    },
    image: "/blog/smart-home.webp",
    publishedAt: "2024-01-10",
    readTime: "4 min read",
  },
  {
    id: 4,
    title: "Sustainable Energy Project: Solar Panel Optimization",
    excerpt:
      "A comprehensive look at how our engineering team developed an AI-powered solar panel optimization system for maximum efficiency.",
    category: "projects",
    author: {
      name: "Nimal Fernando",
      avatar: "/diverse-engineers-meeting.png",
      role: "Research Assistant",
    },
    image: "/blog/solar-panel.jpg",
    publishedAt: "2024-01-08",
    readTime: "6 min read",
  },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredBlogs, setFilteredBlogs] = useState(mockBlogs)

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    filterBlogs(categoryId, searchQuery)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    filterBlogs(selectedCategory, query)
  }

  const filterBlogs = (category: string, search: string) => {
    let filtered = mockBlogs

    if (category !== "all") {
      filtered = filtered.filter((blog) => blog.category === category)
    }

    if (search) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(search.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(search.toLowerCase()),
      )
    }

    setFilteredBlogs(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
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

      {/* Search and Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(category.id)}
                  className="text-sm"
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-70">({category.count})</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("all")
                  setSearchQuery("")
                  setFilteredBlogs(mockBlogs)
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
