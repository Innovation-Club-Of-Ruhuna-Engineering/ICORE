import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
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
      // Check if user already exists
      await this.checkUserExists(createUserDto.email, createUserDto.username, createUserDto.regNumber);

      const hashedPassword = await this.hashPassword(createUserDto.password);

      const user = await this.databaseService.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
        select: this.getUserSelectFields(),
      });

      return user;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      if (error.code === 'P2002') { // Unique constraint violation
        const field = error.meta?.target?.[0] || 'field';
        throw new ConflictException(`User with this ${field} already exists`);
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
  async findOneById(id: string): Promise<UserResponse> {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id },
        select: this.getUserSelectFields(),
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

      // Extract string values from possible Prisma update input format
      // Had to do this because because Prisma gives a type error
      const username =
        typeof updateUserDto.username === 'string'
          ? updateUserDto.username
          : updateUserDto.username?.set;

      const regNumber =
        typeof updateUserDto.regNumber === 'string'
          ? updateUserDto.regNumber
          : updateUserDto.regNumber?.set;

      // If updating unique fields, check for conflicts
      if (username || regNumber) {
        await this.checkUserExists(username, regNumber, id);
      }

      const updatedUser = await this.databaseService.user.update({
        where: { id },
        data: {
          ...updateUserDto,
          updatedAt: new Date(),
        },
        select: this.getUserSelectFields(),
      });

      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      if (error.code === 'P2002') {
        const field = error.meta?.target?.[0] || 'field';
        throw new ConflictException(`User with this ${field} already exists`);
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
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
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
    if (error instanceof NotFoundException) {
      throw error;
    }
    if (error.code === 'P2003') {
      throw new ConflictException('Cannot delete user with existing project associations');
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

  private async checkUserExists(
    email?: string,
    username?: string,
    regNumber?: string,
  ): Promise<void> {
    const conditions: Prisma.UserWhereInput[] = [];

    if (email) conditions.push({ email });
    if (username) conditions.push({ username });
    if (regNumber) conditions.push({ regNumber });

    if (conditions.length === 0) return;

    const where: Prisma.UserWhereInput = {
      OR: conditions,
    };

    const existingUser = await this.databaseService.user.findFirst({ where });

    if (existingUser) {
      let conflictField = 'field';
      if (email && existingUser.email === email) conflictField = 'email';
      else if (username && existingUser.username === username) conflictField = 'username';
      else if (regNumber && existingUser.regNumber === regNumber) conflictField = 'registration number';

      throw new ConflictException(`User with this ${conflictField} already exists`);
    }
  }

  private getUserSelectFields(): Prisma.UserSelect {
    return {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      regNumber: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      password: false,
      refreshToken: false,
    };
  }
}
