import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // This guard uses the 'local' strategy for authentication
  // This guard can be used to protect routes that require local authentication
  // It can be extended with additional logic if needed
}