import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService){}

    async verifyUser(email: string, password: string): Promise<any> {
        try {
            const user = await this.userService.findOne(email);
            const authenticated = compareSync(password, user.password);
            if(!authenticated) {
                throw new UnauthorizedException('Invalid credentials');
            }
        } catch (error) {
            throw new UnauthorizedException('Not valid credentials');
        }
    }
}
