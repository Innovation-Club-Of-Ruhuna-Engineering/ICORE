import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ProjectRole } from "generated/prisma";

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

export class UpdateMemberRoleInput {
    @IsString({ message: 'Role must be a string' })
    role: ProjectRole;
}