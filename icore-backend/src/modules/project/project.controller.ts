import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  ParseUUIDPipe,
  Query,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { Project, User } from '@prisma/client';
import { CreateProjectInput } from './dto/createProject.input';
import { UpdateProjectInput } from './dto/updateProject.input';
import { AddMemberInput, AddGuestMemberInput, UpdateMemberRoleInput } from './dto/member.input';
import { MemberResponse, GuestMemberResponse } from './dto/member.response';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectResponse } from './dto/project-response';
import { PublicProjectResponse } from './dto/public-project.response';

@ApiTags('Projects')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  private mapToPublicResponse(project: Project & { owner: { id: string; username: string }, members: any[], guestMembers: any[] }): PublicProjectResponse {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      type: project.type,
      startDate: project.startDate,
      endDate: project.endDate || undefined,
      tags: project.tags,
      techDetails: project.techDetails || undefined,
      technologies: project.technologies,
      photos: project.photos,
      documents: project.documents,
      papers: project.papers,
      references: project.references,
      youtubeURL: project.youtubeURL || undefined,
      websiteURL: project.websiteURL || undefined,
      githubURL: project.githubURL || undefined,
      isVisible: project.isVisible,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      owner: {
        id: project.owner.id,
        username: project.owner.username
      },
      membersCount: project.members.length,
      guestMembersCount: project.guestMembers.length
    };
  }

  // -------------------------
  // Public Routes (STATIC FIRST)
  // -------------------------

  @Get('public/all')
  @ApiOperation({ summary: 'Get all public projects' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'tags', required: false, isArray: true })
  @ApiResponse({ status: 200, description: 'List of public projects', type: [PublicProjectResponse] })
  async findAllPublic(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('type') type?: string,
    @Query('tags') tags?: string[],
  ) {
    if (tags && tags.length > 5) {
      throw new BadRequestException('Too many tags provided. Maximum is 5.');
    }
    if (page && page < 1) {
      throw new BadRequestException('Page number must be greater than 0.');
    }

    const result = await this.projectService.findAllPublicProjects(
      Number(page) || 1,
      Number(limit) || 10,
      search,
      type,
      tags,
    );

    return {
      projects: result.projects.map(project => this.mapToPublicResponse(project)),
      total: result.total,
      hasMore: result.hasMore
    };
  }

  @Get('public/user/:username')
  @ApiOperation({ summary: 'Get public projects by username' })
  @ApiParam({ name: 'username', description: 'Username' })
  @ApiResponse({ status: 200, description: 'List of public projects by user', type: [PublicProjectResponse] })
  async findPublicByUsername(@Param('username') username: string) {
    const projects = await this.projectService.findPublicProjectsByUsername(username);
    return projects.map(project => this.mapToPublicResponse(project));
  }

  @Get('public/:id')
  @ApiOperation({ summary: 'Get public project by ID' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({ status: 200, description: 'Project found', type: PublicProjectResponse })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async findPublicOne(@Param('id', ParseUUIDPipe) id: string): Promise<PublicProjectResponse> {
    const project = await this.projectService.findOneById(id);
    if (!project || !project.isVisible) {
      throw new NotFoundException('Project not found or not publicly visible');
    }
    const projectWithDetails = await this.projectService.findOneWithDetails(id);
    return this.mapToPublicResponse(projectWithDetails);
  }

  // -------------------------
  // Authenticated Routes
  // -------------------------

  @Get('user-projects/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all projects for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'List of user projects', type: [ProjectResponse] })
  async findUserProjects(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.projectService.findUserProjects(userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all projects with pagination and filters' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'tags', required: false, isArray: true })
  @ApiResponse({ status: 200, description: 'List of projects', type: [ProjectResponse] })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('type') type?: string,
    @Query('tags') tags?: string[],
  ) {
    if (tags && tags.length > 5) {
      throw new BadRequestException('Too many tags provided. Maximum is 5.');
    }
    if (page && page < 1) {
      throw new BadRequestException('Page number must be greater than 0.');
    }

    return this.projectService.findAll(
      Number(page) || 1,
      Number(limit) || 10,
      search,
      type,
      tags,
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'Project successfully created', type: ProjectResponse })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() createProjectInput: CreateProjectInput,
    @CurrentUser() user: User,
  ): Promise<Project> {
    return this.projectService.create(createProjectInput, user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get project by ID (requires authentication)' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({ status: 200, description: 'Project found', type: ProjectResponse })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Project> {
    return this.projectService.findOneById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update project by ID' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({ status: 200, description: 'Project updated successfully', type: ProjectResponse })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectInput: UpdateProjectInput,
    @CurrentUser() user: User,
  ): Promise<Project> {
    const project = await this.projectService.findOneById(id);
    if (!project) throw new NotFoundException('Project not found');
    if (project.ownerId !== user.id) throw new ForbiddenException('You do not have permission to update this project');
    return this.projectService.update(id, updateProjectInput);
  }

  // -------------------------
  // Member & Guest Management
  // -------------------------

  @Post(':id/member')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a member to a project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  async addMember(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() addMemberInput: AddMemberInput,
    @CurrentUser() user: User,
  ) {
    const project = await this.projectService.findOneById(id);
    if (project.ownerId !== user.id) throw new ForbiddenException('Only project owner can add members');
    return this.projectService.addMember(id, addMemberInput);
  }

  @Post(':id/guest-member')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a guest member to a project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  async addGuestMember(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() addGuestMemberInput: AddGuestMemberInput,
    @CurrentUser() user: User,
  ) {
    const project = await this.projectService.findOneById(id);
    if (project.ownerId !== user.id) throw new ForbiddenException('Only project owner can add guest members');
    return this.projectService.addGuestMember(id, addGuestMemberInput);
  }

  @Patch(':id/member/:memberId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a member role in a project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiParam({ name: 'memberId', description: 'Member ID' })
  async updateMemberRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('memberId', ParseUUIDPipe) memberId: string,
    @Body() updateMemberInput: UpdateMemberRoleInput,
    @CurrentUser() user: User,
  ) {
    return this.projectService.updateMemberRole(id, memberId, updateMemberInput);
  }

  @Delete(':id/member/:memberId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a member from a project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiParam({ name: 'memberId', description: 'Member ID' })
  async removeMember(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('memberId', ParseUUIDPipe) memberId: string,
    @CurrentUser() user: User,
  ) {
    return this.projectService.removeMember(id, memberId, user);
  }

  @Delete(':id/guest-member/:guestMemberId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a guest member from a project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiParam({ name: 'guestMemberId', description: 'Guest Member ID' })
  async removeGuestMember(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('guestMemberId', ParseUUIDPipe) guestMemberId: string,
    @CurrentUser() user: User,
  ) {
    return this.projectService.removeGuestMember(id, guestMemberId, user);
  }

  // -------------------------
  // Member Lists
  // -------------------------

  @Get(':id/members')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all members of a project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  async getProjectMembers(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.getProjectMembers(id);
  }

  @Get(':id/guest-members')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all guest members of a project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  async getProjectGuestMembers(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.getProjectGuestMembers(id);
  }
}
