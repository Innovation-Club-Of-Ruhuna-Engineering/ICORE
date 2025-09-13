import { type PublicProject, type ProjectRole, type ProjectType, type Status } from "./projectMethods"

export interface ProjectFormData {
  name: string;
  about: string;
  description: string;
  type: string;
  startDate: string;
  endDate?: string;
  tags: string[];
  details?: string;
  technologies: string[];
  youtubeURL?: string;
  websiteURL?: string;
  githubURL?: string;
  isVisible: boolean;
}

export interface ProjectFormProps {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
}

export interface ProjectViewData extends Omit<PublicProject, 'startDate' | 'endDate' | 'createdAt' | 'updatedAt'> {
  startDate: string
  endDate?: string
  createdAt: string
  updatedAt: string
  references: string[]
  papers: string[]
  documents: string[]
  githubURL?: string
  members: {
    id: string
    name: string
    email: string
    role: ProjectRole
    avatar?: string
  }[]
  guestMembers: {
    id: string
    name: string
    email: string
    role: ProjectRole
  }[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface ProjectTab {
  id: string
  label: string
  content: React.ReactNode
}

export interface ProjectHeaderProps {
  project: ProjectViewData
  isOwner: boolean
}

export interface ProjectSidebarProps {
  project: ProjectViewData
  supervisor?: string
}

export interface ProjectTabsProps {
  tabs: ProjectTab[]
  defaultTab: string
}