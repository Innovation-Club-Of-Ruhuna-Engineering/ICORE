"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Share2, Twitter, Facebook } from "lucide-react"

interface SocialSharingCardProps {
  projectTitle?: string
  projectDescription?: string
  projectUrl?: string
}

export function SocialSharingCard({ 
  projectTitle = "Check out this amazing project!",
  projectDescription = "",
  projectUrl 
}: SocialSharingCardProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareUrl = encodeURIComponent(projectUrl || currentUrl)
  const shareTitle = encodeURIComponent(projectTitle)
  const shareDescription = encodeURIComponent(projectDescription)
  const fullShareText = encodeURIComponent(`${projectTitle}${projectDescription ? ` - ${projectDescription}` : ''}`)

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: () => (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&title=${shareTitle}&summary=${shareDescription}`,
      color: "hover:bg-blue-700 hover:text-white",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${fullShareText}&url=${shareUrl}`,
      color: "hover:bg-black hover:text-white",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${fullShareText}`,
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      name: "WhatsApp",
      icon: () => (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
        </svg>
      ),
      url: `https://wa.me/?text=${fullShareText}%20${shareUrl}`,
      color: "hover:bg-green-500 hover:text-white",
    },
  ]

  return (
    <Card className="bg-[#ffffff] border-[#d9d9d9] shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Share2 className="h-4 w-4 text-[#0d6efd]" />
          <h3 className="font-semibold text-[#000000] text-sm">Share this project</h3>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-2">
          {socialLinks.map((social) => {
            const IconComponent = social.icon
            return (
              <Button
                key={social.name}
                size="sm"
                variant="outline"
                className={`flex items-center gap-2 justify-start p-3 h-auto border-[#d9d9d9] transition-colors ${social.color}`}
                onClick={() => {
                  window.open(social.url, "_blank", "noopener,noreferrer")
                }}
              >
                <IconComponent />
                <span className="text-xs font-medium">{social.name}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
