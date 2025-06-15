/**
 * DTO validates data for user operations.
 * Extends Prisma types and excludes fields that are not needed.
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma, User,Role, Status } from "generated/prisma";
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';


export interface CreateUserDto extends Omit<Prisma.UserCreateInput, 'id' | 'createdAt' | 'updatedAt' | 'Projects' | 'ProjectMembers'> {}

export interface UpdateUserDto extends Omit<Prisma.UserUpdateInput, 'id' | 'createdAt' | 'updatedAt'> {}

export interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
}




export class CreateUserDto {
  @ApiProperty({ 
    description: 'User email address',
    example: 'john.doe@example.com' 
  })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    description: 'Username for login',
    example: 'johndoe',
    minLength: 3,
    maxLength: 20 
  })
  @IsString()
  @Length(3, 20)
  username: string;

  @ApiProperty({ 
    description: 'User password',
    example: 'password123',
    minLength: 6 
  })
  @IsString()
  @Length(6)
  password: string;

  @ApiProperty({ 
    description: 'User first name',
    example: 'John' 
  })
  @IsString()
  firstName: string;

  @ApiProperty({ 
    description: 'User last name',
    example: 'Doe' 
  })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ 
    description: 'Contact phone number',
    example: '+94771234567' 
  })
  @IsOptional()
  @IsString()
  contactNumber?: string;

  @ApiPropertyOptional({ 
    description: 'User gender',
    example: 'Male' 
  })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ 
    description: 'Academic department',
    example: 'DEIE' 
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({ 
    description: 'Academic batch year',
    example: '23' 
  })
  @IsOptional()
  @IsString()
  batch?: string;

  @ApiPropertyOptional({ 
    description: 'Registration number',
    example: 'EG/2021/8940' 
  })
  @IsOptional()
  @IsString()
  regNumber?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ 
    description: 'Username',
    example: 'johndoe' 
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ 
    description: 'First name',
    example: 'John' 
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ 
    description: 'Last name',
    example: 'Doe' 
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ 
    description: 'Contact number',
    example: '+94771234567' 
  })
  @IsOptional()
  @IsString()
  contactNumber?: string;

  @ApiPropertyOptional({ 
    description: 'Department',
    example: 'Computer Science' 
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({ 
    description: 'Batch year',
    example: '2023' 
  })
  @IsOptional()
  @IsString()
  batch?: string;
}

export class UpdatePasswordDto {
  @ApiProperty({ 
    description: 'Current password',
    example: 'currentpass123' 
  })
  @IsString()
  currentPassword: string;

  @ApiProperty({ 
    description: 'New password',
    example: 'newpass123' 
  })
  @IsString()
  newPassword: string;
}
export class UserResponse {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address'
  })
  email: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'Username'
  })
  username: string;

  @ApiProperty({
    example: 'John',
    description: 'First name'
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name'
  })
  lastName: string;

  @ApiPropertyOptional({
    example: '+94771234567',
    description: 'Contact phone number',
    nullable: true
  })
  contactNumber: string | null;

  @ApiPropertyOptional({
    example: 'Male',
    description: 'Gender',
    nullable: true
  })
  gender: string | null;

  @ApiPropertyOptional({
    example: 'Computer Science',
    description: 'Academic department',
    nullable: true
  })
  department: string | null;

  @ApiPropertyOptional({
    example: '2023',
    description: 'Academic batch year',
    nullable: true
  })
  batch: string | null;

  @ApiPropertyOptional({
    example: '2020/CS/001',
    description: 'Registration number',
    nullable: true
  })
  regNumber: string | null;

  @ApiProperty({
    enum: Role,
    example: Role.GENERAL,
    description: 'User role'
  })
  role: Role;

  @ApiProperty({
    enum: Status,
    example: Status.PENDING,
    description: 'Account status'
  })
  status: Status;

  @ApiProperty({
    example: '2024-06-15T10:00:00.000Z',
    description: 'Account creation timestamp'
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-06-15T10:00:00.000Z',
    description: 'Last update timestamp'
  })
  updatedAt: Date;
}