import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';

@Controller('auth-v2')
export class PassportController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  Login(@Request() request) {
    return this.authService.signIn(request.user);
  }

  @Get('me')
  getUserInfo() {
    throw new NotImplementedException();
  }
}
