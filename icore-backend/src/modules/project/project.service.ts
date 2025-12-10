import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/config/database/database.service';
import { Project, Status, User } from '@prisma/client';
import { AddMemberInput, UpdateMemberInput } from './dto/projectMembers.dto';
import { AddGuestMemberInput } from './dto/projectMembers.dto';
import { CreateProjectInput } from './dto/createProject.input';
import { UpdateProjectInput } from './dto/updateProject.input';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly storageService: StorageService,
  ) {}

  async findOneWithDetails(id: string) {
    const project = await this.databaseService.project.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
        },
        guestMembers: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return project;
  }

  /**
   * Creates a new project
   */
  async create(
    createProjectInput: CreateProjectInput,
    ownerId: string,
  ): Promise<Project> {
    try {
      // Extract members and guestMembers from input
      const { members, guestMembers, ...projectData } = createProjectInput;

      // Create the project with initial data
      const project = await this.databaseService.project.create({
        data: {
          ...projectData,
          tags: projectData.tags || [],
          technologies: projectData.technologies || [],
          references: projectData.references || [],
          papers: projectData.papers || [],
          photos: projectData.photos || [],
          documents: projectData.documents || [],
          isVisible: projectData.isVisible || false,
          status: projectData.status || Status.PENDING,
          owner: { connect: { id: ownerId } },
        },
      });

      // Create initial project membership for owner
      await this.databaseService.member.create({
        data: {
          projectId: project.id,
          userId: ownerId,
          role: 'LEADER', // Owner is always a leader
        },
      });

      // Add additional members if provided
      if (members && members.length > 0) {
        for (const member of members) {
          if (member.userId !== ownerId) {
            // Skip if it's the owner
            await this.addMember(project.id, member);
          }
        }
      }

      // Add guest members if provided
      if (guestMembers && guestMembers.length > 0) {
        for (const guestMember of guestMembers) {
          await this.addGuestMember(project.id, guestMember);
        }
      }

      // Return the complete project with all relationships
      // Return the created project
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
    status?: string,
    technologies?: string[],
    sortBy?: string,
    sortOrder?: string,
  ): Promise<{ projects: Project[] }> {
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

      if (status) {
        where.status = status;
      }

      if (technologies && technologies.length > 0) {
        where.technologies = {
          hasSome: technologies,
        };
      }

      // Build orderBy clause
      const orderBy: any = {};
      if (sortBy) {
        orderBy[sortBy] = sortOrder === 'asc' ? 'asc' : 'desc';
      } else {
        orderBy.createdAt = 'desc'; // default sorting
      }

      const [projects] = await this.databaseService.$transaction([
        this.databaseService.project.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy,
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
      throw new InternalServerErrorException(
        'Failed to retrieve user projects',
      );
    }
  }

  /**
   * Get public projects by username
   */
  async findPublicProjectsByUsername(
    username: string,
  ): Promise<
    (Project & {
      owner: { id: string; username: string };
      members: any[];
      guestMembers: any[];
    })[]
  > {
    try {
      const projects = await this.databaseService.project.findMany({
        where: {
          owner: {
            username: username,
          },
          isVisible: true,
          status: Status.ACTIVE,
        },
        include: {
          owner: {
            select: {
              id: true,
              username: true,
            },
          },
          members: {
            select: {
              id: true,
            },
          },
          guestMembers: {
            select: {
              id: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return projects;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to retrieve public projects',
      );
    }
  }

  /**
   * Get all public projects
   */
  async findAllPublicProjects(
    page: number = 1,
    limit: number = 10,
    search?: string,
    type?: string,
    tags?: string[],
    status?: string,
    technologies?: string[],
    sortBy?: string,
    sortOrder?: string,
  ): Promise<{
    projects: (Project & {
      owner: { id: string; username: string };
      members: any[];
      guestMembers: any[];
    })[];
    total: number;
    hasMore: boolean;
    currentPage: number;
    totalPages: number;
  }> {
    try {
      const where: any = {
        isVisible: true,
        status: Status.ACTIVE,
      };

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

      if (status) {
        where.status = status;
      }

      if (technologies && technologies.length > 0) {
        where.technologies = {
          hasSome: technologies,
        };
      }

      // Build orderBy clause
      const orderBy: any = {};
      if (sortBy) {
        orderBy[sortBy] = sortOrder === 'asc' ? 'asc' : 'desc';
      } else {
        orderBy.createdAt = 'desc'; // default sorting
      }

      const [projects, total] = await this.databaseService.$transaction([
        this.databaseService.project.findMany({
          where,
          include: {
            owner: {
              select: {
                id: true,
                username: true,
              },
            },
            members: {
              select: {
                id: true,
              },
            },
            guestMembers: {
              select: {
                id: true,
              },
            },
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy,
        }),
        this.databaseService.project.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        projects,
        total,
        hasMore: total > page * limit,
        currentPage: page,
        totalPages,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve user projects',
      );
    }
  }

  /**
   * Updates project information
   */
  async update(
    id: string,
    updateProjectInput: UpdateProjectInput,
  ): Promise<Project> {
    try {
      // TODO: Check if user has permission (Only owner can edit?)

      // Extract members and guestMembers from input
      const { members, guestMembers, ...projectData } = updateProjectInput;

      // Update project basic data
      const updatedProject = await this.databaseService.project.update({
        where: { id },
        data: {
          ...projectData,
          updatedAt: new Date(),
        },
      });

      // Update members if provided
      if (members) {
        // First, remove all existing members
        await this.databaseService.member.deleteMany({
          where: { projectId: id },
        });

        // Then add the new members
        for (const member of members) {
          await this.addMember(id, member);
        }
      }

      // Update guest members if provided
      if (guestMembers) {
        // First, remove all existing guest members
        await this.databaseService.guestMember.deleteMany({
          where: { projectId: id },
        });

        // Then add the new guest members
        for (const guestMember of guestMembers) {
          await this.addGuestMember(id, guestMember);
        }
      }

      return updatedProject;
    } catch (error) {
      console.error('Project Update Error:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update project');
    }
  }

  /**
   * Update project visibility
   */
  async updateProjectVisibility(
    projectId: string,
    isVisible: boolean,
  ): Promise<Project> {
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
      throw new InternalServerErrorException(
        'Failed to update project visibility',
      );
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
  async addMember(
    projectId: string,
    addMemberInput: AddMemberInput,
  ): Promise<{ message: string }> {
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
  async addGuestMember(
    projectId: string,
    addGuestMemberInput: AddGuestMemberInput,
  ): Promise<{ message: string }> {
    try {
      await this.findOneById(projectId);
      // TODO: Check if user has permission (Only owner can edit?)

      // Check if guest member with same email already exists
      const existingGuestMember =
        await this.databaseService.guestMember.findFirst({
          where: {
            projectId,
            email: addGuestMemberInput.email.toLowerCase(),
          },
        });

      if (existingGuestMember) {
        throw new ConflictException(
          'Guest member with this email already exists in this project',
        );
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
  async updateMemberRole(
    projectId: string,
    memberId: string,
    updateMemberInput: UpdateMemberInput,
  ): Promise<{ message: string }> {
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
  async removeMember(
    projectId: string,
    memberId: string,
    currentUser: User,
  ): Promise<{ message: string }> {
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
  async removeGuestMember(
    projectId: string,
    guestMemberId: string,
    currentUser: User,
  ): Promise<{ message: string }> {
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
  async getProjectMembers(projectId: string): Promise<
    {
      id: string;
      email: string;
      username: string;
      avatarUrl: string | null;
      firstName: string;
      role: string;
      memberId: string;
    }[]
  > {
    try {
      await this.findOneById(projectId);
      const members = await this.databaseService.member.findMany({
        where: { projectId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              username: true,
              avatarUrl: true,
              firstName: true,
              role: true,
            },
          },
        }, // Include only specific user details
      });
      return members.map((member) => ({
        ...member.user,
        role: member.role,
        memberId: member.id, // Include member ID for removal
      }));
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to retrieve project members',
      );
    }
  }

  /**
   * Get all guest members of a project
   */
  async getProjectGuestMembers(
    projectId: string,
  ): Promise<{ id: string; name: string; email: string; role: string }[]> {
    try {
      await this.findOneById(projectId);
      const guestMembers = await this.databaseService.guestMember.findMany({
        where: { projectId },
      });
      return guestMembers.map((guest) => ({
        id: guest.id,
        name: guest.name,
        email: guest.email,
        role: guest.role,
      }));
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to retrieve project guest members',
      );
    }
  }

  // ------------------------------------------------------------------------------------ //

  async uploadProjectImages(
    projectId: string,
    files: Express.Multer.File[],
    userId: string,
  ) {
    // First verify the project exists and user has permission
    const project = await this.findOneById(projectId);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Check if user is the owner of the project
    if (project.ownerId !== userId) {
      throw new BadRequestException('Only project owner can upload images');
    }

    // Use the storage service to upload images
    return await this.storageService.uploadProjectImages(projectId, files);
  }

  // ------------------------------------------------------------------------------------ //

  /**
   * Get available filter options for projects
   */
  async getFilterOptions(): Promise<{
    types: string[];
    statuses: string[];
    tags: string[];
    technologies: string[];
  }> {
    try {
      const [types, statuses, tags, technologies] =
        await this.databaseService.$transaction([
          // Get unique project types
          this.databaseService.project.findMany({
            where: { isVisible: true, status: Status.ACTIVE },
            select: { type: true },
            distinct: ['type'],
          }),
          // Get unique statuses
          this.databaseService.project.findMany({
            where: { isVisible: true },
            select: { status: true },
            distinct: ['status'],
          }),
          // Get all unique tags from visible projects
          this.databaseService.project.findMany({
            where: { isVisible: true, status: Status.ACTIVE },
            select: { tags: true },
          }),
          // Get all unique technologies from visible projects
          this.databaseService.project.findMany({
            where: { isVisible: true, status: Status.ACTIVE },
            select: { technologies: true },
          }),
        ]);

      // Extract and flatten tags and technologies
      const allTags = tags.flatMap((project) => project.tags);
      const allTechnologies = technologies.flatMap(
        (project) => project.technologies,
      );

      // Get unique values
      const uniqueTags = [...new Set(allTags)].sort();
      const uniqueTechnologies = [...new Set(allTechnologies)].sort();

      return {
        types: types.map((t) => t.type),
        statuses: statuses.map((s) => s.status),
        tags: uniqueTags,
        technologies: uniqueTechnologies,
      };
    } catch (error) {
      console.error('Error getting filter options:', error);
      throw new InternalServerErrorException(
        'Failed to retrieve filter options',
      );
    }
  }

  /** CONSIDER: How to handle project tags?
   * SUGGESTION:
   * When user creetes a project, they can add tags.
   * These tags will be stored in the database in a tags table.
   * Each project can have upto 5 tags.
   * */
}
