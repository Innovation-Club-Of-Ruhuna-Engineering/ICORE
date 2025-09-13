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
    description: 'YouTube video URL for the project',
    type: String,
  })
  @IsOptional()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true }, 
    { message: 'YouTube URL must be a valid URL starting with http:// or https://' })
  youtubeURL?: string;

  @ApiPropertyOptional({
    description: 'Website URL for the project',
    type: String,
  })
  @IsOptional()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true }, 
    { message: 'Website URL must be a valid URL starting with http:// or https://' })
  websiteURL?: string;

  @ApiPropertyOptional({
    description: 'GitHub repository URL for the project',
    type: String,
  })
  @IsOptional()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true }, 
    { message: 'GitHub URL must be a valid URL starting with http:// or https://' })
  githubURL?: string;
}
