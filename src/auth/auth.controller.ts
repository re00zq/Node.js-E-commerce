import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import { SerializeInterceptor } from 'src/users/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dto/user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { LoginService } from './services/login/login.service';
import { RegisterService } from './services/register/register.service';
import { TokenService } from './services/token/token.service';
import { LogoutService } from './services/logout/logout.service';
import { ConfirmEmailService } from './services/confirmEmail/confirmEmail.service';
import AuthRequest from './types/authRequest';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly loginService: LoginService,
    private readonly tokenService: TokenService,
    private readonly logoutService: LogoutService,
    private readonly confirmEmailService: ConfirmEmailService,
  ) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.registerService.register(registerDto);
  }
  @UseInterceptors(new SerializeInterceptor(UserDto))
  @UseGuards(AccessTokenGuard)
  @Post('confirm')
  confirm(@Query('token') token: string, @Req() req: AuthRequest) {
    return this.confirmEmailService.confirmEmail(token, req.user['email']);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@Req() req: AuthRequest) {
    return this.tokenService.refreshTokens(
      req.user['refreshToken'],
      req.user['sub'],
    );
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: AuthRequest) {
    return this.logoutService.logout(req.user['id']);
  }
}
