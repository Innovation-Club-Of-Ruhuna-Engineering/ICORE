"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Breadcrumb } from "@/components/project/breadcrumb"
import { ProjectForm } from "@/components/project/project-form"
import { projectApi, type ProjectType } from "@/lib/projects/projectMethods"
import { useAuth } from "@/contexts/userAuthContext"
import { type ProjectViewData, type ProjectFormData } from "@/lib/projects/types"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ProjectEditPage() {
  const { uuid } = useParams<{ uuid: string }>()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [project, setProject] = useState<ProjectViewData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProject() {
      try {
        setIsLoading(true)
        setError(null)

        // Check if user is authenticated
        if (!isAuthenticated || !user) {
          router.push(`/projects/view/${uuid}`)
          return
        }

        const { data } = await projectApi.getProjectById(uuid)
        
        // Verify if the logged-in user is the owner
        if (data.owner.id !== user.id) {
          router.push(`/projects/view/${uuid}`)
          return
        }

        setProject(data)
      } catch (err) {
        setError('Failed to load project. Please try again later.')
        console.error('Error loading project:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadProject()
  }, [uuid, isAuthenticated, user, router])

  const breadcrumbItems = project ? [
    { label: "Projects", href: "/projects" },
    { label: project.name, href: `/projects/view/${uuid}` },
    { label: "Edit" },
  ] : [
    { label: "Projects", href: "/projects" },
    { label: "Edit Project" },
  ]

  const handleSubmit = async (formData: ProjectFormData) => {
    try {
      // Create update data excluding status and keeping only editable fields
      // Create base update data with required fields
      const baseData = {
        name: formData.name,
        about: formData.about,
        description: formData.description,
        type: formData.type as ProjectType,
        tags: formData.tags,
        details: formData.details,
        technologies: formData.technologies,
        isVisible: formData.isVisible,
      }

      // Format dates to ISO DateTime format
      const formattedDates = {
        startDate: new Date(formData.startDate).toISOString(),
        ...(formData.endDate && { endDate: new Date(formData.endDate).toISOString() })
      }

      // Create final update data with optional URL fields and formatted dates
      const updateData = {
        ...baseData,
        ...formattedDates,
        ...(formData.youtubeURL?.trim() && { youtubeURL: formData.youtubeURL.trim() }),
        ...(formData.websiteURL?.trim() && { websiteURL: formData.websiteURL.trim() }),
        ...(formData.githubURL?.trim() && { githubURL: formData.githubURL.trim() }),
      }

      await projectApi.updateProject(uuid, updateData)
      router.push(`/projects/view/${uuid}`)
      router.refresh() // Refresh the page data
    } catch (error) {
      console.error("Error updating project:", error)
      setError('Failed to update project. Please try again later.')
    }
  }

  const handleCancel = () => {
    router.push(`/projects/view/${uuid}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading project...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-6">
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">
              <span className="text-foreground">Edit</span>{" "}
              <span className="text-primary">Project</span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-3xl">
              Update your project information and settings to keep your innovation story up to date
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Pass project data but exclude status from editable fields */}
        <ProjectForm 
          initialData={{
            name: project.name,
            about: project.about,
            description: project.description,
            type: project.type,
            startDate: new Date(project.startDate).toISOString().split('T')[0],
            endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : undefined,
            tags: project.tags,
            details: project.details || '',
            technologies: project.technologies,
            youtubeURL: project.youtubeURL,
            websiteURL: project.websiteURL,
            githubURL: project.githubURL,
            isVisible: project.isVisible,
          }}
          onSubmit={handleSubmit} 
          onCancel={handleCancel} />
      </div>
    </div>
  )
}
