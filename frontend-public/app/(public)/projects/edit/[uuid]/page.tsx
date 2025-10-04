"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { Breadcrumb } from "@/components/project/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { projectApi, type ProjectType, type ProjectRole, type Status } from "@/lib/projects/projectMethods"
import { useAuth } from "@/contexts/userAuthContext"
import { type ProjectViewData } from "@/lib/projects/types"
import { AlertCircle, Loader2, Plus, X, Info, ArrowLeft, Upload, ImageIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import toast from "react-hot-toast"
import { convertToWebP } from "@/lib/utils/imageUtils"

export default function ProjectEditPage() {
  const { uuid } = useParams<{ uuid: string }>()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [project, setProject] = useState<ProjectViewData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // File upload state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Form state for all project fields
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
    photoInput: "",
    documents: [] as string[],
    documentInput: "",
    youtubeURL: "",
    websiteURL: "",
    githubURL: "",
    isVisible: true,
    status: "ACTIVE" as Status,
    members: [] as {id: string; name: string; role: ProjectRole; email?: string}[],
    guestMembers: [] as {name: string; email: string; role: ProjectRole}[],
    newMember: { name: "", email: "", role: "MEMBER" as ProjectRole }
  })

  useEffect(() => {
    async function loadProject() {
      try {
        setIsLoading(true)
        setError(null)

        if (!isAuthenticated || !user) {
          router.push(`/projects/view/${uuid}`)
          return
        }

        const { data } = await projectApi.getProjectById(uuid)

        if (data.owner.id !== user.id) {
          router.push(`/projects/view/${uuid}`)
          return
        }

        setProject(data)
        
        // Initialize form data with project data
        setFormData({
          name: data.name || "",
          description: data.description || "",
          type: data.type || "RESEARCH",
          startDate: data.startDate ? new Date(data.startDate).toISOString().split("T")[0] : "",
          endDate: data.endDate ? new Date(data.endDate).toISOString().split("T")[0] : "",
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
          photoInput: "",
          documents: data.documents || [],
          documentInput: "",
          youtubeURL: data.youtubeURL || "",
          websiteURL: data.websiteURL || "",
          githubURL: data.githubURL || "",
          isVisible: data.isVisible,
          status: data.status || "ACTIVE",
          members: data.members?.map((m: { 
            id: string; 
            role: ProjectRole; 
            user?: { 
              id: string; 
              name?: string; 
              email?: string; 
            }; 
          }) => ({
            id: m.id,
            name: m.user?.name || "Unknown",
            email: m.user?.email,
            role: m.role
          })) || [],
          guestMembers: data.guestMembers?.map((m: {
            name: string;
            email: string;
            role: ProjectRole;
          }) => ({
            name: m.name,
            email: m.email,
            role: m.role
          })) || [],
          newMember: { name: "", email: "", role: "MEMBER" }
        })
      } catch (err) {
        setError("Failed to load project. Please try again later.")
        console.error("Error loading project:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadProject()
  }, [uuid, isAuthenticated, user, router])

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [previewUrls])

  const breadcrumbItems = project
    ? [
        { label: "Projects", href: "/projects" },
        { label: project.name, href: `/projects/view/${uuid}` },
        { label: "Edit" },
      ]
    : [
        { label: "Projects", href: "/projects" },
        { label: "Edit Project" },
      ]
    
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      const updateData: {
        name: string;
        description: string;
        type: ProjectType;
        startDate: string;
        endDate?: string;
        tags: string[];
        techDetails: string;
        technologies: string[];
        references: string[];
        papers: string[];
        photos: string[];
        documents: string[];
        youtubeURL?: string;
        websiteURL?: string;
        githubURL?: string;
        isVisible: boolean;
      } = {
        name: formData.name,
        description: formData.description,
        type: formData.type as ProjectType,
        startDate: new Date(formData.startDate).toISOString(),
        tags: formData.tags,
        techDetails: formData.techDetails?.trim() || "",
        technologies: formData.technologies,
        references: formData.references,
        papers: formData.papers,
        photos: formData.photos,
        documents: formData.documents,
        isVisible: formData.isVisible,
      }

      if (formData.endDate) {
        updateData.endDate = new Date(formData.endDate).toISOString()
      }

      const urlFields = ["youtubeURL", "websiteURL", "githubURL"] as const
      for (const field of urlFields) {
        const url = formData[field]?.trim()
        if (url) {
          try {
            new URL(url)
            updateData[field] = url
          } catch {
            toast.error(`${field} must be a valid URL starting with http:// or https://`)
            setIsSaving(false)
            return
          }
        }
      }

      // Update project data
      await projectApi.updateProject(uuid, updateData)
      
      // Handle new guest members
      for (const guestMember of formData.guestMembers) {
        // Only process members that don't already exist in the project
        if (!project?.guestMembers?.some(m => 
          m.email === guestMember.email && 
          m.name === guestMember.name &&
          m.role === guestMember.role
        )) {
          try {
            await projectApi.addGuestMember(uuid, {
              name: guestMember.name,
              email: guestMember.email,
              role: guestMember.role
            })
          } catch (err) {
            console.error("Error adding guest member:", err)
            // Continue with the rest even if one fails
          }
        }
      }
      
      toast.success("Project updated successfully!")
      router.push(`/projects/view/${uuid}`)
      router.refresh()
    } catch (error) {
      console.error("Error updating project:", error)
      setError("Failed to update project. Please try again later.")
      toast.error("Failed to update project. Please try again later.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    router.push(`/projects/view/${uuid}`)
  }
  
  // Array item handlers
  const addArrayItem = (
    field: keyof typeof formData,
    inputField: keyof typeof formData,
    value: string,
  ) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()],
        [inputField]: "",
      }))
    }
  }

  const removeArrayItem = (
    field: keyof typeof formData,
    index: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[] | { id: string; name: string; role: ProjectRole; email?: string }[] | { name: string; email: string; role: ProjectRole }[]).filter((_, i) => i !== index),
    }))
  }
  
  // Member handlers
  const handleAddMember = () => {
    const { name, email, role } = formData.newMember
    if (name.trim() && email.trim()) {
      setFormData(prev => ({
        ...prev,
        guestMembers: [...prev.guestMembers, { name, email, role }],
        newMember: { name: "", email: "", role: "MEMBER" }
      }))
    } else {
      toast.error("Name and email are required for adding a member")
    }
  }
  
  const handleRemoveMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      guestMembers: prev.guestMembers.filter((_, i) => i !== index)
    }))
  }

  const handleNewMemberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      newMember: {
        ...prev.newMember,
        [name]: value
      }
    }))
  }

  // File handling functions
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Validate file types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type))
    
    if (invalidFiles.length > 0) {
      toast.error(`Invalid file types: ${invalidFiles.map(f => f.name).join(', ')}. Only JPEG, PNG, WebP, and GIF are allowed.`)
      return
    }

    // Check file size (10MB limit per file)
    const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      toast.error(`Files too large: ${oversizedFiles.map(f => f.name).join(', ')}. Maximum 10MB per file.`)
      return
    }

    // Check total number of files (max 10 per upload)
    if (selectedFiles.length + files.length > 10) {
      toast.error(`Too many files. Maximum 10 images per upload. Currently selected: ${selectedFiles.length}`)
      return
    }

    setSelectedFiles(prev => [...prev, ...files])
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(prev => [...prev, ...newPreviewUrls])
  }

  const removeSelectedFile = (index: number) => {
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index])
    
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
  }

  const clearSelectedFiles = () => {
    // Revoke all object URLs
    previewUrls.forEach(url => URL.revokeObjectURL(url))
    
    setSelectedFiles([])
    setPreviewUrls([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUploadImages = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select images to upload')
      return
    }

    setIsUploading(true)
    try {
      // Convert images to WebP format
      const convertedFiles = await Promise.all(
        selectedFiles.map(async (file) => {
          try {
            return await convertToWebP(file, {
              maxSizeMB: 2,
              maxWidthOrHeight: 1920,
              quality: 0.85
            })
          } catch (error) {
            console.error(`Failed to convert ${file.name}:`, error)
            // Fallback to original file if conversion fails
            return file
          }
        })
      )

      // Upload the converted images
      const response = await projectApi.uploadProjectImages(uuid, convertedFiles)
      
      if (response.data.uploadedImages) {
        // Update the form data with new image URLs
        setFormData(prev => ({
          ...prev,
          photos: [...prev.photos, ...response.data.uploadedImages]
        }))
        
        toast.success(`Successfully uploaded ${response.data.count} images`)
        clearSelectedFiles()
      }
    } catch (error) {
      console.error('Error uploading images:', error)
      toast.error('Failed to upload images. Please try again.')
    } finally {
      setIsUploading(false)
    }
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
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter project name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Detailed project description"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="techDetails">Technical Details</Label>
                    <Textarea
                      id="techDetails"
                      name="techDetails"
                      value={formData.techDetails}
                      onChange={handleChange}
                      placeholder="Technical details about your project"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                  <CardDescription>Add relevant tags to help others find your project (max 5)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={formData.tagsInput}
                      onChange={(e) => setFormData(prev => ({ ...prev, tagsInput: e.target.value }))}
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          if (formData.tags.length < 5) {
                            addArrayItem("tags", "tagsInput", formData.tagsInput)
                          } else {
                            toast.error("Maximum 5 tags allowed")
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (formData.tags.length < 5) {
                          addArrayItem("tags", "tagsInput", formData.tagsInput)
                        } else {
                          toast.error("Maximum 5 tags allowed")
                        }
                      }}
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 hover:bg-transparent"
                          onClick={() => removeArrayItem("tags", index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card>
                <CardHeader>
                  <CardTitle>Technologies</CardTitle>
                  <CardDescription>List technologies used in your project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={formData.technologiesInput}
                      onChange={(e) => setFormData(prev => ({ ...prev, technologiesInput: e.target.value }))}
                      placeholder="Add a technology"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addArrayItem("technologies", "technologiesInput", formData.technologiesInput)
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        addArrayItem("technologies", "technologiesInput", formData.technologiesInput)
                      }}
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {tech}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 hover:bg-transparent"
                          onClick={() => removeArrayItem("technologies", index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* References & Papers */}
              <Card>
                <CardHeader>
                  <CardTitle>References & Papers</CardTitle>
                  <CardDescription>Add references and published papers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>References</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={formData.referenceInput}
                        onChange={(e) => setFormData(prev => ({ ...prev, referenceInput: e.target.value }))}
                        placeholder="Add a reference link or citation"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addArrayItem("references", "referenceInput", formData.referenceInput)
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addArrayItem("references", "referenceInput", formData.referenceInput)
                        }}
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 mt-3">
                      {formData.references.map((ref, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                          <span className="flex-1 text-sm">{ref}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem("references", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Papers</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={formData.paperInput}
                        onChange={(e) => setFormData(prev => ({ ...prev, paperInput: e.target.value }))}
                        placeholder="Add a paper link or citation"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addArrayItem("papers", "paperInput", formData.paperInput)
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addArrayItem("papers", "paperInput", formData.paperInput)
                        }}
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 mt-3">
                      {formData.papers.map((paper, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                          <span className="flex-1 text-sm">{paper}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem("papers", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Photos & Documents */}
              <Card>
                <CardHeader>
                  <CardTitle>Photos & Documents</CardTitle>
                  <CardDescription>Upload project images or add photo links and document links</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Photo Upload</Label>
                    <div className="space-y-4 mt-2">
                      {/* File Input */}
                      <div className="flex gap-2">
                        <Input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                          multiple
                          onChange={handleFileSelect}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                          size="sm"
                        >
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Browse
                        </Button>
                      </div>

                      {/* Selected Files Preview */}
                      {selectedFiles.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Selected Images ({selectedFiles.length})</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={clearSelectedFiles}
                            >
                              Clear All
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {previewUrls.map((url, index) => (
                              <div key={index} className="relative group">
                                <Image
                                  src={url}
                                  alt={`Preview ${index + 1}`}
                                  width={200}
                                  height={96}
                                  className="w-full h-24 object-cover rounded border"
                                  unoptimized
                                />
                                <button
                                  type="button"
                                  onClick={() => removeSelectedFile(index)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b truncate">
                                  {selectedFiles[index]?.name}
                                </div>
                              </div>
                            ))}
                          </div>

                          <Button
                            type="button"
                            onClick={handleUploadImages}
                            disabled={isUploading || selectedFiles.length === 0}
                            className="w-full"
                          >
                            {isUploading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload {selectedFiles.length} Image{selectedFiles.length !== 1 ? 's' : ''}
                              </>
                            )}
                          </Button>
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground">
                        • Support formats: JPEG, PNG, WebP, GIF
                        • Maximum 10MB per image
                        • Maximum 10 images per upload
                        • Images will be converted to WebP format for optimization
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <Label>Photo URLs (Manual)</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={formData.photoInput}
                        onChange={(e) => setFormData(prev => ({ ...prev, photoInput: e.target.value }))}
                        placeholder="Add a photo URL"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addArrayItem("photos", "photoInput", formData.photoInput)
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addArrayItem("photos", "photoInput", formData.photoInput)
                        }}
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Current Photos Display */}
                  {formData.photos.length > 0 && (
                    <div>
                      <Label>Current Photos ({formData.photos.length})</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                        {formData.photos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <Image
                              src={photo}
                              alt={`Photo ${index + 1}`}
                              width={200}
                              height={128}
                              className="w-full h-32 object-cover rounded border"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                              }}
                              unoptimized
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayItem("photos", index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b">
                              Photo {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label>Documents</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={formData.documentInput}
                        onChange={(e) => setFormData(prev => ({ ...prev, documentInput: e.target.value }))}
                        placeholder="Add a document URL"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addArrayItem("documents", "documentInput", formData.documentInput)
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addArrayItem("documents", "documentInput", formData.documentInput)
                        }}
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 mt-3">
                      {formData.documents.map((doc, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                          <span className="flex-1 text-sm">{doc}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem("documents", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* External Links */}
              <Card>
                <CardHeader>
                  <CardTitle>External Links</CardTitle>
                  <CardDescription>Add links to relevant external resources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="websiteURL">Website URL</Label>
                    <Input
                      id="websiteURL"
                      name="websiteURL"
                      type="url"
                      value={formData.websiteURL}
                      onChange={handleChange}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="githubURL">GitHub URL</Label>
                    <Input
                      id="githubURL"
                      name="githubURL"
                      type="url"
                      value={formData.githubURL}
                      onChange={handleChange}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="youtubeURL">YouTube URL</Label>
                    <Input
                      id="youtubeURL"
                      name="youtubeURL"
                      type="url"
                      value={formData.youtubeURL}
                      onChange={handleChange}
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Team Members */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Add or edit project members</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Existing members (read-only) */}
                  {formData.members.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <Label>Current Members</Label>
                      <div className="border rounded-md divide-y">
                        {formData.members.map((member, index) => (
                          <div key={index} className="p-3 flex items-center justify-between">
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">{member.email}</p>
                            </div>
                            <Badge>{member.role}</Badge>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <Info className="h-3 w-3 mr-1" />
                        Existing members can&apos;t be modified here
                      </p>
                    </div>
                  )}
                  
                  {/* Guest members (can be edited) */}
                  {formData.guestMembers.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <Label>Guest Members</Label>
                      <div className="border rounded-md divide-y">
                        {formData.guestMembers.map((member, index) => (
                          <div key={index} className="p-3 flex items-center justify-between">
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">{member.email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge>{member.role}</Badge>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleRemoveMember(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Add new member */}
                  <div className="space-y-3 border-t pt-4">
                    <Label>Add New Member</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="memberName" className="text-xs">Name</Label>
                        <Input
                          id="memberName"
                          name="name"
                          value={formData.newMember.name}
                          onChange={handleNewMemberChange}
                          placeholder="Member name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="memberEmail" className="text-xs">Email</Label>
                        <Input
                          id="memberEmail"
                          name="email"
                          type="email"
                          value={formData.newMember.email}
                          onChange={handleNewMemberChange}
                          placeholder="member@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <Label htmlFor="memberRole" className="text-xs">Role</Label>
                        <Select 
                          value={formData.newMember.role} 
                          onValueChange={(value) => {
                            setFormData(prev => ({
                              ...prev,
                              newMember: {
                                ...prev.newMember,
                                role: value as ProjectRole
                              }
                            }))
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="LEADER">Leader</SelectItem>
                            <SelectItem value="MEMBER">Member</SelectItem>
                            <SelectItem value="SUPERVISOR">Supervisor</SelectItem>
                            <SelectItem value="CONTRIBUTOR">Contributor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="button" onClick={handleAddMember}>Add Member</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="type">Project Type</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as ProjectType }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RESEARCH">Research</SelectItem>
                        <SelectItem value="DESIGN">Design</SelectItem>
                        <SelectItem value="DEVELOPMENT">Development</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isVisible"
                      checked={formData.isVisible}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isVisible: checked }))}
                    />
                    <Label htmlFor="isVisible">Make project public</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
              </Card>

              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Changes to project members may take some time to reflect in the system.
                </AlertDescription>
              </Alert>
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
