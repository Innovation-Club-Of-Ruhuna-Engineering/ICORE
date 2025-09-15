import { ProjectType, Status } from '@prisma/client';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectInput {
  @ApiProperty({
    description: 'Name of the project',
    type: String,
    example: 'AI Image Recognition System',
  })
  @IsNotEmpty({ message: 'Project name is required' })
  @IsString({ message: 'Project name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the project',
    type: String,
    example: 'A deep learning based image recognition system using TensorFlow',
  })
  @IsNotEmpty({ message: 'Project description is required' })
  @IsString({ message: 'Project description must be a string' })
  description: string;

  @ApiProperty({
    description: 'Project type',
    enum: ProjectType,
    example: 'DEVELOPMENT',
  })
  @IsNotEmpty({ message: 'Project type is required' })
  type: ProjectType;

  @ApiProperty({
    description: 'Start date of the project in ISO format',
    example: '2025-09-15T00:00:00Z',
  })
  @IsNotEmpty({ message: 'Start date is required' })
  @IsDateString({}, { message: 'Start date must be a valid ISO date string' })
  startDate: string;

  @ApiProperty({
    description: 'End date of the project in ISO format (optional)',
    required: false,
    example: '2026-09-15T00:00:00Z',
  })
  @IsOptional()
  @IsDateString({}, { message: 'End date must be a valid ISO date string' })
  endDate?: string;

  @ApiProperty({
    description: 'Array of tags for the project',
    type: [String],
    example: ['AI', 'Machine Learning', 'Computer Vision'],
    maxItems: 5,
  })
  @IsOptional()
  @IsArray({ message: 'Tags must be an array' })
  @IsString({ each: true })
  @ArrayMaxSize(5, { message: 'Maximum 5 tags allowed' })
  tags?: string[];

  @ApiProperty({
    description: 'Technical details about the project',
    required: false,
    example: 'Built using TensorFlow 2.0 with custom CNN architecture',
  })
  @IsOptional()
  @IsString({ message: 'Technical details must be a string' })
  techDetails?: string;

  @ApiProperty({
    description: 'Technologies used in the project',
    type: [String],
    example: ['Python', 'TensorFlow', 'OpenCV'],
  })
  @IsOptional()
  @IsArray({ message: 'Technologies must be an array' })
  @IsString({ each: true })
  technologies?: string[];

  @ApiProperty({
    description: 'References related to the project',
    type: [String],
    required: false,
    example: ['https://arxiv.org/abs/2023.12345'],
  })
  @IsOptional()
  @IsArray({ message: 'References must be an array' })
  @IsString({ each: true })
  references?: string[];

  @ApiProperty({
    description: 'Academic papers related to the project',
    type: [String],
    required: false,
    example: ['https://example.com/paper.pdf'],
  })
  @IsOptional()
  @IsArray({ message: 'Papers must be an array' })
  @IsString({ each: true })
  papers?: string[];

  @ApiProperty({
    description: 'Photo URLs related to the project',
    type: [String],
    required: false,
    example: ['https://example.com/project-image.jpg'],
  })
  @IsOptional()
  @IsArray({ message: 'Photos must be an array' })
  @IsString({ each: true })
  photos?: string[];

  @ApiProperty({
    description: 'Document URLs related to the project',
    type: [String],
    required: false,
    example: ['https://example.com/documentation.pdf'],
  })
  @IsOptional()
  @IsArray({ message: 'Documents must be an array' })
  @IsString({ each: true })
  documents?: string[];

  @ApiProperty({
    description: 'YouTube video URL for the project',
    required: false,
    example: 'https://youtube.com/watch?v=example',
  })
  @IsOptional()
  @IsUrl({ protocols: ['http', 'https'] }, { message: 'Invalid YouTube URL' })
  youtubeURL?: string;

  @ApiProperty({
    description: 'Website URL for the project',
    required: false,
    example: 'https://project-demo.example.com',
  })
  @IsOptional()
  @IsUrl({ protocols: ['http', 'https'] }, { message: 'Invalid website URL' })
  websiteURL?: string;

  @ApiProperty({
    description: 'GitHub repository URL for the project',
    required: false,
    example: 'https://github.com/username/project',
  })
  @IsOptional()
  @IsUrl({ protocols: ['http', 'https'] }, { message: 'Invalid GitHub URL' })
  githubURL?: string;

  @ApiProperty({
    description: 'Project visibility status',
    default: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'isVisible must be a boolean' })
  isVisible?: boolean;

  @ApiProperty({
    description: 'Project status',
    enum: Status,
    default: Status.PENDING,
    example: Status.PENDING,
  })
  @IsOptional()
  status?: Status;

  @ApiProperty({
    description: 'Array of project members',
    type: 'array',
    required: false,
    example: [
      {
        userId: 'user-uuid-1',
        role: 'SUPERVISOR'
      }
    ],
  })
  @IsOptional()
  @IsArray({ message: 'Members must be an array' })
  members?: { 
    userId: string; 
    role: 'LEADER' | 'MEMBER' | 'SUPERVISOR' | 'CONTRIBUTOR' 
  }[];

  @ApiProperty({
    description: 'Array of guest members',
    type: 'array',
    required: false,
    example: [
      {
        name: 'Dr. Jane Smith',
        email: 'jane.smith@university.edu',
        role: 'SUPERVISOR'
      }
    ],
  })
  @IsOptional()
  @IsArray({ message: 'Guest members must be an array' })
  guestMembers?: { 
    name: string; 
    email: string; 
    role: 'LEADER' | 'MEMBER' | 'SUPERVISOR' | 'CONTRIBUTOR' 
  }[];
}
