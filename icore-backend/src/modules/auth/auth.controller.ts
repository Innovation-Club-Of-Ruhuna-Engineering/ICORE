/**
 * Controller responsible for handling authentication-related endpoints
 */
/**
 * Handles user login authentication
 * @param user The authenticated user object obtained from CurrentUser decorator
 * @param response Express Response object to send HTTP responses
 * @returns Promise that resolves when login process is complete
 * @throws {UnauthorizedException} When credentials are invalid
 */
import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from 'generated/prisma';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: Response,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(
    @Body() loginDto: LoginDto,
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiCookieAuth('Refresh')
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    type: Response,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid refresh token',
  })
  async refreshToken(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged out',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async logout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(user, response);
  }
}
