import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FormattedText } from "@/components/ui/formatted-text"
import { SocialSharingCard } from "./social-sharing-card"
import type { ProjectType } from "@/lib/projects/projectMethods"
import { formatProjectType } from "@/lib/projects/projectUtils"



interface ProjectSidebarProps {
  progress: string
  dates: string
  supervisor?: string | null
  fieldsOfInterest: string
  projectType: ProjectType
  tags?: string[]
  technologies?: string[]
  projectTitle?: string
  projectDescription?: string
  projectUrl?: string
}

export function ProjectSidebar({
  progress,
  dates,
  supervisor,
  fieldsOfInterest,
  projectType,
  tags = [],
  technologies = [],
  projectTitle,
  projectDescription,
  projectUrl,
}: ProjectSidebarProps) {
  return (
    <div className="space-y-6">
      <SocialSharingCard 
        projectTitle={projectTitle}
        projectDescription={projectDescription}
        projectUrl={projectUrl}
      />

      <Card className="bg-[#ffffff] border-[#d9d9d9]">
        <CardContent className="p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-[#000000]">Progress</span>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{progress}</Badge>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="font-semibold text-[#000000]">Project Type</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                {formatProjectType(projectType)}
              </Badge>
            </div>
          </div>

          <div>
            <span className="font-semibold text-[#000000] block mb-1">Duration</span>
            <span className="text-[#555555] text-sm">{dates}</span>
          </div>

          {supervisor && (
            <div>
              <span className="font-semibold text-[#000000] block mb-1">Supervisor(s)</span>
              <FormattedText 
                text={supervisor} 
                className="text-[#555555] text-sm"
              />
            </div>
          )}

          <div>
            <span className="font-semibold text-[#000000] block mb-1">Fields of Interest</span>
            <FormattedText 
              text={fieldsOfInterest} 
              className="text-[#555555] text-sm"
            />
          </div>

          {tags.length > 0 && (
            <div>
              <span className="font-semibold text-[#000000] block mb-2">Tags</span>
              <div className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {technologies.length > 0 && (
            <div>
              <span className="font-semibold text-[#000000] block mb-2">Key Technologies</span>
              <div className="flex flex-wrap gap-1">
                {technologies.slice(0, 4).map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-[#ecf0ff] text-[#0d6efd]">
                    {tech}
                  </Badge>
                ))}
                {technologies.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{technologies.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
