import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Role, Status } from "generated/prisma";

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