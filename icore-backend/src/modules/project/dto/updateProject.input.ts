import { ArrayMaxSize, IsArray, IsString, Length } from 'class-validator';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProjectInput } from './createProject.input';

export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @ApiPropertyOptional({
    description: 'Technical details of the project',
    minLength: 10,
    maxLength: 500,
    type: String,
  })
  @IsString({ message: 'Project technical details must be a string' })
  @Length(10, 500, {
    message: 'Project technical details must be between 10 and 500 characters',
  })
  details?: string;

  @ApiPropertyOptional({
    description: 'Array of Technologies for the project',
    type: [String],
    example: ['Python', 'Sprinboot', 'Arduino'],
    maxItems: 10,
  })
  @IsArray({ message: 'Technologies must be an array' })
  @IsString({ each: true, message: 'Technologies must be an array of strings' })
  @ArrayMaxSize(10, { message: 'You can add up to 10 Technologies' })
  technologies?: string[];

  @ApiPropertyOptional({
    description: 'Array of references for the project',
    type: [String],
    example: [
      'https://example.com/reference1',
      'https://example.com/reference2',
    ],
    maxItems: 10,
  })
  @IsArray()
  @IsString({ each: true, message: 'References must be an array of strings' })
  references?: string[];

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
