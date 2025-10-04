import { useState } from "react"
import { profileApi } from "@/lib/profile/profileMethods"
import { projectApi, type ProjectRole } from "@/lib/projects/projectMethods"

interface User {
  id: string
  name: string
  email: string
  username: string
}

interface NewMember {
  name: string
  email: string
  role: ProjectRole
  memberType: "guest" | "registered"
  selectedUser: User | null
}

export function useMemberManagement(
  projectId: string
): {
  allUsers: User[]
  filteredUsers: User[]
  showUserDropdown: boolean
  isLoadingUsers: boolean
  isAddingMember: boolean
  loadUsers: () => Promise<void>
  handleNameChange: (value: string, memberType: "guest" | "registered", onUpdate: (updates: Partial<NewMember>) => void) => void
  handleMemberTypeChange: (value: "guest" | "registered", onUpdate: (updates: Partial<NewMember>) => void) => void
  handleUserSelect: (user: User, onUpdate: (updates: Partial<NewMember>) => void) => void
  addMember: (newMember: NewMember, onReload: () => void) => Promise<void>
  removeRegisteredMember: (memberId: string, onRemoveSuccess: () => void) => Promise<void>
  removeGuestMember: (guestMember: any, onRemoveSuccess: () => void) => Promise<void>
  removeGuestMemberById: (guestMemberId: string, onRemoveSuccess: () => void) => Promise<void>
} {
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [isAddingMember, setIsAddingMember] = useState(false)

  // Load users for autocomplete
  const loadUsers = async () => {
    if (allUsers.length > 0) return // Don't reload if already loaded
    
    setIsLoadingUsers(true)
    try {
      const { data } = await profileApi.getAllUsers()
      const formattedUsers = data.map((user: any) => ({
        id: user.id,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
        email: user.email,
        username: user.username
      }))
      setAllUsers(formattedUsers)
    } catch (error) {
      console.error("Error loading users:", error)
      // Error will be handled by the component
    } finally {
      setIsLoadingUsers(false)
    }
  }

  // Handle name input change with autocomplete
  const handleNameChange = (
    value: string, 
    memberType: "guest" | "registered",
    onUpdate: (updates: Partial<NewMember>) => void
  ) => {
    onUpdate({ 
      name: value,
      selectedUser: null // Clear selection when typing
    })

    if (memberType === "registered") {
      if (value.includes('@') || value.length > 2) {
        // Load users if not already loaded
        if (allUsers.length === 0) {
          loadUsers()
        }
        
        // Filter users based on input
        const filtered = allUsers.filter(user => 
          user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase()) ||
          user.username.toLowerCase().includes(value.toLowerCase())
        )
        setFilteredUsers(filtered)
        setShowUserDropdown(filtered.length > 0)
      } else {
        setShowUserDropdown(false)
      }
    }
  }

  // Handle user selection from dropdown
  const handleUserSelect = (user: User, onUpdate: (updates: Partial<NewMember>) => void) => {
    onUpdate({
      name: user.name,
      email: user.email,
      selectedUser: user
    })
    setShowUserDropdown(false)
  }

  // Handle member type change
  const handleMemberTypeChange = (
    value: "guest" | "registered",
    onUpdate: (updates: Partial<NewMember>) => void
  ) => {
    onUpdate({
      memberType: value,
      name: "",
      email: "",
      selectedUser: null
    })
    setShowUserDropdown(false)
    
    // Load users when switching to registered member type
    if (value === "registered" && allUsers.length === 0) {
      loadUsers()
    }
  }

  // Add member
  const addMember = async (
    newMember: NewMember,
    onReload: () => void
  ) => {
    const { name, email, role, memberType, selectedUser } = newMember
    
    if (!name.trim() || !email.trim()) {
      throw new Error("Name and email are required for adding a member")
    }

    if (memberType === "registered" && !selectedUser) {
      throw new Error("Please select a registered user from the dropdown")
    }

    setIsAddingMember(true)
    
    try {
      if (memberType === "registered" && selectedUser) {
        // For registered users, use the selectedUser's ID
        console.log("Adding registered member:", selectedUser)
        await projectApi.addMember(projectId, {
          userId: selectedUser.id,
          role
        })
        console.log("Registered member added successfully")
      } else {
        // For guest members, use the guest member API
        console.log("Adding guest member:", { name, email, role })
        await projectApi.addGuestMember(projectId, {
          name,
          email,
          role
        })
        console.log("Guest member added successfully")
      }
      
      // Reload data after successful addition
      console.log("Calling onReload...")
      await onReload()
      console.log("onReload completed")
    } catch (error: any) {
      console.error("Error adding member:", error)
      const errorMessage = error.response?.data?.message || `Failed to add ${memberType} member. Please try again.`
      throw new Error(errorMessage)
    } finally {
      setIsAddingMember(false)
    }
  }

  // Remove registered member
  const removeRegisteredMember = async (memberId: string, onRemoveSuccess: () => void) => {
    try {
      await projectApi.removeMember(projectId, memberId)
      onRemoveSuccess()
    } catch (error: any) {
      console.error("Error removing member:", error)
      const errorMessage = error.response?.data?.message || "Failed to remove member. Please try again."
      throw new Error(errorMessage)
    }
  }

  // Remove guest member by ID (more efficient)
  const removeGuestMemberById = async (guestMemberId: string, onRemoveSuccess: () => void) => {
    try {
      await projectApi.removeGuestMember(projectId, guestMemberId)
      onRemoveSuccess()
    } catch (error: any) {
      console.error("Error removing guest member:", error)
      onRemoveSuccess() // Still call onRemoveSuccess to update local state
      throw new Error("Failed to remove guest member from backend, but removed locally")
    }
  }

  // Remove guest member (legacy method using search)
  const removeGuestMember = async (guestMember: any, onRemoveSuccess: () => void) => {
    try {
      // First try to find the guest member in the backend and remove via API
      const { data } = await projectApi.getPrivateProjectById(projectId)
      const backendGuestMember = data.guestMembers?.find((m: any) => 
        m.name === guestMember.name && 
        m.email === guestMember.email && 
        m.role === guestMember.role
      )
      
      if (backendGuestMember?.id) {
        await projectApi.removeGuestMember(projectId, backendGuestMember.id)
      }
      
      onRemoveSuccess()
    } catch (error: any) {
      console.error("Error removing guest member:", error)
      onRemoveSuccess() // Still call onRemoveSuccess to update local state
      throw new Error("Failed to remove guest member from backend, but removed locally")
    }
  }

  return {
    allUsers,
    filteredUsers,
    showUserDropdown,
    isLoadingUsers,
    isAddingMember,
    loadUsers,
    handleNameChange,
    handleUserSelect,
    handleMemberTypeChange,
    addMember,
    removeRegisteredMember,
    removeGuestMember,
    removeGuestMemberById
  }
}