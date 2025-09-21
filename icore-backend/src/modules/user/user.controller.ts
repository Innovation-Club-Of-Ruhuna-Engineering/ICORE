import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  ValidationPipe,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.input';
import { UpdateUserDto } from './dto/updateUser.input';
import { UserResponse } from './dto/user-response';
import { UpdatePasswordDto } from './dto/updatePassword.input';
import { UserProfileByUsernameResponse } from './dto/user-profile-by-username-response.dto';
import { StorageService } from '../storage/storage.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly storageService: StorageService) {}

  // Create new user endpoint
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: UserResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async create(
    @Body(new ValidationPipe())
    createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    return await this.userService.create(createUserDto);
  }

  //upload profile picture
  @Post(':id/profile-picture')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Upload user profile picture' })
  @ApiResponse({ status: 200, description: 'Profile picture uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request or invalid file' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseInterceptors(FileInterceptor('file', {
    limits: {
      fileSize: 1024 * 1024 * 5, // Reduced to 1MB to match service limit
    },
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(webp|jpg|jpeg|png)$/)) {
        return callback(new BadRequestException('Only JPG and PNG files are allowed'), false);
      }
      callback(null, true);
    },
  }),)
  async uploadProfilePicture(
    @Param('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    if (!file) {
      return {
        success: false,
        message: 'No file uploaded or file field is not named "file"',
      };
    }
    
    try {
      // Optional: Add permission check
      // if (user.id !== userId && user.role !== 'ADMIN') {
      //   throw new UnauthorizedException('You can only upload your own profile picture');
      // }
      
      const url = await this.storageService.uploadUserProfilePicture(userId, file);
      
      // Optional: Update user's profilePictureUrl in the database
      // await this.userService.updateProfilePicture(userId, url);
      
      return { success: true, url };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to upload profile picture',
      };
    }
  }

  @Get() // Only for admins
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [UserResponse],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // TODO: Add role-based guards (Only COMMITTEE can get all users)
  findAll(@CurrentUser() user: User) {
    console.log(user);
    return this.userService.findAll();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: UserResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@CurrentUser() user: User): Promise<UserResponse> {
    return await this.userService.findOneById(user.id);
  }

  @Get('profile/:username')
  async getProfileByUsername(
    @Param('username') username: string,
  ): Promise<UserProfileByUsernameResponse> {
    return await this.userService.findOneByUsername(username);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    type: UserResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateProfile(
    @CurrentUser() user: User,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    // Remove sensitive fields
    return await this.userService.update(user.id, updateUserDto);
  }

  @Patch('profile/password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user password' })
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid current password' })
  async updatePassword(
    @CurrentUser() user: User,
    @Body(new ValidationPipe())
    updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(user.id, updatePasswordDto);
  }

  @Get(':id') // Only for admins
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID (Admin only)' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserResponse,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  // TODO: Add role-based guards (Only COMMITTEE can get any user)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponse> {
    return await this.userService.findOneById(id);
  }

  @Patch(':id') // Only for admins
  @UseGuards(JwtAuthGuard)
  // TODO: Add role-based guards (Only COMMITTEE can update any user)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe())
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id') // Only for admins
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user (Admin only)' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  // TODO: Add role-based guards (Only COMMITTEE can delete user)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.remove(id);
  }

  @Delete('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current user profile' })
  @ApiResponse({ status: 200, description: 'Profile deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async removeProfile(@CurrentUser() user: User) {
    return await this.userService.remove(user.id);
  }

  // CONSIDER: Create function for user to delete their own profile?
}
