import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/config/database/database.service';
import { Project, User } from 'generated/prisma';
import { AddMemberInput, UpdateMemberInput } from './dto/projectMembers.dto';
import { AddGuestMemberInput } from './dto/projectMembers.dto';
import { CreateProjectInput } from './dto/createProject.input';
import { UpdateProjectInput } from './dto/updateProject.input';

@Injectable()
export class ProjectService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Creates a new project
   */
  async create(createProjectInput: CreateProjectInput, ownerId: string): Promise<Project> {
    try {
      const project = await this.databaseService.project.create({
        data: {
          ...createProjectInput,
          tags: createProjectInput.tags || [],
          owner: { connect: { id: ownerId } },
        },
      });

      // add owner as a member with 'MEMBER' role
      await this.addMember(project.id, { userId: ownerId, role: 'MEMBER' });

      return project;
    } catch (error) {
      console.error('Error creating project:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create project');
    }
  }

  /**
   * Retrieves all projects with pagination and filtering 
   */
  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    type?: string,
    tags?: string[],
  ): Promise<{ projects: Project[]}> {
    try {
      const where: any = {};

      // search for the given keyword in either the name or description of a project
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ];
      }

      if (type) {
        where.type = type;
      }

      if (tags && tags.length > 0) {
        where.tags = {
          hasSome: tags,
        };
      }

      const [projects] = await this.databaseService.$transaction([
        this.databaseService.project.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' }, // get most recent projects first
        }),
        this.databaseService.project.count({ where }),
      ]);

      return { projects };
    } catch (error) {
      console.error('Error retrieving projects:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve projects');
    }
  }

  /**
   * Finds a project by ID
   */
  async findOneById(id: string): Promise<Project> {
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
   * Find projects where the user is a member
   */
  async findUserProjects(userId: string): Promise<Project[]> {
    try {
      const projects = await this.databaseService.project.findMany({
        where: {
          members: {
            some: {
              userId,
            },
          },
        },
        orderBy: { createdAt: 'desc' }, // get most recent projects first
      });

      return projects;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve user projects');
    }
  }

  /**
   * Updates project information
   */
  async update(id: string, updateProjectInput: UpdateProjectInput): Promise<Project> {
    try {
      // TODO: Check if user has permission (Only owner can edit?)

      const updatedProject = await this.databaseService.project.update({
        where: { id },
        data: {
          ...updateProjectInput,
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
   * Update project visibility
   */
  async updateProjectVisibility(projectId: string, isVisible: boolean): Promise<Project> {
    try {
      await this.databaseService.project.update({
        where: { id: projectId },
        data: {
          isVisible,
          updatedAt: new Date(),
        },
      });
      const updatedProject = await this.findOneById(projectId);
      return updatedProject;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update project visibility');
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

  // ----------------------------- MEMBER RELATED FUNCTIONS ----------------------------- //
  /**
   * Add a registered user as a project member
   */
  async addMember(projectId: string, addMemberInput: AddMemberInput): Promise<{ message: string }> {
    try {
      await this.findOneById(projectId);
      // TODO: Check if user has permission (Only owner can edit?)

      // Check if user exists
      const user = await this.databaseService.user.findUnique({
        where: { id: addMemberInput.userId },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      // Check if user is already a member
      const existingMember = await this.databaseService.member.findFirst({
        where: {
          projectId,
          userId: addMemberInput.userId,
        },
      });

      if (existingMember) {
        throw new ConflictException('User is already a member of this project');
      }

      await this.databaseService.member.create({
        data: {
          projectId,
          userId: addMemberInput.userId,
          role: addMemberInput.role,
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
  async addGuestMember(projectId: string, addGuestMemberInput: AddGuestMemberInput): Promise<{ message: string }> {
    try {
      await this.findOneById(projectId);
      // TODO: Check if user has permission (Only owner can edit?)

      // Check if guest member with same email already exists
      const existingGuestMember = await this.databaseService.guestMember.findFirst({
        where: {
          projectId,
          email: addGuestMemberInput.email.toLowerCase(),
        },
      });

      if (existingGuestMember) {
        throw new ConflictException('Guest member with this email already exists in this project');
      }

      await this.databaseService.guestMember.create({
        data: {
          ...addGuestMemberInput,
          email: addGuestMemberInput.email.toLowerCase(),
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
  async updateMemberRole(projectId: string, memberId: string, updateMemberInput: UpdateMemberInput): Promise<{ message: string }> {
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
          role: updateMemberInput.role,
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

  // TODO: Update references

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

  /**
   * Get all members of a project
   */
  async getProjectMembers(projectId: string): Promise<User[]> {
    try {
      await this.findOneById(projectId);
      const members = await this.databaseService.member.findMany({
        where: { projectId },
        include: { user: true }, // Include user details
      });
      return members.map(member => member.user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve project members');
    }
  }

  /**
   * Get all guest members of a project
   */
  async getProjectGuestMembers(projectId: string): Promise<{ name: string; email: string; role: string }[]> {
    try {
      await this.findOneById(projectId);
      const guestMembers = await this.databaseService.guestMember.findMany({
        where: { projectId },
      });
      return guestMembers.map(guest => ({
        name: guest.name,
        email: guest.email,
        role: guest.role,
      }));
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve project guest members');
    }
  }

// ------------------------------------------------------------------------------------ //

  /** CONSIDER: How to handle project tags?
   * SUGGESTION:
   * When user creetes a project, they can add tags.
   * These tags will be stored in the database in a tags table.
   * Each project can have upto 5 tags.
   * */

}
