"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Comment {
  id: string
  author: string
  authorInitials: string
  authorAvatar?: string
  content: string
  timestamp: string
}

interface DiscussionSectionProps {
  comments: Comment[]
  onReply?: (commentId: string) => void
}

export function DiscussionSection({ comments, onReply }: DiscussionSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#000000] mb-4">Discussion</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="bg-[#f7f7f7] border-[#d9d9d9]">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-[#d9d9d9]">{comment.authorInitials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-[#000000]">{comment.author}</span>
                    <span className="text-sm text-[#a6a6a6]">{comment.timestamp}</span>
                  </div>
                  <p className="text-[#555555] text-sm leading-relaxed mb-3">{comment.content}</p>
                  <Button
                    className="bg-[#0d6efd] hover:bg-[#0d6efd]/90 text-white text-sm px-6"
                    onClick={() => onReply?.(comment.id)}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
