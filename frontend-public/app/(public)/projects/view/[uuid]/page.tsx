"use client"

import { notFound, useParams } from "next/navigation"
import { Breadcrumb } from "@/components/project/breadcrumb"
import { ProjectSidebar } from "@/components/project/project-sidebar"
import { ProjectTabs } from "@/components/project/project-tabs"
import { useAuth } from "@/contexts/userAuthContext"
import { useEffect, useState } from "react"
import { projectApi, type PublicProject } from "@/lib/projects/projectMethods"

interface ProjectViewData extends Omit<PublicProject, 'startDate' | 'endDate'> {
  startDate: string;
  endDate: string;
  supervisor?: string;
  fieldsOfInterest?: string;
  progress?: string;
  members: Array<{
    id: string;
    name: string;
    role: string;
    user?: {
      name: string;
    };
  }>;
  owner: {
    id: string;
    username: string;
    name?: string;
  };
}
import { ProjectHero } from "@/components/project/project-hero"
import { DiscussionSection } from "@/components/project/discussion-section"

// Get project data
async function getProject(uuid: string, isAuthenticated: boolean): Promise<ProjectViewData> {
  try {
    const { data: project } = await projectApi.getProjectById(uuid)
    if (!project) throw new Error('Project not found')

    return {
      ...project,
      type: project.type || 'RESEARCH',
      photos: project.photos || [],
      papers: project.papers || [],
      references: project.references || [],
      documents: project.documents || [],
      members: project.members || [],
      guestMembers: project.guestMembers || [],
      techDetails: project.techDetails || '',
      technologies: project.technologies || [],
      tags: project.tags || [],
      startDate: new Date(project.startDate).toLocaleDateString() || '',
      endDate: project.endDate ? new Date(project.endDate).toLocaleDateString() : '',
      fieldsOfInterest: '',
      supervisor: '',
      youtubeURL: project.youtubeURL || '',
      websiteURL: project.websiteURL || '',
      githubURL: project.githubURL || '',
      progress: project.status || 'PENDING'
    }
  } catch (error) {
    const axiosError = error as { response?: { status: number } }
    if (axiosError?.response?.status === 404 && isAuthenticated) {
      try {
        const { data: privateProject } = await projectApi.getPrivateProjectById(uuid)
        if (!privateProject) throw new Error('Project not found')

        return {
          ...privateProject,
          type: privateProject.type || 'RESEARCH',
          photos: privateProject.photos || [],
          papers: privateProject.papers || [],
          references: privateProject.references || [],
          documents: privateProject.documents || [],
          members: privateProject.members || [],
          guestMembers: privateProject.guestMembers || [],
          techDetails: privateProject.techDetails || '',
          technologies: privateProject.technologies || [],
          tags: privateProject.tags || [],
          startDate: new Date(privateProject.startDate).toLocaleDateString() || '',
          endDate: privateProject.endDate ? new Date(privateProject.endDate).toLocaleDateString() : '',
          fieldsOfInterest: '',
          supervisor: '',
          youtubeURL: privateProject.youtubeURL || '',
          websiteURL: privateProject.websiteURL || '',
          githubURL: privateProject.githubURL || '',
          progress: privateProject.status || 'PENDING'
        }
      } catch {
        notFound()
      }
    }

    notFound()
  }

  throw new Error('Project not found')
}

export default function ProjectViewPage() {
  const { uuid } = useParams<{ uuid: string }>()
  const { user, isAuthenticated } = useAuth()
  const [project, setProject] = useState<ProjectViewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProject(uuid, isAuthenticated)
        
        // Gracefully handle missing owner
        const ownerId = projectData?.owner?.id

        // Access control
        if (projectData.status === 'PENDING') {
          if (!isAuthenticated || !ownerId || user?.id !== ownerId) {
            notFound()
          }
        } else if (projectData.status === 'ACTIVE' && !projectData.isVisible) {
          if (!isAuthenticated || !ownerId || user?.id !== ownerId) {
            notFound()
          }
        } else if (projectData.status !== 'ACTIVE') {
          if (!isAuthenticated || !ownerId || user?.id !== ownerId) {
            notFound()
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
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="h-64 bg-gray-200 rounded" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-40 bg-gray-200 rounded" />
              </div>
              <div className="h-60 bg-gray-200 rounded" />
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
          <p className="text-gray-600">The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [{ label: "Projects", href: "/projects" }, { label: project.name }]
  const isOwner = project.owner?.id === user?.id

  const handleReply = (commentId: string) => {
    console.log("Reply to comment:", commentId)
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-b from-blue-50 to-white pt-24 pb-6 md:pt-28 md:pb-8">
        <div className="container mx-auto px-6 max-w-7xl">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </section>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ProjectHero
              title={project.name}
              description={project.description}
              publishedDate={project.startDate}
              author={project.owner?.name || 'Unknown'}
              teamMembers={project.members.map(m => ({
                name: m.user?.name || m.name || 'Unknown Member',
                initials: (m.user?.name || m.name || 'Unknown').split(' ').map((n: string) => n[0]).join('')
              }))}
              photos={project.photos}
              youtubeURL={project.youtubeURL}
              websiteURL={project.websiteURL}
              githubURL={project.githubURL}
            />
          </div>

          <div>
            <ProjectSidebar
              progress={project.progress || 'In Progress'}
              dates={`${project.startDate} - ${project.endDate}`}
              supervisor={project.supervisor || 'Not Specified'}
              fieldsOfInterest={project.fieldsOfInterest || 'Not Specified'}
              projectType={project.type as any}
              tags={project.tags}
              technologies={project.technologies}
            />
          </div>
        </div>

        <div className="mt-8">
          <ProjectTabs
            description={project.description}
            techDetails={project.techDetails}
            technologies={project.technologies}
            references={project.references}
            papers={project.papers}
            documents={project.documents}
          />
        </div>

        <div className="mt-8">
          <DiscussionSection comments={comments} onReply={handleReply} />
        </div>
      </div>
    </div>
  )
}