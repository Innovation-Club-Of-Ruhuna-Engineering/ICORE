import { ProjectType } from "generated/prisma"
import { ArrayMaxSize, IsArray, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateProjectInput {
    @IsNotEmpty({ message: 'Project ID is required' })
    @IsString({ message: 'Project ID must be a string' })
    id: string

    @IsNotEmpty({ message: 'Project name is required' })
    @IsString({ message: 'Project name must be a string' })
    @Length(5, 50, { message: 'Project name must be between 5 and 50 characters' })
    name: string

    @IsNotEmpty({ message: 'Project description is required' })
    @IsString({ message: 'Project description must be a string' })
    @Length(10, 500, { message: 'Project description must be between 10 and 500 characters' })
    description: string

    @IsNotEmpty({ message: 'Project type is required' })
    @IsString({ message: 'Project type must be a string' })
    type: ProjectType

    @IsString({ message: 'Project timeline must be a string' })
    timeline: string

    @IsArray({ message: 'Tags must be an array' })
    @IsString({ each: true, message: 'Tags must be an array of strings' })
    @ArrayMaxSize(5, { message: 'You can add up to 5 tags' })
    tags: string[]

    @IsArray()
    @IsString({ each: true, message: 'References must be an array of strings' })
    references: string[]
}