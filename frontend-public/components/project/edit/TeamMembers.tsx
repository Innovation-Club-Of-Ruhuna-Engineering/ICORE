import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, X } from "lucide-react"
import { type ProjectRole } from "@/lib/projects/projectMethods"
import toast from "react-hot-toast"

interface Member {
  id: string
  name: string
  email?: string
  role: ProjectRole
  avatarUrl?: string
}

interface GuestMember {
  name: string
  email: string
  role: ProjectRole
}

interface NewMember {
  name: string
  email: string
  role: ProjectRole
  memberType: "guest" | "registered"
  selectedUser: {id: string; name: string; email: string; username: string} | null
}

interface TeamMembersProps {
  members: Member[]
  guestMembers: GuestMember[]
  newMember: NewMember
  allUsers: Array<{id: string; name: string; email: string; username: string}>
  filteredUsers: Array<{id: string; name: string; email: string; username: string}>
  showUserDropdown: boolean
  isLoadingUsers: boolean
  isAddingMember: boolean
  onAddMember: () => Promise<void>
  onRemoveRegisteredMember: (memberId: string, index: number) => Promise<void>
  onRemoveGuestMember: (index: number) => Promise<void>
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onMemberChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onMemberTypeChange: (value: "guest" | "registered") => void
  onUserSelect: (user: {id: string; name: string; email: string; username: string}) => void
  onRoleChange: (role: ProjectRole) => void
}

export function TeamMembers({
  members,
  guestMembers,
  newMember,
  filteredUsers,
  showUserDropdown,
  isLoadingUsers,
  isAddingMember,
  onAddMember,
  onRemoveRegisteredMember,
  onRemoveGuestMember,
  onNameChange,
  onMemberChange,
  onMemberTypeChange,
  onUserSelect,
  onRoleChange,
  // allUsers is received but not used directly in this component
}: TeamMembersProps) {
  // Debug logging
  console.log("TeamMembers rendered with:", {
    members: members,
    guestMembers: guestMembers,
    membersCount: members.length,
    guestMembersCount: guestMembers.length
  })

  // Wrapper functions to show toast messages
  const handleAddMember = async () => {
    try {
      await onAddMember()
      toast.success("Member added successfully!")
    } catch {
      toast.error("Failed to add member")
    }
  }

  const handleRemoveRegisteredMember = async (memberId: string, index: number) => {
    try {
      await onRemoveRegisteredMember(memberId, index)
      toast.success("Member removed successfully!")
    } catch {
      toast.error("Failed to remove member")
    }
  }

  const handleRemoveGuestMember = async (index: number) => {
    try {
      await onRemoveGuestMember(index)
      toast.success("Guest member removed successfully!")
    } catch {
      toast.error("Failed to remove guest member")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>Add or edit project members</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing Registered Members */}
        {members.length > 0 && (
          <div className="space-y-2 mb-6">
            <Label>Current Registered Members</Label>
            <div className="border rounded-md divide-y">
              {members.map((member, index) => (
                <div key={index} className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>{member.role}</Badge>
                    {member.id && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveRegisteredMember(member.id, index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Guest Members */}
        {guestMembers.length > 0 && (
          <div className="space-y-2 mb-6">
            <Label>Guest Members</Label>
            <div className="border rounded-md divide-y">
              {guestMembers.map((member, index) => (
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
                      onClick={() => handleRemoveGuestMember(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Add New Member */}
        <div className="space-y-3 border-t pt-4">
          <Label>Add New Member</Label>
          
          {/* Member Type Selection */}
          <div>
            <Label htmlFor="memberType" className="text-xs">Member Type</Label>
            <Select 
              value={newMember.memberType} 
              onValueChange={onMemberTypeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select member type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="guest">Guest Member (Not registered in system)</SelectItem>
                <SelectItem value="registered">Registered User (Search by typing @ or name)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {newMember.memberType === "guest" 
                ? "Guest members are not registered users in the system" 
                : "Type @ or start typing a name to search for registered users"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative user-dropdown-container">
              <Label htmlFor="memberName" className="text-xs">
                {newMember.memberType === "registered" ? "Search User" : "Name"}
              </Label>
              <Input
                id="memberName"
                name="name"
                value={newMember.name}
                onChange={onNameChange}
                placeholder={
                  newMember.memberType === "registered" 
                    ? "Type @ or name to search users..." 
                    : "Member name"
                }
                autoComplete="off"
              />
              
              {/* User Dropdown for Registered Members */}
              {newMember.memberType === "registered" && showUserDropdown && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {isLoadingUsers ? (
                    <div className="p-3 text-center text-sm text-gray-500">
                      <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                      Loading users...
                    </div>
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <button
                        key={user.id}
                        type="button"
                        className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        onClick={() => onUserSelect(user)}
                      >
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400">@{user.username}</div>
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-center text-sm text-gray-500">
                      No users found. Try typing more characters.
                    </div>
                  )}
                </div>
              )}

              {/* Show selected user info for registered members */}
              {newMember.memberType === "registered" && newMember.selectedUser && (
                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                  <div className="font-medium text-blue-800">Selected User:</div>
                  <div className="text-blue-600">{newMember.selectedUser.name}</div>
                  <div className="text-blue-500">@{newMember.selectedUser.username}</div>
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="memberEmail" className="text-xs">Email</Label>
              <Input
                id="memberEmail"
                name="email"
                type="email"
                value={newMember.email}
                onChange={onMemberChange}
                placeholder={newMember.memberType === "registered" ? "user@example.com (must be registered)" : "guest@example.com"}
                readOnly={newMember.memberType === "registered" && newMember.selectedUser !== null}
              />
            </div>
          </div>
          
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Label htmlFor="memberRole" className="text-xs">Role</Label>
              <Select 
                value={newMember.role} 
                onValueChange={onRoleChange}
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
            <Button 
              type="button" 
              onClick={handleAddMember}
              disabled={isAddingMember}
            >
              {isAddingMember ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                `Add ${newMember.memberType === "registered" ? "User" : "Guest"}`
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}