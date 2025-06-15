import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, ParseUUIDPipe, Query, BadRequestException } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { Project, User } from 'generated/prisma';
import { CreateProjectInput } from './dto/createProject.input';
import { UpdateProjectInput } from './dto/updateProject.input';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createProjectInput: CreateProjectInput,
    @CurrentUser() user: User,
  ): Promise<Project> {
    return await this.projectService.create(createProjectInput, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
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
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Project> {
    return this.projectService.findOneById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProjectInput: UpdateProjectInput): Promise<Project> {
    return this.projectService.update(id, updateProjectInput);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.remove(id);
  }
}
