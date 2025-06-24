import { ProjectType } from "generated/prisma"
import { ArrayMaxSize, IsArray, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectInput {
    @ApiProperty({
        description: 'Name of the project',
        minLength: 5,
        maxLength: 50,
        type: String
    })
    @IsNotEmpty({ message: 'Project name is required' })
    @IsString({ message: 'Project name must be a string' })
    @Length(5, 50, { message: 'Project name must be between 5 and 50 characters' })
    name: string

    @ApiProperty({
        description: 'Short public description of the project',
        minLength: 10,
        maxLength: 100,
        type: String
    })
    @IsNotEmpty({ message: 'Project about section is required' })
    @IsString({ message: 'Project about section must be a string' })
    @Length(10, 100, { message: 'Project about section must be between 10 and 100 characters' })
    about: string

    @ApiProperty({
        description: 'Detailed description of the project',
        minLength: 10,
        maxLength: 500,
        type: String
    })
    @IsNotEmpty({ message: 'Project description is required' })
    @IsString({ message: 'Project description must be a string' })
    @Length(10, 500, { message: 'Project description must be between 10 and 500 characters' })
    description: string

    @ApiProperty({
        description: 'Project type',
        enum: ProjectType,
        type: String
    })
    @IsNotEmpty({ message: 'Project type is required' })
    @IsString({ message: 'Project type must be a string' })
    type: ProjectType

    @ApiProperty({
        description: 'Start date of the project in ISO format',
        type: String,
        example: '2023-01-01T00:00:00Z'
    })
    @IsString({ message: 'Project timeline must be a string' })
    startDate: string

    @ApiProperty({
        description: 'End date of the project in ISO format (optional)',
        type: String,
        example: '2023-12-31T23:59:59Z',
        required: false
    })
    @IsString({ message: 'Project timeline must be a string' })
    endDate: string
    
    @ApiProperty({
        description: 'Array of tags for the project',
        type: [String],
        example: ['AI', 'Web Development', 'Open Source'],
        maxItems: 5
    })
    @IsArray({ message: 'Tags must be an array' })
    @IsString({ each: true, message: 'Tags must be an array of strings' })
    @ArrayMaxSize(5, { message: 'You can add up to 5 tags' })
    tags: string[]
}