"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Globe, Github, Youtube } from "lucide-react"

interface ProjectHeaderProps {
  project: {
    name: string
    about: string
    type: string
    startDate: string
    endDate?: string
    tags: string[]
    websiteURL?: string
    githubURL?: string
    youtubeURL?: string
    status: string
  }
  isOwner?: boolean
  onEdit?: () => void
}

export function ProjectHeader({ project, isOwner, onEdit }: ProjectHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white mb-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{project.name}</h1>
          <p className="text-blue-100 mb-4 leading-relaxed">{project.about}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-blue-100">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(project.startDate).toLocaleDateString()}</span>
              {project.endDate && (
                <>
                  <span>-</span>
                  <span>{new Date(project.endDate).toLocaleDateString()}</span>
                </>
              )}
            </div>
            <Badge variant="outline" className="border-white/30 text-white">
              {project.status}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {isOwner && (
            <Button onClick={onEdit} variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              Edit Project
            </Button>
          )}

          <div className="flex gap-2">
            {project.websiteURL && (
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Globe className="h-4 w-4" />
              </Button>
            )}
            {project.githubURL && (
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Github className="h-4 w-4" />
              </Button>
            )}
            {project.youtubeURL && (
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Youtube className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
