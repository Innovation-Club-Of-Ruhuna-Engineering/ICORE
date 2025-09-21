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
}
