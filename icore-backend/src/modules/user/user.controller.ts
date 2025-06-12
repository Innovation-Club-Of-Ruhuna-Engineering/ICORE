import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpCode, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User, Prisma } from 'generated/prisma';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto, UserResponse } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe())
    createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    return await this.userService.create(createUserDto);
  }

  @Get() // Only for admins
  @UseGuards(JwtAuthGuard)
  // TODO: Add role-based guards (Only COMMITTEE can get all users)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id') // Only for admins
  @UseGuards(JwtAuthGuard)
  // TODO: Add role-based guards (Only COMMITTEE can get any user)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponse> {
    return await this.userService.findOneById(id);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: User): Promise<UserResponse> {
    return await this.userService.findOneById(user.id);
  }

  @Patch(':id') // Only for admins
  @UseGuards(JwtAuthGuard)
  // TODO: Add role-based guards (Only COMMITTEE can update any user)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe())
    updateUserDto: UpdateUserDto): Promise<UserResponse> {
    return await this.userService.update(id, updateUserDto);
  }



  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @CurrentUser() user: User,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    // Remove sensitive fields
    const { role, status, ...allowedUpdates } = updateUserDto;
    return await this.userService.update(user.id, allowedUpdates);
  }

  @Patch('profile/password')
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @CurrentUser() user: User,
    @Body(new ValidationPipe())
    updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(user.id, updatePasswordDto);
  }

  @Delete(':id') // Only for admins
  @UseGuards(JwtAuthGuard)
  // TODO: Add role-based guards (Only COMMITTEE can delete user)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.remove(id);
  }

  // CONSIDER: Create function for user to delete their own profile?

}
