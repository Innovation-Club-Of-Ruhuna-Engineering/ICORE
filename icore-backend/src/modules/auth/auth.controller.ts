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
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from 'generated/prisma';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login (
        @CurrentUser() user: User,
        @Res({passthrough: true}) response: Response
    ){
        await this.authService.login(user, response);
    }

    @Post('refresh')
    @UseGuards(JwtRefreshAuthGuard)
    async refreshToken (
        @CurrentUser() user: User,
        @Res({passthrough: true}) response: Response
    ){
        await this.authService.login(user, response);
    }
}
