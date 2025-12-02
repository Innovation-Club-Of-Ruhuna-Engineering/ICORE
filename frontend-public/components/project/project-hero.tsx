"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FormattedText } from "@/components/ui/formatted-text"
import { ChevronLeft, ChevronRight, Play, ImageIcon } from "lucide-react"

interface TeamMember {
  name: string
  initials: string
  username?: string
  email?: string
  avatarUrl?: string
  isGuest: boolean
}

interface ProjectHeroProps {
  title: string
  description: string
  publishedDate: string
  author: string
  teamMembers: TeamMember[]
  photos: string[]
  youtubeURL?: string
  websiteURL?: string
  githubURL?: string
}

export function ProjectHero({
  title,
  description,
  publishedDate,
  author,
  teamMembers,
  photos,
  youtubeURL,
  websiteURL,
  githubURL,
}: ProjectHeroProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(!!youtubeURL)

  const nextPhoto = useCallback(() => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }, [photos.length])

  const prevPhoto = useCallback(() => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }, [photos.length])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (photos.length > 1 && !showVideo) {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          prevPhoto()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          nextPhoto()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [photos.length, showVideo, nextPhoto, prevPhoto])

  return (
    <Card className="bg-[#ffffff] border-[#d9d9d9]">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
          <div className="flex-grow max-w-full md:max-w-[70%]">
            <h1 className="text-3xl font-bold text-[#000000] mb-3">{title}</h1>
            <FormattedText 
              text={description} 
              className="text-[#555555] mb-4 line-clamp-2 text-pretty"
            />
            <p className="text-sm text-[#a6a6a6]">
              Published on {publishedDate} by {author}
            </p>
          </div>
          <div className="flex md:flex-col gap-3 md:space-y-0 md:self-start">
            {websiteURL && (
              <Button
                className="bg-[#0d6efd] hover:bg-[#0d6efd]/90 text-white flex-1 md:flex-none md:w-40"
                onClick={() => window.open(websiteURL, "_blank")}
              >
                Live Demo
              </Button>
            )}
            {githubURL && (
              <Button
                variant="outline"
                className="border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd]/10 bg-transparent flex-1 md:flex-none md:w-40"
                onClick={() => window.open(githubURL, "_blank")}
              >
                View Code
              </Button>
            )}
            <Button 
              variant="outline" 
              className="border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd]/10 bg-transparent flex-1 md:flex-none md:w-40"
            >
              Collaborate?
            </Button>
          </div>
        </div>

        {/* Team Members */}
        <div className="flex items-center space-x-6 mb-8 flex-wrap gap-2">
          {teamMembers.map((member, index) => {
            const firstName = member.name.split(' ')[0]
            
            if (member.isGuest) {
              // Guest members are not clickable
              return (
                <div key={index} className="flex items-center space-x-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-[#f7f7f7] text-[#555555]">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-[#555555]">{firstName}</span>
                </div>
              )
            } else {
              // Registered members are clickable
              return (
                <a
                  key={index}
                  href={`/profile/${member.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors cursor-pointer"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback className="bg-[#f7f7f7] text-[#555555]">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-[#555555] hover:text-blue-600">{firstName}</span>
                </a>
              )
            }
          })}
        </div>

        {/* Media buttons have been moved below the media area */}

        <div className="rounded-lg overflow-hidden relative">
          {showVideo && youtubeURL ? (
            <div className="relative">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeURL.split("v=")[1]?.split("&")[0] || youtubeURL.split("/").pop()}`}
                title={title}
                className="w-full h-[400px]"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : photos.length > 0 ? (
            <div className="relative group">
              <Image
                src={photos[currentPhotoIndex] || "/placeholder.svg"}
                alt={`${title} - Image ${currentPhotoIndex + 1}`}
                width={1200}
                height={400}
                className="w-full h-[400px] object-cover"
              />
              {photos.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={prevPhoto}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={nextPhoto}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {photos.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentPhotoIndex ? "bg-white" : "bg-white/50"
                        }`}
                        onClick={() => setCurrentPhotoIndex(index)}
                      />
                    ))}
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Use ← → keys to navigate
                  </div>
                </>
              )}
            </div>
          ) : (
            <Image
              src="/backdrop.jpg"
              alt={title}
              width={1200}
              height={400}
              className="w-full h-[400px] object-cover"
            />
          )}
        </div>

        {/* Media toggle buttons moved here, after the media display */}
        {youtubeURL && photos.length > 0 && (
          <div className="flex items-center justify-end space-x-2 mt-4">
            <Button
              variant={showVideo ? "default" : "outline"}
              size="sm"
              className={showVideo ? "bg-[#0d6efd] text-white" : "border-[#d9d9d9] text-[#555555]"}
              onClick={() => setShowVideo(true)}
            >
              <Play className="h-4 w-4 mr-2" />
              Video
            </Button>
            <Button
              variant={!showVideo ? "default" : "outline"}
              size="sm"
              className={!showVideo ? "bg-[#0d6efd] text-white" : "border-[#d9d9d9] text-[#555555]"}
              onClick={() => setShowVideo(false)}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Images ({photos.length})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
