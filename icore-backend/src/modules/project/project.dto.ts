import { Project } from "generated/prisma";

export interface CreateProjectDto extends Omit<Project, 'id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateProjectDto extends Omit<Project, 'id' | 'createdAt' | 'updatedAt'> {}

export interface AddMemberDto {
  userId: string;
  role: 'LEADER' | 'MEMBER' | 'SUPERVISOR' | 'CONTRIBUTOR';
}

export interface AddGuestMemberDto {
  name: string;
  email: string;
  role: 'LEADER' | 'MEMBER' | 'SUPERVISOR' | 'CONTRIBUTOR';
}

export interface UpdateMemberRoleDto {
  role: 'LEADER' | 'MEMBER' | 'SUPERVISOR' | 'CONTRIBUTOR';
}

export interface ProjectResponse extends Omit<Project, 'ownerId'> {}