"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Share2, Twitter, Facebook } from "lucide-react"

export function SocialSharingCard() {
  const shareUrl = encodeURIComponent(window?.location?.href || "")
  const shareText = encodeURIComponent("Check out this amazing Autonomous Drone System project!")

  const socialLinks = [
    {
      name: "Twitter/X",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      color: "hover:bg-black hover:text-white",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      name: "Medium",
      icon: () => (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      ),
      url: `https://medium.com/new-story?url=${shareUrl}`,
      color: "hover:bg-green-600 hover:text-white",
    },
    {
      name: "Dribbble",
      icon: () => (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.5 2.252 3.5 2.273 5.698-.653-.126-7.512-1.538-7.512-1.538s-.04-.005-.088-.005c-.048 0-.088.005-.088.005S6.64 8.924 5.987 8.798c.021-2.198.873-4.198 2.273-5.698C9.64 4.302 10.8 4.8 12 4.8s2.36-.498 3.74-1.498z" />
        </svg>
      ),
      url: `https://dribbble.com/shots/new?url=${shareUrl}`,
      color: "hover:bg-pink-500 hover:text-white",
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
                onClick={() => window.open(social.url, "_blank", "noopener,noreferrer")}
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
