"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FormattedText } from "@/components/ui/formatted-text"
import { FileText, Download, ExternalLink } from "lucide-react"

interface ProjectTabsProps {
  description?: string
  techDetails?: string
  technologies?: string[]
  references?: string[]
  papers?: string[]
  documents?: string[]
}

export function ProjectTabs({
  description,
  techDetails,
  technologies = [],
  references = [],
  papers = [],
  documents = [],
}: ProjectTabsProps) {
  const renderFileList = (files: string[], title: string, icon: React.ReactNode) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-[#000000] mb-3 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      {files.length > 0 ? (
        <div className="grid gap-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-[#f7f7f7] rounded-lg border border-[#d9d9d9]"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#555555]" />
                <span className="text-sm text-[#555555] truncate">
                  {file.split("/").pop() || `${title.slice(0, -1)} ${index + 1}`}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-2 bg-transparent"
                  onClick={() => window.open(file, "_blank")}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-2 bg-transparent"
                  onClick={() => {
                    const link = document.createElement("a")
                    link.href = file
                    link.download = file.split("/").pop() || "download"
                    link.click()
                  }}
                >
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#a6a6a6] text-sm">No {title.toLowerCase()} available</p>
      )}
    </div>
  )

  return (
    <Card className="bg-[#ffffff] border-[#d9d9d9]">
      <CardContent className="p-0">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#f7f7f7] rounded-none border-b border-[#d9d9d9]">
            <TabsTrigger value="description" className="text-sm">
              Description
            </TabsTrigger>
            <TabsTrigger value="technical" className="text-sm">
              Technical Details
            </TabsTrigger>
            <TabsTrigger value="papers" className="text-sm">
              Papers
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-sm">
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="p-6">
            <div>
              <h2 className="text-2xl font-bold text-[#000000] mb-4">What is this project about?</h2>
              <FormattedText 
                text={description} 
                fallback="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
                className="text-[#555555] leading-relaxed"
              />
            </div>
          </TabsContent>

          <TabsContent value="technical" className="p-6">
            <div>
              <h2 className="text-2xl font-bold text-[#000000] mb-4">Technical Details</h2>
              <FormattedText 
                text={techDetails} 
                fallback="Technical specifications and implementation details will be displayed here."
                className="text-[#555555] leading-relaxed mb-6"
              />

              {technologies.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-[#000000] mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="bg-[#ecf0ff] text-[#0d6efd]">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="papers" className="p-6">
            <div>
              <h2 className="text-2xl font-bold text-[#000000] mb-4">Research Papers</h2>
              {renderFileList(papers, "Papers", <FileText className="h-5 w-5" />)}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="p-6">
            <div>
              <h2 className="text-2xl font-bold text-[#000000] mb-4">Resources & Documents</h2>
              {renderFileList(references, "References", <ExternalLink className="h-5 w-5" />)}
              {renderFileList(documents, "Documents", <FileText className="h-5 w-5" />)}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
