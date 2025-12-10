import {
  IsEmail,
  IsString,
  IsInt,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class CreateNewsletterSubscriberDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  contactNumber: string;

  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(120)
  age?: number;

  @IsOptional()
  @IsString()
  school?: string;
}
