"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { X, Plus, Upload } from "lucide-react"

interface ProjectFormData {
  name: string
  about: string
  description: string
  type: string
  startDate: string
  endDate: string
  tags: string[]
  details: string
  technologies: string[]
  references: string[]
  papers: string[]
  youtubeURL: string
  websiteURL: string
  githubURL: string
  isVisible: boolean
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>
  onSubmit: (data: ProjectFormData) => void
  onCancel: () => void
}

export function ProjectForm({ initialData, onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: initialData?.name || "",
    about: initialData?.about || "",
    description: initialData?.description || "",
    type: initialData?.type || "RESEARCH",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    tags: initialData?.tags || [],
    details: initialData?.details || "",
    technologies: initialData?.technologies || [],
    references: initialData?.references || [],
    papers: initialData?.papers || [],
    youtubeURL: initialData?.youtubeURL || "",
    websiteURL: initialData?.websiteURL || "",
    githubURL: initialData?.githubURL || "",
    isVisible: initialData?.isVisible || false,
  })

  const [newTag, setNewTag] = useState("")
  const [newTechnology, setNewTechnology] = useState("")
  const [newReference, setNewReference] = useState("")
  const [newPaper, setNewPaper] = useState("")

  const addArrayItem = (
    field: keyof Pick<ProjectFormData, "tags" | "technologies" | "references" | "papers">,
    value: string,
  ) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }))
    }
  }

  const removeArrayItem = (
    field: keyof Pick<ProjectFormData, "tags" | "technologies" | "references" | "papers">,
    index: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
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
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="about">Short Description</Label>
                <Input
                  id="about"
                  value={formData.about}
                  onChange={(e) => setFormData((prev) => ({ ...prev, about: e.target.value }))}
                  placeholder="Brief description of the project"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed project description"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="details">Additional Details</Label>
                <Textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) => setFormData((prev) => ({ ...prev, details: e.target.value }))}
                  placeholder="Any additional project details"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addArrayItem("tags", newTag)
                      setNewTag("")
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    addArrayItem("tags", newTag)
                    setNewTag("")
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
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  placeholder="Add a technology"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addArrayItem("technologies", newTechnology)
                      setNewTechnology("")
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    addArrayItem("technologies", newTechnology)
                    setNewTechnology("")
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

          {/* External Links */}
          <Card>
            <CardHeader>
              <CardTitle>External Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="websiteURL">Website URL</Label>
                <Input
                  id="websiteURL"
                  type="url"
                  value={formData.websiteURL}
                  onChange={(e) => setFormData((prev) => ({ ...prev, websiteURL: e.target.value }))}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <Label htmlFor="githubURL">GitHub URL</Label>
                <Input
                  id="githubURL"
                  type="url"
                  value={formData.githubURL}
                  onChange={(e) => setFormData((prev) => ({ ...prev, githubURL: e.target.value }))}
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div>
                <Label htmlFor="youtubeURL">YouTube URL</Label>
                <Input
                  id="youtubeURL"
                  type="url"
                  value={formData.youtubeURL}
                  onChange={(e) => setFormData((prev) => ({ ...prev, youtubeURL: e.target.value }))}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </CardContent>
          </Card>

          {/* References and Papers */}
          <Card>
            <CardHeader>
              <CardTitle>References & Papers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>References</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newReference}
                    onChange={(e) => setNewReference(e.target.value)}
                    placeholder="Add a reference"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addArrayItem("references", newReference)
                        setNewReference("")
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      addArrayItem("references", newReference)
                      setNewReference("")
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
                    value={newPaper}
                    onChange={(e) => setNewPaper(e.target.value)}
                    placeholder="Add a paper"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addArrayItem("papers", newPaper)
                        setNewPaper("")
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      addArrayItem("papers", newPaper)
                      setNewPaper("")
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
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayItem("papers", index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
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
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RESEARCH">Research</SelectItem>
                    <SelectItem value="DEVELOPMENT">Development</SelectItem>
                    <SelectItem value="ACADEMIC">Academic</SelectItem>
                    <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isVisible"
                  checked={formData.isVisible}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isVisible: checked }))}
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
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <Button type="button" variant="outline" className="w-full bg-transparent">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Upload project photos and documents</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex gap-4 pt-6 border-t">
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
          Save Project
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
