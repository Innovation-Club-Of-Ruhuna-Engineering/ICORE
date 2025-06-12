/**
 * DTO validates data for user operations.
 * Extends Prisma types and excludes fields that are not needed.
 */

import { Prisma, User } from "generated/prisma";

export interface CreateUserDto extends Omit<Prisma.UserCreateInput, 'id' | 'createdAt' | 'updatedAt' | 'Projects' | 'ProjectMembers'> {}

export interface UpdateUserDto extends Omit<Prisma.UserUpdateInput, 'id' | 'createdAt' | 'updatedAt'> {}

export interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface UserResponse extends Omit<User, 'id' | 'refreshToken'> {}
