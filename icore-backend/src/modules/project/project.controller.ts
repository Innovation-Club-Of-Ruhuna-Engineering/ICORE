import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, ParseUUIDPipe, Query, BadRequestException } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { Project, User } from 'generated/prisma';
import { CreateProjectInput } from './dto/createProject.input';
import { UpdateProjectInput } from './dto/updateProject.input';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectResponse } from './dto/project-response';

@ApiTags('Projects')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

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
    return await this.projectService.create(createProjectInput, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all projects with pagination and filters' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
  @ApiQuery({ name: 'search', required: false, description: 'Search term' })
  @ApiQuery({ name: 'type', required: false, description: 'Project type' })
  @ApiQuery({ name: 'tags', required: false, description: 'Project tags', isArray: true })
  @ApiResponse({ status: 200, description: 'List of projects', type: [ProjectResponse] })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('type') type?: string,
    @Query('tags') tags?: string[], // sent as repeated query params
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

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
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
    @Body() updateProjectInput: UpdateProjectInput): Promise<Project> {
    return this.projectService.update(id, updateProjectInput);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update project members by ID' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({ status: 200, description: 'Project updated successfully', type: ProjectResponse })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async updateMembers(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProjectInput: UpdateProjectInput): Promise<Project> {
    return this.projectService.update(id, updateProjectInput);
  }

  @Get('user-projects/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all projects for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'List of user projects', type: [ProjectResponse] })
  async findUserProjects(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.projectService.findUserProjects(userId);
  }

  @Post(':id/member')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a member to a project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  async addMember(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() addMemberInput: any, // Should be AddMemberInput
    @CurrentUser() user: User,
  ) {
    return this.projectService.addMember(id, addMemberInput);
  }

  @Post(':id/guest-member')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a guest member to a project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  async addGuestMember(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() addGuestMemberInput: any, // Should be AddGuestMemberInput
    @CurrentUser() user: User,
  ) {
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
    @Body() updateMemberInput: any, // Should be UpdateMemberInput
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
