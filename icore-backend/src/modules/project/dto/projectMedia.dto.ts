import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsString } from 'class-validator';

export class ProjectPhotosInput {
  @ApiProperty({
    description: 'Array of photo links to be added to the project',
    type: [String],
    example: [
      'https://storage.com/photo1.jpg',
      'https://storage.com/photo2.jpg',
    ],
    maxItems: 10,
  })
  @IsArray({ message: 'Photos must be an array' })
  @IsString({ each: true, message: 'Each photo URL must be a string' })
  @ArrayMaxSize(10, { message: 'You can add up to 10 photos' })
  photos: string[];
}

export class ProjectDocumentsInput {
  @ApiProperty({
    description: 'Array of photo links to be added to the project',
    type: [String],
    example: ['https://storage.com/doc1.pdf', 'https://storage.com/doc2.pdf'],
    maxItems: 10,
  })
  @IsArray({ message: 'Documents must be an array' })
  @IsString({ each: true, message: 'Each Document URL must be a string' })
  @ArrayMaxSize(10, { message: 'You can add up to 10 documents' })
  documents: string[];
}
