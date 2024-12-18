import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1];
    log('Authorization Header and Token:', request.headers.authorization);
    log('Authorization Token:', token);

    if (!token) {
      throw new UnauthorizedException('no token');
    }

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);
      log('mylog: ' + tokenPayload);
      request.user = {
        userId: tokenPayload.sub,
        username: tokenPayload.username,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('no payload');
    }
  }
}
