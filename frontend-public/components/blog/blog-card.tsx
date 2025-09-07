import { Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"

interface BlogCardProps {
  blog: {
    id: number
    title: string
    excerpt: string
    category: string
    author: {
      name: string
      avatar: string
      role: string
    }
    image: string
    publishedAt: string
    readTime: string
  }
}

const categoryColors = {
  news: "bg-blue-100 text-blue-800",
  achievements: "bg-green-100 text-green-800",
  products: "bg-purple-100 text-purple-800",
  projects: "bg-orange-100 text-orange-800",
}

export function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Link href={`/blog/${blog.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden rounded-t-lg h-48">
            <Image
              src={blog.image || "/placeholder.svg"}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Badge className={`absolute top-4 left-4 ${categoryColors[blog.category as keyof typeof categoryColors]}`}>
              {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-balance mb-3 group-hover:text-primary transition-colors">
            {blog.title}
          </h3>
          <p className="text-muted-foreground text-sm text-pretty line-clamp-3">{blog.excerpt}</p>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={blog.author.avatar || "/placeholder.svg"} alt={blog.author.name} />
              <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{blog.author.name}</p>
              <p className="text-xs text-muted-foreground">{blog.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(blog.publishedAt)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {blog.readTime}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
