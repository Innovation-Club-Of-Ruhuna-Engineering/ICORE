// storage/storage.service.ts
import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from 'src/config/database/database.service';

@Injectable()
export class StorageService {
  private s3: S3Client;
  private publicUrl: string;

  constructor(
    private configService: ConfigService,
    private readonly databaseService: DatabaseService
  ) {
    const secretKey = this.configService.get<string>('MINIO_SECRET_KEY');
    if (!secretKey) {
      throw new Error('MINIO_SECRET_KEY environment variable is not set');
    }
    const accessKey = this.configService.get<string>('MINIO_ACCESS_KEY');
    if (!accessKey) {
      throw new Error('MINIO_ACCESS_KEY environment variable is not set');
    }
    const endpoint = this.configService.get<string>('MINIO_ENDPOINT') || 'https://s3.theicore.org';
    this.publicUrl = this.configService.get<string>('MINIO_PUBLIC_URL') || endpoint;

    this.s3 = new S3Client({
      region: 'us-east-1', // arbitrary, MinIO ignores region
      endpoint: endpoint,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
      forcePathStyle: true,
    });
  }

  async uploadUserProfilePicture(userId: string, file: Express.Multer.File) {
    const fileExtension = file.mimetype.split('/')[1] || 'jpg';
    const key = `user/${userId}/profile.${fileExtension}`; // folder structure inside bucket

    try {
      if (file.size > 1024 * 1024 * 5) {
        throw new Error('File size exceeds 5MB limit');
      }

      await this.s3.send(
        new PutObjectCommand({
          Bucket: 'user-profile-pictures',
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      // Generate the public URL
      const publicUrl = `${this.publicUrl}/user-profile-pictures/${key}`;
      
      // Update the user's avatarUrl in the database
      await this.databaseService.user.update({
        where: { id: userId },
        data: {
          avatarUrl: publicUrl,
          updatedAt: new Date(),
        },
      });

      // Return public URL
      return publicUrl;
    } catch (error) {
      console.error('S3 Upload Error:', error);

      if (error.message.includes('File size exceeds')) {
        throw new Error('The image file is too large. Please upload a file smaller than 5MB.');
      } else if (error.$metadata && error.$metadata.httpStatusCode === 413) {
        throw new Error('The image file is too large for the storage service. Please use a smaller file.');
      } else {
        throw new Error('Failed to upload profile picture. Please try again later.');
      }
    }
  }

  async uploadUserBackground(userId: string, file: Express.Multer.File) {
    const key = `user/${userId}/background.webp`; // folder structure inside bucket

    try {
      if (file.size > 1024 * 1024 * 5) {
        throw new Error('File size exceeds 5MB limit');
      }

      await this.s3.send(
        new PutObjectCommand({
          Bucket: 'user-profile-pictures',
          Key: key,
          Body: file.buffer,
          ContentType: 'image/webp',
        }),
      );

      // Generate the public URL
      const publicUrl = `${this.publicUrl}/user-profile-pictures/${key}`;
      
      // Update the user's coverImageUrl in the database
      await this.databaseService.user.update({
        where: { id: userId },
        data: {
          coverImageUrl: publicUrl,
          updatedAt: new Date(),
        },
      });

      // Return public URL
      return publicUrl;
    } catch (error) {
      console.error('S3 Upload Error:', error);

      if (error.message.includes('File size exceeds')) {
        throw new Error('The image file is too large. Please upload a file smaller than 5MB.');
      } else if (error.$metadata && error.$metadata.httpStatusCode === 413) {
        throw new Error('The image file is too large for the storage service. Please use a smaller file.');
      } else {
        throw new Error('Failed to upload background image. Please try again later.');
      }
    }
  }

  async uploadProjectImages(projectId: string, files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new Error('No files provided for upload.');
    }

    const uploadedUrls: string[] = [];

    // First, verify the project exists
    const existingProject = await this.databaseService.project.findUnique({
      where: { id: projectId },
      select: { photos: true },
    });

    if (!existingProject) {
      throw new Error('Project not found.');
    }

    for (const file of files) {
      const fileExtension = file.mimetype.split('/')[1] || 'jpg';
      const timestamp = Date.now();
      const sanitizedFileName = file.originalname?.replace(/\s+/g, '_') || 'image';
      const key = `projects/${projectId}/images/${timestamp}_${sanitizedFileName}.${fileExtension}`;

      try {
        if (file.size > 1024 * 1024 * 10) {
          throw new Error(`File "${file.originalname}" exceeds the 10MB limit.`);
        }

        // Upload each image to MinIO
        await this.s3.send(
          new PutObjectCommand({
            Bucket: 'projects',
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
          }),
        );

        const publicUrl = `${this.publicUrl}/projects/${key}`;
        uploadedUrls.push(publicUrl);

      } catch (error) {
        console.error(`Failed to upload "${file.originalname}"`, error);

        if (error.message.includes('File size exceeds')) {
          throw new Error(`The image file "${file.originalname}" is too large. Please upload smaller than 10MB.`);
        } else {
          throw new Error(`Failed to upload project images. Please try again later.`);
        }
      }
    }

    // Update the project's photos array with the new URLs
    const updatedPhotos = [...existingProject.photos, ...uploadedUrls];
    
    await this.databaseService.project.update({
      where: { id: projectId },
      data: {
        photos: updatedPhotos,
        updatedAt: new Date(),
      },
    });

    return uploadedUrls;
  }

}
