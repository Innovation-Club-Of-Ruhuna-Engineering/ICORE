import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AddGuestMemberDto, AddMemberDto, CreateProjectDto, ProjectResponse, UpdateMemberRoleDto, UpdateProjectDto } from './project.dto';
import { DatabaseService } from 'src/config/database/database.service';
import { User } from 'generated/prisma';

@Injectable()
export class ProjectService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Creates a new project
   */
  async create(createProjectDto: CreateProjectDto, ownerId: string): Promise<ProjectResponse> {
    try {
      // Check if project name already exists
      const existingProject = await this.databaseService.project.findUnique({
        where: { name: createProjectDto.name },
      });

      if (existingProject) {
        throw new ConflictException('Project with this name already exists');
      }

      const project = await this.databaseService.project.create({
        data: {
          ...createProjectDto,
          ownerId,
          references: createProjectDto.references || [],
          tags: createProjectDto.tags || [],
        },
      });

      // Ensure owner is also added as a member with 'OWNER' role
      await this.addMember(project.id, { userId: ownerId, role: 'MEMBER' });

      return project;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create project');
    }
  }

  /**
   * Retrieves all projects without pagination or filtering
   */
  async findAll(): Promise<ProjectResponse[]> {
    try {
      const projects = await this.databaseService.project.findMany({
        orderBy: { createdAt: 'desc' },
      });

      return projects;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve projects');
    }
  }

  /**
   * Finds a project by ID
   */
  async findOneById(id: string): Promise<ProjectResponse> {
    try {
      const project = await this.databaseService.project.findUnique({
        where: { id },
      });

      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }

      return project;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to find project');
    }
  }

  /**
   * Updates project information
   */
  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectResponse> {
    try {
      const project = await this.findOneById(id);

      // TODO: Check if user has permission (Only owner can edit?)

      // If updating name, check for conflicts
      if (updateProjectDto.name && updateProjectDto.name !== project.name) {
        const existingProject = await this.databaseService.project.findUnique({
          where: { name: updateProjectDto.name },
        });

        if (existingProject) {
          throw new ConflictException('Project with this name already exists');
        }
      }

      const updatedProject = await this.databaseService.project.update({
        where: { id },
        data: {
          ...updateProjectDto,
          updatedAt: new Date(),
        },
      });

      return updatedProject;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update project');
    }
  }

  /**
   * Delete project from database
   */
  async remove(id: string): Promise<{ message: string }> {
    try {
      await this.findOneById(id);
      // TODO: Check if user has permission (Only owner can edit?)

      await this.databaseService.project.delete({
        where: { id },
      });

      return { message: 'Project deleted' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete project');
    }
  }

  /**
   * Add a registered user as a project member
   */
  async addMember(projectId: string, addMemberDto: AddMemberDto): Promise<{ message: string }> {
    try {
      await this.findOneById(projectId);
      // TODO: Check if user has permission (Only owner can edit?)

      // Check if user exists
      const user = await this.databaseService.user.findUnique({
        where: { id: addMemberDto.userId },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      // Check if user is already a member
      const existingMember = await this.databaseService.member.findFirst({
        where: {
          projectId,
          userId: addMemberDto.userId,
        },
      });

      if (existingMember) {
        throw new ConflictException('User is already a member of this project');
      }

      await this.databaseService.member.create({
        data: {
          projectId,
          userId: addMemberDto.userId,
          role: addMemberDto.role,
        },
      });

      return { message: 'Member added successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to add member');
    }
  }

  /**
   * Add a guest member to the project
   */
  async addGuestMember(projectId: string, addGuestMemberDto: AddGuestMemberDto, currentUser: User): Promise<{ message: string }> {
    try {
      await this.findOneById(projectId);
      // TODO: Check if user has permission (Only owner can edit?)

      // Check if guest member with same email already exists
      const existingGuestMember = await this.databaseService.guestMember.findFirst({
        where: {
          projectId,
          email: addGuestMemberDto.email.toLowerCase(),
        },
      });

      if (existingGuestMember) {
        throw new ConflictException('Guest member with this email already exists in this project');
      }

      await this.databaseService.guestMember.create({
        data: {
          ...addGuestMemberDto,
          email: addGuestMemberDto.email.toLowerCase(),
          projectId,
        },
      });

      return { message: 'Guest member added successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to add guest member');
    }
  }

  /**
   * Update member role
   */
  async updateMemberRole(projectId: string, memberId: string, updateMemberRoleDto: UpdateMemberRoleDto, currentUser: User): Promise<{ message: string }> {
    try {
      await this.findOneById(projectId);
      // TODO: Check if user has permission (Only owner can edit?)

      const member = await this.databaseService.member.findUnique({
        where: { id: memberId },
      });

      if (!member || member.projectId !== projectId) {
        throw new NotFoundException('Member not found in this project');
      }

      await this.databaseService.member.update({
        where: { id: memberId },
        data: {
          role: updateMemberRoleDto.role,
        },
      });

      return { message: 'Member role updated successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update member role');
    }
  }

  /**
   * Remove member from project
   */
  async removeMember(projectId: string, memberId: string, currentUser: User): Promise<{ message: string }> {
    try {
      await this.findOneById(projectId);
      // TODO: Check if user has permission (Only owner can edit?)

      const member = await this.databaseService.member.findUnique({
        where: { id: memberId },
      });

      if (!member || member.projectId !== projectId) {
        throw new NotFoundException('Member not found in this project');
      }

      await this.databaseService.member.delete({
        where: { id: memberId },
      });

      return { message: 'Member removed successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to remove member');
    }
  }

  /**
   * Remove guest member from project
   */
  async removeGuestMember(projectId: string, guestMemberId: string, currentUser: User): Promise<{ message: string }> {
    try {
      await this.findOneById(projectId);
      // TODO: Check if user has permission (Only owner can edit?)

      const guestMember = await this.databaseService.guestMember.findUnique({
        where: { id: guestMemberId },
      });

      if (!guestMember || guestMember.projectId !== projectId) {
        throw new NotFoundException('Guest member not found in this project');
      }

      await this.databaseService.guestMember.delete({
        where: { id: guestMemberId },
      });

      return { message: 'Guest member removed successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to remove guest member');
    }
  }

  // TODO: Get projects where user is a member

  /** CONSIDER: How to handle project tags?
   * SUGGESTION:
   * When user creeates a project, they can add tags.
   * These tags will be stored in the database in a tag table.
   * Each project can have upto 5 tags.
   * */ 

  
}
