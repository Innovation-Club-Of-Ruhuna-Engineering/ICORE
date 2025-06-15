import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from 'generated/prisma';
import { DatabaseService } from 'src/config/database/database.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto, UserResponse } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Creates a new user with hashed password
   */
  async create(createUserDto: CreateUserDto): Promise<UserResponse> {

    try {
      // TODO: Check if a user with same email, username or password already exists

      const hashedPassword = await this.hashPassword(createUserDto.password);

      const user = await this.databaseService.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(`User with similar field exists`);;
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  /**
   * Retrieves all users
   */
  async findAll(): Promise<UserResponse[]> {
    try {
      return this.databaseService.user.findMany({});

    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve users');
    } 
  }

  /**
   * Finds a user by email
   */
  async findOneByEmail(email: string): Promise<User | null> {
    try {
      return await this.databaseService.user.findUnique({
        where: { email: email.toLowerCase() },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user by email');
    }
  }

  /**
   * Finds a user by ID
   */
  async findOneById(id: string): Promise<User> {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to find user');
    }
  }

  /**
   * Updates user
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponse> {
    try {
      // Check if user exists
      await this.findOneById(id);

      // TODO: If user is updating username or regNum check if they already exist

      const updatedUser = await this.databaseService.user.update({
        where: { id },
        data: 
          updateUserDto
      });

      return updatedUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  /**
   * Updates user password
   */
  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): Promise<{ message: string }> {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id },
        select: { password: true },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      const isCurrentPasswordValid = await bcrypt.compare(
        updatePasswordDto.currentPassword,
        user.password
      );

      if (!isCurrentPasswordValid) {
        throw new BadRequestException('Current password is incorrect');
      }

      const hashedNewPassword = await this.hashPassword(updatePasswordDto.newPassword);

      await this.databaseService.user.update({
        where: { id },
        data: {
          password: hashedNewPassword,
          updatedAt: new Date(),
        },
      });

      return { message: 'Password updated successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update password');
    }
  }

  /**
   * Delete user from database
   */
  async remove(id: string): Promise<{ message: string }> {
  try {
    await this.findOneById(id);

    await this.databaseService.user.delete({
      where: { id },
    });

    return { message: 'User permanently deleted' };
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new InternalServerErrorException('Failed to delete user');
  }
}

  /**
   * Update refresh token
   */
  async updateRefreshToken(id: string, refreshToken: string | null): Promise<void> {
    try {
      await this.databaseService.user.update({
        where: { id },
        data: { refreshToken },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update refresh token');
    }
  }

  // Private helper methods
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
