"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Breadcrumb } from "@/components/project/breadcrumb"
import { Button } from "@/components/ui/button"
import { projectApi, type ProjectType, type ProjectRole, type Status } from "@/lib/projects/projectMethods"
import { useAuth } from "@/contexts/userAuthContext"
import { type ProjectViewData } from "@/lib/projects/types"
import { AlertCircle, Loader2, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import toast from "react-hot-toast"

// Import new components
import { BasicInformation } from "@/components/project/edit/BasicInformation"
import { TeamMembers } from "@/components/project/edit/TeamMembers"
import { ArrayInput } from "@/components/project/edit/ArrayInput"
import { ExternalLinks } from "@/components/project/edit/ExternalLinks"
import { ProjectSettings } from "@/components/project/edit/ProjectSettings"
import { ImageUpload } from "@/components/project/edit/ImageUpload"
import { useMemberManagement } from "@/hooks/useMemberManagement"

// Define types for API responses
interface ProjectMemberResponse {
  memberId: string;
  firstName?: string;
  username?: string;
  email: string;
  role: ProjectRole;
  avatarUrl?: string;
}

interface GuestMemberResponse {
  id: string;
  name: string;
  email: string;
  role: ProjectRole;
}

interface UserSearchResult {
  id: string;
  name: string;
  email: string;
  username: string;
}

export default function ProjectEditPage() {
  const { uuid } = useParams<{ uuid: string }>()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [project, setProject] = useState<ProjectViewData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "RESEARCH" as ProjectType,
    startDate: "",
    endDate: "",
    tags: [] as string[],
    tagsInput: "",
    techDetails: "",
    technologies: [] as string[],
    technologiesInput: "",
    references: [] as string[],
    referenceInput: "",
    papers: [] as string[],
    paperInput: "",
    photos: [] as string[],
    websiteURL: "",
    githubURL: "",
    youtubeURL: "",
    isVisible: true,
    status: "ACTIVE" as Status,
    members: [] as {id: string; name: string; role: ProjectRole; email?: string; avatarUrl?: string}[],
    guestMembers: [] as {id?: string; name: string; email: string; role: ProjectRole}[],
    newMember: { 
      name: "", 
      email: "", 
      role: "MEMBER" as ProjectRole, 
      memberType: "guest" as "guest" | "registered",
      selectedUser: null as {id: string; name: string; email: string; username: string} | null
    }
  })

  // Use the member management hook
  const memberManagement = useMemberManagement(uuid)

  useEffect(() => {
    async function loadProject() {
      try {
        setIsLoading(true)
        setError(null)

        if (!isAuthenticated || !user) {
          router.push(`/projects/view/${uuid}`)
          return
        }

        const { data } = await projectApi.getPrivateProjectById(uuid)

        // if (data.owner.user.id !== user.id) {
        //   router.push(`/projects/view/${uuid}`)
        //   return
        // }

        // Fetch members and guest members separately using the dedicated endpoints
        const [membersResponse, guestMembersResponse] = await Promise.all([
          projectApi.getProjectMembers(uuid),
          projectApi.getProjectGuestMembers(uuid)
        ])

        console.log("Initial members data:", membersResponse.data)
        console.log("Initial guest members data:", guestMembersResponse.data)

        setProject(data)
        setFormData({
          name: data.name || "",
          description: data.description || "",
          type: data.type || "RESEARCH",
          startDate: data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : "",
          endDate: data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : "",
          tags: data.tags || [],
          tagsInput: "",
          techDetails: data.techDetails || "",
          technologies: data.technologies || [],
          technologiesInput: "",
          references: data.references || [],
          referenceInput: "",
          papers: data.papers || [],
          paperInput: "",
          photos: data.photos || [],
          websiteURL: data.websiteURL || "",
          githubURL: data.githubURL || "",
          youtubeURL: data.youtubeURL || "",
          isVisible: data.isVisible ?? true,
          status: data.status || "ACTIVE",
          members: membersResponse.data?.map((m: ProjectMemberResponse) => ({
            id: m.memberId, // Use memberId for removal operations
            name: m.firstName || m.username || "Unknown User",
            email: m.email || "No email",
            role: m.role,
            avatarUrl: m.avatarUrl
          })) || [],
          guestMembers: guestMembersResponse.data?.map((m: GuestMemberResponse) => ({
            id: m.id, // Guest members should have ID now
            name: m.name,
            email: m.email,
            role: m.role
          })) || [],
          newMember: { 
            name: "", 
            email: "", 
            role: "MEMBER", 
            memberType: "guest",
            selectedUser: null
          }
        })
      } catch (error: unknown) {
        console.error("Error loading project:", error)
        const errorMessage = error instanceof Error && 'response' in error && 
          typeof error.response === 'object' && error.response && 
          'data' in error.response && 
          typeof error.response.data === 'object' && error.response.data &&
          'message' in error.response.data && 
          typeof error.response.data.message === 'string'
          ? error.response.data.message 
          : "Failed to load project"
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    if (uuid) {
      loadProject()
    }
  }, [uuid, isAuthenticated, user, router])

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: project?.name || "Loading...", href: `/projects/view/${uuid}` },
    { label: "Edit", href: "#", current: true },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const updateData: {
        name: string;
        description: string;
        type: ProjectType;
        startDate?: string;
        endDate?: string;
        tags: string[];
        techDetails: string;
        technologies: string[];
        references: string[];
        papers: string[];
        isVisible: boolean;
        status: Status;
        websiteURL?: string;
        githubURL?: string;
        youtubeURL?: string;
      } = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
        tags: formData.tags,
        techDetails: formData.techDetails,
        technologies: formData.technologies,
        references: formData.references,
        papers: formData.papers,
        isVisible: formData.isVisible,
        status: formData.status,
      }

      // Only include URL fields if they have values
      if (formData.websiteURL?.trim()) {
        updateData.websiteURL = formData.websiteURL
      }
      if (formData.githubURL?.trim()) {
        updateData.githubURL = formData.githubURL
      }
      if (formData.youtubeURL?.trim()) {
        updateData.youtubeURL = formData.youtubeURL
      }

      await projectApi.updateProject(uuid, updateData)
      toast.success("Project updated successfully!")
      router.push(`/projects/view/${uuid}`)
    } catch (error: unknown) {
      console.error("Error saving project:", error)
      const errorMessage = error instanceof Error && 'response' in error && 
        typeof error.response === 'object' && error.response && 
        'data' in error.response && 
        typeof error.response.data === 'object' && error.response.data &&
        'message' in error.response.data && 
        typeof error.response.data.message === 'string'
        ? error.response.data.message 
        : "Failed to save project. Please try again."
      toast.error(errorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    router.push(`/projects/view/${uuid}`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }
  
  // Array item handlers
  const addArrayItem = (
    field: string,
    inputField: string,
    value: string,
  ) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field as keyof typeof prev] as string[]), value.trim()],
        [inputField]: "",
      }))
    }
  }

  const removeArrayItem = (
    field: string,
    index: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index),
    }))
  }

  // Helper functions for member management
  const reloadProjectData = async () => {
    try {
      console.log("Reloading project data...")
      
      // Fetch project basic details
      const { data: projectData } = await projectApi.getPrivateProjectById(uuid)
      console.log("Project data reloaded:", projectData)
      
      // Fetch members and guest members separately using the dedicated endpoints
      const [membersResponse, guestMembersResponse] = await Promise.all([
        projectApi.getProjectMembers(uuid),
        projectApi.getProjectGuestMembers(uuid)
      ])
      
      console.log("Members data:", membersResponse.data)
      console.log("Guest members data:", guestMembersResponse.data)
      
      setFormData(prev => ({
        ...prev,
        members: membersResponse.data?.map((m: ProjectMemberResponse) => ({
          id: m.memberId, // Use memberId for removal operations
          name: m.firstName || m.username || "Unknown User",
          email: m.email || "No email",
          role: m.role,
          avatarUrl: m.avatarUrl
        })) || [],
        guestMembers: guestMembersResponse.data?.map((m: GuestMemberResponse) => ({
          id: m.id, // Guest members should have ID now
          name: m.name,
          email: m.email,
          role: m.role
        })) || [],
        photos: projectData.photos || [],
        newMember: { 
          name: "", 
          email: "", 
          role: "MEMBER", 
          memberType: "guest",
          selectedUser: null
        }
      }))
      
      console.log("Form data updated successfully")
    } catch (error) {
      console.error("Error reloading project data:", error)
      toast.error("Failed to reload project data")
    }
  }

  // Member management functions for the TeamMembers component
  const handleAddMember = async () => {
    await memberManagement.addMember(formData.newMember, async () => {
      // Reload the project data and reset the form
      await reloadProjectData()
    })
  }

  const handleRemoveRegisteredMember = async (memberId: string, index: number) => {
    await memberManagement.removeRegisteredMember(memberId, () => {
      setFormData(prev => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index)
      }))
    })
  }

  const handleRemoveGuestMember = async (index: number) => {
    const guestMember = formData.guestMembers[index]
    
    if (guestMember.id) {
      // If guest member has an ID, remove directly via API
      await memberManagement.removeGuestMemberById(guestMember.id, () => {
        setFormData(prev => ({
          ...prev,
          guestMembers: prev.guestMembers.filter((_, i) => i !== index)
        }))
      })
    } else {
      // Fallback to the old method if no ID
      await memberManagement.removeGuestMember(guestMember, () => {
        setFormData(prev => ({
          ...prev,
          guestMembers: prev.guestMembers.filter((_, i) => i !== index)
        }))
      })
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    memberManagement.handleNameChange(e.target.value, formData.newMember.memberType, (updates) => {
      setFormData(prev => ({
        ...prev,
        newMember: { ...prev.newMember, ...updates }
      }))
    })
  }

  const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      newMember: { ...prev.newMember, [name]: value }
    }))
  }

  const handleMemberTypeChange = (value: "guest" | "registered") => {
    memberManagement.handleMemberTypeChange(value, (updates) => {
      setFormData(prev => ({
        ...prev,
        newMember: { ...prev.newMember, ...updates }
      }))
    })
  }

  const handleUserSelect = (user: UserSearchResult) => {
    memberManagement.handleUserSelect(user, (updates) => {
      setFormData(prev => ({
        ...prev,
        newMember: { ...prev.newMember, ...updates }
      }))
    })
  }

  const handleRoleChange = (role: ProjectRole) => {
    setFormData(prev => ({
      ...prev,
      newMember: { ...prev.newMember, role }
    }))
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <BasicInformation 
                formData={{
                  name: formData.name,
                  description: formData.description,
                  techDetails: formData.techDetails
                }}
                onChange={handleChange}
              />

              {/* Team Members */}
              <TeamMembers
                members={formData.members}
                guestMembers={formData.guestMembers}
                newMember={formData.newMember}
                allUsers={memberManagement.allUsers}
                filteredUsers={memberManagement.filteredUsers}
                showUserDropdown={memberManagement.showUserDropdown}
                isLoadingUsers={memberManagement.isLoadingUsers}
                isAddingMember={memberManagement.isAddingMember}
                onAddMember={handleAddMember}
                onRemoveRegisteredMember={handleRemoveRegisteredMember}
                onRemoveGuestMember={handleRemoveGuestMember}
                onNameChange={handleNameChange}
                onMemberChange={handleMemberChange}
                onMemberTypeChange={handleMemberTypeChange}
                onUserSelect={handleUserSelect}
                onRoleChange={handleRoleChange}
              />

              {/* Tags */}
              <ArrayInput
                title="Tags"
                description="Add relevant tags to help others find your project (max 5)"
                items={formData.tags}
                inputValue={formData.tagsInput}
                inputName="tagsInput"
                fieldName="tags"
                inputFieldName="tagsInput"
                onInputChange={handleChange}
                onAddItem={addArrayItem}
                onRemoveItem={removeArrayItem}
                placeholder="Enter a tag and press Enter"
              />

              {/* Technologies */}
              <ArrayInput
                title="Technologies"
                description="List technologies used in your project"
                items={formData.technologies}
                inputValue={formData.technologiesInput}
                inputName="technologiesInput"
                fieldName="technologies"
                inputFieldName="technologiesInput"
                onInputChange={handleChange}
                onAddItem={addArrayItem}
                onRemoveItem={removeArrayItem}
                placeholder="Enter a technology and press Enter"
              />

              {/* References */}
              <ArrayInput
                title="References"
                description="Add academic references, research papers, or related articles"
                items={formData.references}
                inputValue={formData.referenceInput}
                inputName="referenceInput"
                fieldName="references"
                inputFieldName="referenceInput"
                onInputChange={handleChange}
                onAddItem={addArrayItem}
                onRemoveItem={removeArrayItem}
                placeholder="Enter a reference and press Enter"
              />

              {/* Papers */}
              <ArrayInput
                title="Research Papers"
                description="List research papers related to your project"
                items={formData.papers}
                inputValue={formData.paperInput}
                inputName="paperInput"
                fieldName="papers"
                inputFieldName="paperInput"
                onInputChange={handleChange}
                onAddItem={addArrayItem}
                onRemoveItem={removeArrayItem}
                placeholder="Enter a paper reference and press Enter"
              />

              {/* Image Upload */}
              <ImageUpload
                projectId={uuid}
                photos={formData.photos}
                onPhotosUpdate={(photos) => setFormData(prev => ({ ...prev, photos }))}
              />

              {/* External Links */}
              <ExternalLinks
                formData={{
                  websiteURL: formData.websiteURL,
                  githubURL: formData.githubURL,
                  youtubeURL: formData.youtubeURL
                }}
                onChange={handleChange}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ProjectSettings
                formData={{
                  type: formData.type,
                  startDate: formData.startDate,
                  endDate: formData.endDate,
                  isVisible: formData.isVisible
                }}
                onChange={handleChange}
                onTypeChange={(type) => setFormData(prev => ({ ...prev, type }))}
                onVisibilityChange={(checked) => setFormData(prev => ({ ...prev, isVisible: checked }))}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Project"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}