import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";

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
