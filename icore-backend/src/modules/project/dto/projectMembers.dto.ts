import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ProjectRole } from '@prisma/client';

export class AddMemberInput {
  @IsString({ message: 'User ID must be a string' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsString({ message: 'Role must be a string' })
  role: ProjectRole;
}

export class AddGuestMemberInput {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsString({ message: 'Role must be a string' })
  role: ProjectRole;
}

export class UpdateMemberInput extends PartialType(AddMemberInput) {}

export class UpdateGuestMemberInput extends PartialType(AddGuestMemberInput) {}

export class RemoveMemberInput {
  @IsString({ message: 'User ID must be a string' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;
}

export class RemoveGuestMemberInput {
  @IsString({ message: 'Guest member email must be a string' })
  @IsNotEmpty({ message: 'Guest member email is required' })
  email: string;
}

export class MemberResponse {
  userId: string;
  role: ProjectRole;
  joinedAt: Date;
}

export class GuestMemberResponse {
  id: string;
  name: string;
  email: string;
  role: ProjectRole;
  joinedAt: Date;
}
