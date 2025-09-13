import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Member {
  id: string
  name: string
  email?: string
  role: 'LEADER' | 'MEMBER' | 'SUPERVISOR' | 'CONTRIBUTOR'
  avatar?: string
}

interface GuestMember {
  id: string
  name: string
  email: string
  role: 'LEADER' | 'MEMBER' | 'SUPERVISOR' | 'CONTRIBUTOR'
}

interface MemberAvatarsProps {
  members: Member[]
  guestMembers?: GuestMember[]
  maxDisplay?: number
  className?: string
}

export function MemberAvatars({ members, guestMembers = [], maxDisplay = 6, className }: MemberAvatarsProps) {
  const allMembers = [...members, ...guestMembers]
  const displayMembers = allMembers.slice(0, maxDisplay)
  const remainingCount = allMembers.length - maxDisplay

  const getAvatarUrl = (member: Member | GuestMember) => {
    return 'avatar' in member ? member.avatar : undefined
  }

  const getRoleColor = (role: Member['role']) => {
    switch (role) {
      case 'LEADER':
        return 'text-blue-600'
      case 'SUPERVISOR':
        return 'text-purple-600'
      case 'CONTRIBUTOR':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-3">
        <h3 className="font-semibold text-foreground">Team Members</h3>
        <Badge variant="secondary">{allMembers.length}</Badge>
      </div>

      <div className="flex flex-wrap gap-3">
        {displayMembers.map((member) => (
          <div 
            key={member.id} 
            className="flex items-center gap-2 bg-muted/50 hover:bg-muted/70 transition-colors rounded-lg p-2"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={getAvatarUrl(member) || "/placeholder-avatar.png"} alt={member.name} />
              <AvatarFallback className="bg-blue-500 text-white text-xs">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{member.name}</span>
              <span className={cn("text-xs font-medium", getRoleColor(member.role))}>
                {member.role.charAt(0) + member.role.slice(1).toLowerCase()}
              </span>
            </div>
          </div>
        ))}

        {remainingCount > 0 && (
          <div className="flex items-center justify-center bg-muted hover:bg-muted/70 transition-colors rounded-lg p-2 min-w-[60px]">
            <span className="text-sm text-muted-foreground">+{remainingCount}</span>
          </div>
        )}
      </div>
    </div>
  )
}
