import { ProjectType, Status } from '@prisma/client';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectInput {
  @ApiProperty({
    description: 'Name of the project',
    minLength: 5,
    maxLength: 50,
    type: String,
  })
  @IsNotEmpty({ message: 'Project name is required' })
  @IsString({ message: 'Project name must be a string' })
  @Length(5, 50, {
    message: 'Project name must be between 5 and 50 characters',
  })
  name: string;

  @ApiProperty({
    description: 'Short public description of the project',
    minLength: 10,
    maxLength: 100,
    type: String,
  })
  @IsNotEmpty({ message: 'Project about section is required' })
  @IsString({ message: 'Project about section must be a string' })
  @Length(10, 100, {
    message: 'Project about section must be between 10 and 100 characters',
  })
  about: string;

  @ApiProperty({
    description: 'Detailed description of the project',
    minLength: 10,
    maxLength: 500,
    type: String,
  })
  @IsNotEmpty({ message: 'Project description is required' })
  @IsString({ message: 'Project description must be a string' })
  @Length(10, 500, {
    message: 'Project description must be between 10 and 500 characters',
  })
  description: string;

  @ApiProperty({
    description: 'Project type',
    enum: ProjectType,
    type: String,
  })
  @IsNotEmpty({ message: 'Project type is required' })
  @IsString({ message: 'Project type must be a string' })
  type: ProjectType;

  @ApiProperty({
    description: 'Start date of the project in ISO format',
    type: String,
    example: '2023-01-01T00:00:00Z',
  })
  @IsString({ message: 'Project timeline must be a string' })
  startDate: string;

  @ApiProperty({
    description: 'End date of the project in ISO format (optional)',
    type: String,
    example: '2023-12-31T23:59:59Z',
    required: false,
  })
  @IsString({ message: 'Project timeline must be a string' })
  endDate: string;

  @ApiProperty({
    description: 'Array of tags for the project',
    type: [String],
    example: ['AI', 'Web Development', 'Open Source'],
    maxItems: 5,
  })
  @IsArray({ message: 'Tags must be an array' })
  @IsString({ each: true, message: 'Tags must be an array of strings' })
  @ArrayMaxSize(5, { message: 'You can add up to 5 tags' })
  tags: string[];

  @ApiProperty({
    description: 'Additional details about the project',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'Project details must be a string' })
  details?: string;

  @ApiProperty({
    description: 'Technologies used in the project',
    type: [String],
    example: ['React', 'Node.js', 'PostgreSQL'],
  })
  @IsArray({ message: 'Technologies must be an array' })
  @IsString({ each: true, message: 'Technologies must be an array of strings' })
  technologies: string[];

  @ApiProperty({
    description: 'References related to the project',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'References must be an array' })
  @IsString({ each: true, message: 'References must be an array of strings' })
  references?: string[];

  @ApiProperty({
    description: 'Academic papers related to the project',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Papers must be an array' })
  @IsString({ each: true, message: 'Papers must be an array of strings' })
  papers?: string[];

  @ApiProperty({
    description: 'Photo URLs related to the project',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Photos must be an array' })
  @IsString({ each: true, message: 'Photos must be an array of strings' })
  photos?: string[];

  @ApiProperty({
    description: 'Document URLs related to the project',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Documents must be an array' })
  @IsString({ each: true, message: 'Documents must be an array of strings' })
  documents?: string[];

  @ApiProperty({
    description: 'YouTube video URL for the project',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsUrl({}, { message: 'YouTube URL must be a valid URL' })
  youtubeURL?: string;

  @ApiProperty({
    description: 'Website URL for the project',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsUrl({}, { message: 'Website URL must be a valid URL' })
  websiteURL?: string;

  @ApiProperty({
    description: 'GitHub repository URL for the project',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsUrl({}, { message: 'GitHub URL must be a valid URL' })
  githubURL?: string;

  @ApiProperty({
    description: 'Project visibility status',
    default: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'isVisible must be a boolean' })
  isVisible?: boolean;

  @ApiProperty({
    description: 'Project status',
    enum: Status,
    default: Status.PENDING,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  status?: Status;

  @ApiProperty({
    description: 'Array of member user IDs and their roles',
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        role: { type: 'string', enum: ['LEADER', 'MEMBER', 'SUPERVISOR', 'CONTRIBUTOR'] }
      }
    }
  })
  @IsOptional()
  @IsArray({ message: 'Members must be an array' })
  members?: { userId: string; role: 'LEADER' | 'MEMBER' | 'SUPERVISOR' | 'CONTRIBUTOR' }[];

  @ApiProperty({
    description: 'Array of guest members with their details',
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string', enum: ['LEADER', 'MEMBER', 'SUPERVISOR', 'CONTRIBUTOR'] }
      }
    }
  })
  @IsOptional()
  @IsArray({ message: 'Guest members must be an array' })
  guestMembers?: { name: string; email: string; role: 'LEADER' | 'MEMBER' | 'SUPERVISOR' | 'CONTRIBUTOR' }[];
}
