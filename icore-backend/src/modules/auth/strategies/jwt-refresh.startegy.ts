import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/modules/user/user.service";
import { TokenPayload } from "../token-payload.interface";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){
    // This strategy is used to handle JWT refresh tokens.
    // It will be implemented in the future.
    // For now, it is just a placeholder to show where the logic will go.
    
    // The implementation will include methods to validate the refresh token,
    // issue a new access token, and handle any necessary user state updates.
    constructor(configService: ConfigService, private readonly userService: UserService, private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies?.Refresh
            ]),
            secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
            passReqToCallback: true,
        });
    }


    async validate(request: Request, payload: TokenPayload){
        return this.authService.verifyUserRefreshToken(payload.userId, request.cookies?.Refresh)
    }
}