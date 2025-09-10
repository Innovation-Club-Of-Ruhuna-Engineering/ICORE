import { ProjectType, Status } from '@prisma/client';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProjectInput } from './createProject.input';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @ApiPropertyOptional({
    description: 'Array of member user IDs and their roles',
    type: 'array',
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

  @ApiPropertyOptional({
    description: 'Array of guest members with their details',
    type: 'array',
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

  @ApiPropertyOptional({
    description: 'Array of Research papers for the project',
    type: [String],
    example: ['https://example.com/paper1', 'https://example.com/paper2'],
    maxItems: 5,
  })
  @IsArray()
  @IsString({
    each: true,
    message: 'Research papers must be an array of strings',
  })
  papers?: string[];

  @ApiPropertyOptional({
    description: 'Youtube URL of the project',
    minLength: 12,
    maxLength: 100,
    type: String,
  })
  @IsString({ message: 'Youtube URL must be a string' })
  @Length(10, 500, {
    message: 'Youtube URL must be between 12 and 100 characters',
  })
  youtubeURL?: string;

  @ApiPropertyOptional({
    description: 'Github URL of the project',
    minLength: 12,
    maxLength: 100,
    type: String,
  })
  @IsString({ message: 'Github URL must be a string' })
  @Length(10, 500, {
    message: 'Github URL must be between 12 and 100 characters',
  })
  githubURL?: string;

  @ApiPropertyOptional({
    description: 'Website URL of the project',
    minLength: 12,
    maxLength: 100,
    type: String,
  })
  @IsString({ message: 'Website URL must be a string' })
  @Length(10, 500, {
    message: 'Website URL must be between 12 and 100 characters',
  })
  websiteURL?: string;
}
