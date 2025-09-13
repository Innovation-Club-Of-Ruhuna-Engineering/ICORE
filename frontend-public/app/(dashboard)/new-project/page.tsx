"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Breadcrumb } from "@/components/project/breadcrumb"
import { ProjectForm } from "@/components/project/project-form"
import { projectApi, type CreateProjectData, type ProjectType } from "@/lib/projects/projectMethods"
import { useAuth } from "@/contexts/userAuthContext"
import { type ProjectFormData } from "@/lib/projects/types"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import toast from "react-hot-toast"

export default function NewProjectPage() {
  const router = useRouter()
  const { user, isAuthenticated, loading } = useAuth() // ✅ include loading state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // ✅ Wait until loading is false before redirecting
    if (!loading && (!isAuthenticated || !user)) {
      router.push('/signin')
    }
  }, [loading, isAuthenticated, user, router])

  const breadcrumbItems = [
    { label: "Projects", href: "/projects" },
    { label: "Create New Project" },
  ]

  const validateFormData = (formData: ProjectFormData) => {
    const errors: string[] = []

    if (!formData.name || formData.name.length < 5 || formData.name.length > 50) {
      errors.push('Project name must be between 5 and 50 characters')
    }
    if (!formData.about || formData.about.length < 10 || formData.about.length > 100) {
      errors.push('Project about section must be between 10 and 100 characters')
    }
    if (!formData.description || formData.description.length < 10 || formData.description.length > 500) {
      errors.push('Project description must be between 10 and 500 characters')
    }
    if (!formData.startDate) {
      errors.push('Start date is required')
    }
    if (formData.tags.length > 5) {
      errors.push('You can add up to 5 tags')
    }

    const urlPattern = /^https?:\/\/.+/
    if (formData.youtubeURL && !urlPattern.test(formData.youtubeURL)) {
      errors.push('YouTube URL must be a valid URL')
    }
    if (formData.websiteURL && !urlPattern.test(formData.websiteURL)) {
      errors.push('Website URL must be a valid URL')
    }
    if (formData.githubURL && !urlPattern.test(formData.githubURL)) {
      errors.push('GitHub URL must be a valid URL')
    }

    return errors
  }

  const handleSubmit = async (formData: ProjectFormData) => {
    try {
      setIsSubmitting(true)
      setError(null)

      const validationErrors = validateFormData(formData)
      if (validationErrors.length > 0) {
        const errorMsg = validationErrors.join('\n')
        setError(errorMsg)
        toast.error(errorMsg)
        return
      }

      const baseData = {
        name: formData.name,
        about: formData.about,
        description: formData.description,
        type: formData.type as ProjectType,
        startDate: new Date(formData.startDate).toISOString(),
        tags: formData.tags,
        details: formData.details,
        technologies: formData.technologies,
        isVisible: formData.isVisible,
      }

      const createData: CreateProjectData = {
        ...baseData,
        ...(formData.endDate?.trim() && { endDate: new Date(formData.endDate.trim()).toISOString() }),
      }

      if (formData.details?.trim()) {
        createData.details = formData.details.trim()
      }

      if (formData.youtubeURL?.trim()) {
        try {
          new URL(formData.youtubeURL.trim())
          createData.youtubeURL = formData.youtubeURL.trim()
        } catch {
          toast.error('YouTube URL must be a valid URL starting with http:// or https://')
          return
        }
      }

      if (formData.websiteURL?.trim()) {
        try {
          new URL(formData.websiteURL.trim())
          createData.websiteURL = formData.websiteURL.trim()
        } catch {
          toast.error('Website URL must be a valid URL starting with http:// or https://')
          return
        }
      }

      if (formData.githubURL?.trim()) {
        try {
          new URL(formData.githubURL.trim())
          createData.githubURL = formData.githubURL.trim()
        } catch {
          toast.error('GitHub URL must be a valid URL starting with http:// or https://')
          return
        }
      }

      await projectApi.createProject(createData)
      toast.success('Project created successfully!')
      router.push('/me')
      router.refresh()
    } catch (error) {
      console.error("Error creating project:", error)
      setError('Failed to create project. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  // ✅ Auth is loading (fetching user profile)
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Checking authentication...</span>
        </div>
      </div>
    )
  }

  // ✅ Block rendering while redirecting
  if (!isAuthenticated || !user) {
    return null
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.split('\n').map((err, index) => (
              <div key={index}>{err}</div>
            ))}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-b from-blue-50 to-white pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-6">
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">
              <span className="text-foreground">Create New</span>{" "}
              <span className="text-primary">Project</span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-3xl">
              Share your innovation story by creating a new project. Fill in the details below to get started.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <ProjectForm 
          initialData={{
            name: "",
            about: "",
            description: "",
            type: "RESEARCH",
            startDate: new Date().toISOString().split('T')[0],
            tags: [],
            details: "",
            technologies: [],
            youtubeURL: "",
            websiteURL: "",
            githubURL: "",
            isVisible: true,
          }}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}
