import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'generated/prisma';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { Response } from 'express';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ){}

    async verifyUser(email: string, password: string): Promise<any> {
        try {
            const user = await this.userService.findOne(email);
            if (!user) {
                throw new UnauthorizedException('User not found');
            }
            const authenticated = compareSync(password, user.password);
            if(!authenticated) {
                throw new UnauthorizedException('Invalid credentials');
            }
            return user;
        } catch (error) {
            throw new UnauthorizedException('Not valid credentials');
        }
    }

    async login(user: User, response: Response){
        const expiresAccessToken = new Date();
        expiresAccessToken.setMilliseconds(
            parseInt(
                this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_EXPIRATION_MS')
            )
        );

        const tokenPayload: TokenPayload ={
            userId: user.id
        }

        const accessToken = this.jwtService.sign(tokenPayload, 
            {
                secret: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
                expiresIn: `${this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_EXPIRATION_MS')}ms`
            }
        );

        response.cookie('Authentication', accessToken, {
            httpOnly: true,
            secure: this.configService.get('NODE_ENV') === 'production',
            expires: expiresAccessToken
        });
    }



}
