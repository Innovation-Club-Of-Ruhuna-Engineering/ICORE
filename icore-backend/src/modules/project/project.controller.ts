import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProjectDto, ProjectResponse, UpdateProjectDto } from './project.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from 'generated/prisma';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body(new ValidationPipe())
    createProjectDto: CreateProjectDto,
    @CurrentUser() user: User,
  ): Promise<ProjectResponse> {
    return await this.projectService.create(createProjectDto, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  // TODO: Add role-based guards (Only COMMITTEE can get all users)
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  // TODO: Add role-based guards (Only COMMITTEE can get any project)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ProjectResponse> {
    return this.projectService.findOneById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  // TODO: Add role-based guards (Only COMMITTEE can update any project)
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProjectDto: UpdateProjectDto): Promise<ProjectResponse> {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.remove(id);
  }
}
