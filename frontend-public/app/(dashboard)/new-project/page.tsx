"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { projectApi, type CreateProjectData, type ProjectType } from "@/lib/projects/projectMethods";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/userAuthContext";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Breadcrumb } from "@/components/project/breadcrumb";

export default function NewProjectPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "RESEARCH" as ProjectType,
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    tags: [] as string[],
    tagsInput: "",
    techDetails: "",
    technologies: [] as string[],
    technologiesInput: "",
    youtubeURL: "",
    websiteURL: "",
    githubURL: "",
    isVisible: true,
  });

  useEffect(() => {
    if (!loading && (!isAuthenticated || !user)) {
      router.push("/signin");
    }
  }, [loading, isAuthenticated, user, router]);

  const breadcrumbItems = [
    { label: "Projects", href: "/projects" },
    { label: "Create New Project" },
  ];

  const validateFormData = (data: typeof formData) => {
    const errors: string[] = [];

    if (!data.name || data.name.length < 5 || data.name.length > 50) {
      errors.push("Project name must be between 5 and 50 characters");
    }

    if (!data.description) {
      errors.push("Project description is required");
    }

    if (!data.startDate) {
      errors.push("Start date is required");
    }

    if (data.tags.length > 5) {
      errors.push("You can add up to 5 tags");
    }

    const urlPattern = /^https?:\/\/.+/;
    if (data.youtubeURL && !urlPattern.test(data.youtubeURL)) {
      errors.push("YouTube URL must be a valid URL");
    }
    if (data.websiteURL && !urlPattern.test(data.websiteURL)) {
      errors.push("Website URL must be a valid URL");
    }
    if (data.githubURL && !urlPattern.test(data.githubURL)) {
      errors.push("GitHub URL must be a valid URL");
    }

    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validationErrors = validateFormData(formData);
      if (validationErrors.length > 0) {
        const errorMsg = validationErrors.join("\n");
        setError(errorMsg);
        toast.error(errorMsg, { duration: 4000 });
        setIsLoading(false);
        return;
      }

      const createData: CreateProjectData = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        startDate: new Date(formData.startDate).toISOString(),
        tags: formData.tags,
        techDetails: formData.techDetails?.trim() || "",
        technologies: formData.technologies,
        isVisible: formData.isVisible,
      };

      if (formData.endDate?.trim()) {
        createData.endDate = new Date(formData.endDate.trim()).toISOString();
      }

      const urlFields = ["youtubeURL", "websiteURL", "githubURL"] as const;
      for (const field of urlFields) {
        const url = formData[field]?.trim();
        if (url) {
          try {
            new URL(url);
            createData[field] = url;
          } catch {
            toast.error(`${field} must be a valid URL starting with http:// or https://`, { duration: 4000 });
            setIsLoading(false);
            return;
          }
        }
      }

      await projectApi.createProject(createData);
      toast.success("Project created successfully!", { duration: 3000 });
      router.push("/me");
      router.refresh();
    } catch (error) {
      console.error("Error creating project:", error);
      setError("Failed to create project. Please try again later.");
      toast.error("Failed to create project. Please try again later.", { duration: 4000 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Checking authentication...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
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
        {error && (
          <div className="mb-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error.split("\n").map((err, idx) => (
                  <div key={idx}>{err}</div>
                ))}
              </AlertDescription>
            </Alert>
          </div>
        )}

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
            <CardDescription>
              Fill in the details to create a new project
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name*</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter project name (5-50 characters)"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your project (10-500 characters)"
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Project Type*</Label>
                <select 
                  id="type"
                  name="type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.type}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setFormData(prev => ({
                      ...prev,
                      type: e.target.value as ProjectType
                    }));
                  }}
                  required
                >
                  <option value="RESEARCH">Research</option>
                  <option value="DESIGN">Design</option>
                  <option value="DEVELOPMENT">Development</option>
                  <option value="REXTRO_2025">Rextro 2025</option>
                  <option value="FYP">FYP</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date*</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="techDetails">Technical Details</Label>
                <Textarea
                  id="techDetails"
                  name="techDetails"
                  value={formData.techDetails}
                  onChange={handleChange}
                  placeholder="Enter technical details about your project"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated, max 5)</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="AI, Machine Learning, Web Development"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData(prev => ({ 
                      ...prev, 
                      tagsInput: value,
                      tags: value.split(',').map(tag => tag.trim()).filter(Boolean)
                    }));
                  }}
                  value={formData.tagsInput || formData.tags.join(', ')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies (comma separated)</Label>
                <Input
                  id="technologies"
                  name="technologies"
                  placeholder="Python, React, TensorFlow"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData(prev => ({ 
                      ...prev, 
                      technologiesInput: value,
                      technologies: value.split(',').map(tech => tech.trim()).filter(Boolean)
                    }));
                  }}
                  value={formData.technologiesInput || formData.technologies.join(', ')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="youtubeURL">YouTube URL</Label>
                <Input
                  id="youtubeURL"
                  name="youtubeURL"
                  value={formData.youtubeURL}
                  onChange={handleChange}
                  placeholder="https://youtube.com/..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="websiteURL">Website URL</Label>
                <Input
                  id="websiteURL"
                  name="websiteURL"
                  value={formData.websiteURL}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="githubURL">GitHub URL</Label>
                <Input
                  id="githubURL"
                  name="githubURL"
                  value={formData.githubURL}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repo"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isVisible"
                  name="isVisible"
                  checked={formData.isVisible}
                  onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Label htmlFor="isVisible">Make project publicly visible</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : "Create Project"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
