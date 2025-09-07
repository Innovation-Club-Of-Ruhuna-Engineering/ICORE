import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsDateString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Username',
    example: 'johndoe',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'First name',
    example: 'John',
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Last name',
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Contact number',
    example: '+94771234567',
  })
  @IsOptional()
  @IsString()
  contactNumber?: string;

  @ApiPropertyOptional({
    description: 'Department',
    example: 'Computer Science',
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({
    description: 'Batch year',
    example: '2023',
  })
  @IsOptional()
  @IsString()
  batch?: string;

  @ApiPropertyOptional({
    description: 'Gender',
    example: 'Male',
  })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({
    description: 'Registration number',
    example: 'ENG/2023/001',
  })
  @IsOptional()
  @IsString()
  regNumber?: string;

  @ApiPropertyOptional({
    description: 'User pitch/description',
    example: 'Passionate software developer',
  })
  @IsOptional()
  @IsString()
  pitch?: string;

  // Personal Information
  @ApiPropertyOptional({
    description: 'User biography',
    example: 'I am a passionate software engineer...',
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    description: 'Professional title',
    example: 'Senior Software Engineer',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Geographic location',
    example: 'Colombo, Sri Lanka',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: 'Date of birth',
    example: '1995-05-15',
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  // Professional Information
  @ApiPropertyOptional({
    description: 'Current company',
    example: 'Tech Solutions Inc.',
  })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiPropertyOptional({
    description: 'Educational institution',
    example: 'University of Ruhuna',
  })
  @IsOptional()
  @IsString()
  institution?: string;

  @ApiPropertyOptional({
    description: 'Field of study',
    example: 'Computer Science and Engineering',
  })
  @IsOptional()
  @IsString()
  fieldOfStudy?: string;

  @ApiPropertyOptional({
    description: 'Graduation year',
    example: '2024',
  })
  @IsOptional()
  @IsString()
  graduationYear?: string;

  @ApiPropertyOptional({
    description: 'Years of experience',
    example: 3,
  })
  @IsOptional()
  @IsInt()
  yearsOfExperience?: number;

  // Profile Images
  @ApiPropertyOptional({
    description: 'Profile picture URL',
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'Cover image URL',
    example: 'https://example.com/cover.jpg',
  })
  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  // Social Media Links
  @ApiPropertyOptional({
    description: 'Personal website URL',
    example: 'https://johndoe.dev',
  })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({
    description: 'GitHub profile URL',
    example: 'https://github.com/johndoe',
  })
  @IsOptional()
  @IsString()
  github?: string;

  @ApiPropertyOptional({
    description: 'LinkedIn profile URL',
    example: 'https://linkedin.com/in/johndoe',
  })
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiPropertyOptional({
    description: 'YouTube channel URL',
    example: 'https://youtube.com/@johndoe',
  })
  @IsOptional()
  @IsString()
  youtube?: string;

  @ApiPropertyOptional({
    description: 'Instagram profile URL',
    example: 'https://instagram.com/johndoe',
  })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiPropertyOptional({
    description: 'Twitter profile URL',
    example: 'https://twitter.com/johndoe',
  })
  @IsOptional()
  @IsString()
  twitter?: string;

  // Experience and Skills (JSON fields)
  @ApiPropertyOptional({
    description: 'User experiences as JSON array',
    example: '[{"title":"Software Engineer","company":"Tech Corp"}]',
  })
  @IsOptional()
  experiences?: any;

  @ApiPropertyOptional({
    description: 'User skills as JSON array',
    example: '[{"name":"JavaScript","level":"Advanced"}]',
  })
  @IsOptional()
  skills?: any;
}
