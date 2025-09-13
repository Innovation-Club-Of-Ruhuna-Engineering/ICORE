"use client"

import { notFound, redirect } from "next/navigation"
import { use } from "react"
import { Breadcrumb } from "@/components/project/breadcrumb"
import { ProjectHeader } from "@/components/project/project-header"
import { MemberAvatars } from "@/components/project/member-avatars"
import { ProjectSidebar } from "@/components/project/project-sidebar"
import { ProjectTabs } from "@/components/project/project-tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/contexts/userAuthContext"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText, Youtube, Github, Globe } from "lucide-react"
import { type ProjectViewData } from "@/lib/projects/types"
import { projectApi } from "@/lib/projects/projectMethods"

// Get project data
async function getProject(uuid: string, isAuthenticated: boolean): Promise<ProjectViewData> {
  try {
    const { data: project } = await projectApi.getProjectById(uuid)
    if (!project) throw new Error('Project not found')

    return {
      ...project,
      photos: project.photos || [],
      papers: project.papers || [],
      references: project.references || [],
      documents: project.documents || [],
      members: [],
      guestMembers: []
    }
  } catch (error: any) {
    if (error?.response?.status === 404 && isAuthenticated) {
      try {
        const { data: privateProject } = await projectApi.getPrivateProjectById(uuid)
        if (!privateProject) throw new Error('Project not found')

        return {
          ...privateProject,
          photos: privateProject.photos || [],
          papers: privateProject.papers || [],
          references: privateProject.references || [],
          documents: privateProject.documents || [],
          members: [],
          guestMembers: []
        }
      } catch (privateError) {
        notFound()
      }
    }

    notFound()
  }

  throw new Error('Project not found')
}

export default function ProjectViewPage({ params }: { params: { uuid: string } }) {
  const { uuid } = params instanceof Promise ? use(params) : params
  const { user, isAuthenticated } = useAuth()
  const [project, setProject] = useState<ProjectViewData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProject(uuid, isAuthenticated)
        
        // Gracefully handle missing owner
        const ownerId = projectData?.owner?.id

        // Access control
        if (projectData.status === 'PENDING') {
          if (!isAuthenticated || !ownerId || user?.id !== ownerId) {
            redirect('/projects')
          }
        } else if (projectData.status === 'ACTIVE' && !projectData.isVisible) {
          if (!isAuthenticated || !ownerId || user?.id !== ownerId) {
            return setProject(null)
          }
        } else if (projectData.status !== 'ACTIVE') {
          if (!isAuthenticated || !ownerId || user?.id !== ownerId) {
            redirect('/projects')
          }
        }

        setProject(projectData)
      } catch (error) {
        console.error('Error fetching project:', error)
        setProject(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [uuid, isAuthenticated, user])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="bg-gradient-to-b from-blue-50 to-white pt-24 pb-6 md:pt-28 md:pb-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="h-8 bg-muted rounded w-1/3 animate-pulse"></div>
          </div>
        </section>
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded w-2/3"></div>
            <div className="h-6 bg-muted rounded w-1/2"></div>
          </div>
          <div className="space-y-6 mt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full bg-muted"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-4">
                  <div className="h-6 bg-muted rounded w-1/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="h-4 bg-muted rounded w-4/6"></div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-4">
                  <div className="h-6 bg-muted rounded w-1/3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600">The project you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [{ label: "Projects", href: "/projects" }, { label: project.name }]
  const isOwner = project.owner?.id === user?.id

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">What is this project about?</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{project.description}</p>
            </CardContent>
          </Card>

          {project.photos.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Project Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo || "/placeholder.svg"}
                      alt={`Project photo ${index + 1}`}
                      className="rounded-lg object-cover w-full h-48"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )
    },
    {
      id: "technical",
      label: "Technical Details",
      content: (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Technical Implementation</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "papers",
      label: "Papers",
      content: (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Papers & References</h3>
              <div className="space-y-3">
                {project.papers.map((paper, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="flex-1">{paper}</span>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "resources",
      label: "Resources",
      content: (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-3">
              {project.websiteURL && (
                <ResourceLink label="Website" url={project.websiteURL} icon={Globe} />
              )}
              {project.githubURL && (
                <ResourceLink label="GitHub" url={project.githubURL} icon={Github} />
              )}
              {project.youtubeURL && (
                <ResourceLink label="YouTube" url={project.youtubeURL} icon={Youtube} />
              )}
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-b from-blue-50 to-white pt-24 pb-6 md:pt-28 md:pb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </section>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <ProjectHeader project={project} isOwner={isOwner} />
        <div className="space-y-6 mt-4">
          <MemberAvatars members={project.members} guestMembers={project.guestMembers} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProjectTabs tabs={tabs} defaultTab="overview" />
            </div>
            <div className="lg:col-span-1">
              <ProjectSidebar project={project} supervisor="Dr. A Perera" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResourceLink({ label, url, icon: Icon }: { label: string; url: string; icon: any }) {
  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <span className="flex-1">{label}</span>
      <Button size="sm" variant="outline" asChild>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4" />
        </a>
      </Button>
    </div>
  )
}
