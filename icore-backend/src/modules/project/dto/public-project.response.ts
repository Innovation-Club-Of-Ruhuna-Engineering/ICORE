import { ApiProperty } from '@nestjs/swagger';
import { ProjectType, Status } from '@prisma/client';

export class PublicProjectResponse {
  @ApiProperty({ description: 'Project ID' })
  id: string;

  @ApiProperty({ description: 'Project name' })
  name: string;

  @ApiProperty({ description: 'Detailed description of the project' })
  description: string;

  @ApiProperty({ description: 'Type of project', enum: ProjectType })
  type: ProjectType;

  @ApiProperty({ description: 'Project start date' })
  startDate: Date;

  @ApiProperty({ description: 'Project end date', required: false })
  endDate?: Date;

  @ApiProperty({ description: 'Project tags', type: [String] })
  tags: string[];

  @ApiProperty({ description: 'Technical details about the project', required: false })
  techDetails?: string;

  @ApiProperty({ description: 'Technologies used in the project', type: [String] })
  technologies: string[];

  @ApiProperty({ description: 'Research papers related to the project', type: [String] })
  papers: string[];

  @ApiProperty({ description: 'Project documentation files', type: [String] })
  documents: string[];

  @ApiProperty({ description: 'Reference links and materials', type: [String] })
  references: string[];

  @ApiProperty({ description: 'Project photos', type: [String] })
  photos: string[];

  @ApiProperty({ description: 'YouTube video URL', required: false })
  youtubeURL?: string;

  @ApiProperty({ description: 'Website URL', required: false })
  websiteURL?: string;

  @ApiProperty({ description: 'GitHub repository URL', required: false })
  githubURL?: string;

  @ApiProperty({ description: 'Project visibility status' })
  isVisible: boolean;

  @ApiProperty({ description: 'Project status', enum: Status })
  status: Status;

  @ApiProperty({ description: 'Project creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Project last update date' })
  updatedAt: Date;

  @ApiProperty({ description: 'Project owner details' })
  owner: {
    id: string;
    username: string;
  };

  @ApiProperty({ description: 'Project members count' })
  membersCount: number;

  @ApiProperty({ description: 'Project guest members count' })
  guestMembersCount: number;
}
