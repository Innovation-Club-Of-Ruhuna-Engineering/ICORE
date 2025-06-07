/**
 * Controller responsible for handling user-related HTTP requests.
 * Provides endpoints for CRUD operations on user resources.
 */
/**
 * Creates a new user.
 * @param createUserDto - The data to create a new user.
 * @returns The created user.
 */
/**
 * Retrieves all users.
 * @param user - The currently authenticated user.
 * @returns An array of all users.
 */
/**
 * Retrieves a specific user by ID.
 * @param id - The unique identifier of the user.
 * @returns The requested user.
 */
/**
 * Updates a user's information.
 * @param id - The unique identifier of the user to update.
 * @param updateUserDto - The data to update the user with.
 * @returns The updated user.
 */
/**
 * Removes a user.
 * @param id - The unique identifier of the user to remove.
 * @returns The deleted user.
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from 'generated/prisma';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) { 
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: User) {
    console.log('Current User:', user);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
