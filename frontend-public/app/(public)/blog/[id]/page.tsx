"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

// Mock blog data - will be replaced with Strapi data
const mockBlogData = {
  1: {
    id: 1,
    title: "Revolutionary IoT Project Wins National Competition",
    content: `
      <p>Our team's innovative IoT solution for smart agriculture has been recognized at the national level, showcasing the incredible potential of engineering innovation at the University of Ruhuna.</p>
      
      <h2>The Challenge</h2>
      <p>Traditional farming methods often struggle with efficient resource management, leading to water waste and suboptimal crop yields. Our team identified this as a critical problem that could be solved through smart technology integration.</p>
      
      <h2>Our Solution</h2>
      <p>We developed a comprehensive IoT system that monitors soil moisture, temperature, humidity, and light levels in real-time. The system uses machine learning algorithms to predict optimal watering schedules and nutrient delivery.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li>Real-time environmental monitoring</li>
        <li>Automated irrigation control</li>
        <li>Mobile app for remote monitoring</li>
        <li>Data analytics dashboard</li>
        <li>Weather integration for predictive analysis</li>
      </ul>
      
      <h2>Impact and Results</h2>
      <p>During our testing phase, the system demonstrated a 40% reduction in water usage while increasing crop yield by 25%. These results caught the attention of the national competition judges and agricultural experts.</p>
      
      <h2>Future Development</h2>
      <p>We're now working on scaling the solution for commercial use and exploring partnerships with local farmers to implement the system across multiple agricultural sites in the Southern Province.</p>
    `,
    category: "achievements",
    author: {
      name: "Dr. Samantha Silva",
      avatar: "/diverse-professor-lecturing.png",
      role: "Faculty Advisor",
      bio: "Dr. Silva is a leading researcher in IoT applications and sustainable technology. She has published over 50 papers in international journals.",
      social: {
        email: "samantha.silva@ruh.ac.lk",
        linkedin: "https://linkedin.com/in/samanthasilva",
        researchgate: "https://researchgate.net/profile/samantha-silva",
      },
    },
    image: "/iot-project.png",
    publishedAt: "2024-01-15",
    readTime: "5 min read",
    tags: ["IoT", "Agriculture", "Machine Learning", "Sustainability"],
    resources: [
      {
        title: "Project Documentation",
        url: "#",
        type: "PDF",
      },
      {
        title: "Source Code Repository",
        url: "#",
        type: "GitHub",
      },
      {
        title: "Research Paper",
        url: "#",
        type: "PDF",
      },
      {
        title: "Demo Video",
        url: "#",
        type: "Video",
      },
    ],
  },
  2: {
    id: 2,
    title: "New Research Lab Opens for AI Development",
    content: `
      <p>The Faculty of Engineering at the University of Ruhuna is proud to announce the opening of our state-of-the-art Artificial Intelligence Research Laboratory, equipped with cutting-edge technology and resources for advanced student projects and research initiatives.</p>
      
      <h2>World-Class Facilities</h2>
      <p>The new AI lab features high-performance computing clusters, GPU workstations, and specialized hardware for machine learning research. Students now have access to the same tools used by leading tech companies and research institutions worldwide.</p>
      
      <h3>Equipment Highlights:</h3>
      <ul>
        <li>NVIDIA A100 GPU clusters for deep learning</li>
        <li>High-memory workstations for data processing</li>
        <li>Specialized hardware for computer vision projects</li>
        <li>Cloud computing resources and partnerships</li>
        <li>Collaborative workspace for team projects</li>
      </ul>
      
      <h2>Research Opportunities</h2>
      <p>The lab will support research in various AI domains including natural language processing, computer vision, robotics, and machine learning applications in engineering.</p>
      
      <h2>Student Access</h2>
      <p>All engineering students will have access to the lab through scheduled sessions and project-based reservations. Special training programs will be conducted to help students maximize the use of available resources.</p>
    `,
    category: "news",
    author: {
      name: "Prof. Rajesh Kumar",
      avatar: "/professor-male.png",
      role: "Department Head",
      bio: "Prof. Kumar leads the Computer Engineering department and has extensive experience in AI research and education.",
      social: {
        email: "rajesh.kumar@ruh.ac.lk",
        linkedin: "https://linkedin.com/in/rajeshkumar",
        researchgate: "https://researchgate.net/profile/rajesh-kumar",
      },
    },
    image: "/ai-lab.png",
    publishedAt: "2024-01-12",
    readTime: "3 min read",
    tags: ["AI", "Research", "Laboratory", "Education"],
    resources: [
      {
        title: "Lab Access Guidelines",
        url: "#",
        type: "PDF",
      },
      {
        title: "Equipment Specifications",
        url: "#",
        type: "PDF",
      },
      {
        title: "Training Schedule",
        url: "#",
        type: "Link",
      },
    ],
  },
}

