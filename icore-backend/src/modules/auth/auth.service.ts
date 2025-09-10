import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const authenticated = compareSync(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Not valid credentials');
    }
  }

  async verifyUserRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<User> {
    try {
      const user = await this.userService.findOneById(userId);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (!user.refreshToken) {
        throw new UnauthorizedException('Refresh token not found');
      }
      const authenticated = compareSync(refreshToken, user.refreshToken);

      if (!authenticated) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Refresh token not valid');
    }
  }

  async login(user: User, response: Response) {
    const accessTokenExpiresInMins = parseInt(
      this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
    );

    const refreshTokenExpiresInMins = parseInt(
      this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_EXPIRATION'),
    );

    const expiresAccessToken = new Date(
      Date.now() + accessTokenExpiresInMins * 60 * 1000,
    );
    const expiresRefreshToken = new Date(
      Date.now() + refreshTokenExpiresInMins * 60 * 1000,
    );

    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${accessTokenExpiresInMins}m`,
    });

    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${refreshTokenExpiresInMins}m`,
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.userService.updateRefreshToken(user.id, hashedRefreshToken);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresAccessToken,
      sameSite: 'strict',
    });
    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresRefreshToken,
      sameSite: 'strict',
    });
  }

  async logout(user: User, response: Response) {
    // Clear the refresh token from the database
    await this.userService.updateRefreshToken(user.id, null);

    // Clear the authentication cookies
    response.clearCookie('Authentication', {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
    });

    response.clearCookie('Refresh', {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
    });
  }
}
