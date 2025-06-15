import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'john.doe@uor.edu',
    description: 'User email address'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password'
  })
  @IsString()
  password: string;
}

export class AuthResponse {
  @ApiProperty({
    example: true,
    description: 'Whether the authentication was successful'
  })
  success: boolean;

  @ApiProperty({
    example: 'Authentication successful',
    description: 'Status message'
  })
  message: string;
}