const categoryColors = {
  news: "bg-blue-100 text-blue-800",
  achievements: "bg-green-100 text-green-800",
  products: "bg-purple-100 text-purple-800",
  projects: "bg-orange-100 text-orange-800",
}

export default function BlogPostPage() {
  const params = useParams()
  interface Blog {
  id: number
  title: string
  content: string
  category: keyof typeof categoryColors
  author: {
    name: string
    avatar: string
    role: string
    bio: string
    social: {
      email: string
      linkedin: string
      researchgate: string
    }
  }
  image: string
  publishedAt: string
  readTime: string
  tags: string[]
  resources: {
    title: string
    url: string
    type: string
  }[]
}

const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call - replace with actual Strapi API call
    const blogId = parseInt(params.id as string)
    // Type assertion to 1 | 2 since we know these are the only valid IDs
    const blogData = mockBlogData[blogId as 1 | 2]

    setTimeout(() => {
      setBlog(blogData as Blog || null)
      setLoading(false)
    }, 500)
  }, [params.id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
                            <p className="text-muted-foreground mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image src={blog.image || "/placeholder.svg"} alt={blog.title} className="object-cover" fill priority />
        <div className="absolute inset-0 bg-black/20" />
        <Badge className={`absolute top-6 left-6 ${categoryColors[blog.category]}`}>
          {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
        </Badge>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-6">{blog.title}</h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(blog.publishedAt)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {blog.readTime}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />

            {/* Resources Section */}
            {blog.resources && blog.resources.length > 0 && (
              <div className="mt-12 p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Resources &amp; Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {blog.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      className="flex items-center gap-3 p-3 bg-background rounded-md hover:bg-muted transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-medium text-sm">{resource.title}</p>
                        <p className="text-xs text-muted-foreground">{resource.type}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Author Info */}
              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-4">About the Author</h3>
                <div className="flex items-start gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={blog.author.avatar || "/placeholder.svg"} alt={blog.author.name} />
                    <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{blog.author.name}</h4>
                    <p className="text-sm text-muted-foreground">{blog.author.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{blog.author.bio}</p>

                {/* Social Links */}
                <div className="space-y-2">
                  {blog.author.social.email && (
                    <a
                      href={`mailto:${blog.author.social.email}`}
                      className="block text-sm text-primary hover:underline"
                    >
                      Email
                    </a>
                  )}
                  {blog.author.social.linkedin && (
                    <a
                      href={blog.author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                  {blog.author.social.researchgate && (
                    <a
                      href={blog.author.social.researchgate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline"
                    >
                      ResearchGate
                    </a>
                  )}
                </div>
              </div>

              {/* Related Articles */}
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Related Articles</h3>
                <div className="space-y-3">
                  <Link href="/blog/2" className="block group">
                    <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                      New Research Lab Opens for AI Development
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">3 min read</p>
                  </Link>
                  <Separator />
                  <Link href="/blog/3" className="block group">
                    <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                      Smart Home Automation System
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">4 min read</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
