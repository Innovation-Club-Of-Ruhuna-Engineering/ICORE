import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectType, Status } from '@prisma/client';
import { UserResponse } from '../../user/dto/user-response';
import { MemberResponse, GuestMemberResponse } from './projectMembers.dto';

export class ProjectResponse {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Project unique identifier',
  })
  id: string;

  @ApiProperty({
    example: 'Smart IoT Agriculture System',
    description: 'Project name',
  })
  name: string;

  @ApiProperty({
    example:
      'An IoT-based system for monitoring and automating agricultural processes',
    description: 'Short public description of the project',
  })
  about: string;

  @ApiProperty({
    example:
      'Detailed technical description of the agricultural monitoring system...',
    description: 'Detailed description of the project',
  })
  description: string;

  @ApiProperty({
    enum: ProjectType,
    example: ProjectType.RESEARCH,
    description: 'Type of the project',
  })
  type: ProjectType;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Project start date',
  })
  startDate: Date;

  @ApiPropertyOptional({
    example: '2024-12-31T00:00:00.000Z',
    description: 'Project end date',
    nullable: true,
  })
  endDate: Date | null;

  @ApiProperty({
    example: ['IoT', 'Agriculture', 'Automation'],
    description: 'Project tags',
  })
  tags: string[];

  @ApiPropertyOptional({
    example: 'Technical specifications and implementation details',
    description: 'Technical details about the project',
    nullable: true,
  })
  details: string | null;

  @ApiProperty({
    example: ['React', 'Node.js', 'Arduino'],
    description: 'Technologies used in the project',
  })
  technologies: string[];

  @ApiProperty({
    example: [
      'https://example.com/reference1',
      'https://example.com/reference2',
    ],
    description: 'Reference links',
  })
  references: string[];

  @ApiProperty({
    example: ['https://example.com/paper1.pdf'],
    description: 'Research paper links',
  })
  papers: string[];

  @ApiProperty({
    example: ['https://storage.example.com/photo1.jpg'],
    description: 'Project photo links',
  })
  photos: string[];

  @ApiProperty({
    example: ['https://storage.example.com/doc1.pdf'],
    description: 'Project document links',
  })
  documents: string[];

  @ApiPropertyOptional({
    example: 'https://youtube.com/watch?v=123456',
    description: 'Project YouTube video URL',
    nullable: true,
  })
  youtubeURL: string | null;

  @ApiPropertyOptional({
    example: 'https://project-website.com',
    description: 'Project website URL',
    nullable: true,
  })
  websiteURL: string | null;

  @ApiPropertyOptional({
    example: 'https://github.com/username/project',
    description: 'Project GitHub repository URL',
    nullable: true,
  })
  githubURL: string | null;

  @ApiProperty({
    description: 'Project owner information',
  })
  owner: UserResponse;

  @ApiProperty({
    type: [MemberResponse],
    description: 'Project members who are registered users',
  })
  members: MemberResponse[];

  @ApiProperty({
    type: [GuestMemberResponse],
    description: 'Project members who are not registered users',
  })
  guestMembers: GuestMemberResponse[];

  @ApiProperty({
    example: true,
    description: 'Whether the project is visible to the public',
  })
  visible: boolean;

  @ApiProperty({
    enum: Status,
    example: Status.PENDING,
    description: 'Project status',
  })
  status: Status;

  @ApiProperty({
    example: true,
    description: 'Whether the project is currently visible to the public',
  })
  isVisible: boolean;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Project creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Last update timestamp',
  })
  updatedAt: Date;
}
