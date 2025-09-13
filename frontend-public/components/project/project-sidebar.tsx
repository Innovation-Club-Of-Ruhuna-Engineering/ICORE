import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Tag } from "lucide-react"

interface ProjectSidebarProps {
  project: {
    startDate: string
    endDate?: string
    type: string
    technologies: string[]
    description: string
  }
  supervisor?: string
}

export function ProjectSidebar({ project, supervisor }: ProjectSidebarProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Dates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Start: </span>
            <span>{new Date(project.startDate).toLocaleDateString()}</span>
          </div>
          {project.endDate && (
            <div className="text-sm">
              <span className="text-muted-foreground">End: </span>
              <span>{new Date(project.endDate).toLocaleDateString()}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {supervisor && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Supervisor(s)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{supervisor}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Technologies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Public Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}
