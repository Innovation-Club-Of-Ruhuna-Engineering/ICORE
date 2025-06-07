import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService: AuthService 
    ) {
        super({
            usernameField: 'email',
            
        })
    }
    async validate(email: string, password: string): Promise<any> {
       return this.authService.verifyUser(email, password);
    }

}