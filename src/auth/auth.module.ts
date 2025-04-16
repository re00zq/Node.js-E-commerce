import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { LoginService } from './services/login/login.service';
import { TokenService } from './services/token/token.service';
import { RegisterService } from './services/register/register.service';
import { LogoutService } from './services/logout/logout.service';
import { ConfirmEmailService } from './services/confirmEmail/confirmEmail.service';

@Module({
  controllers: [AuthController],
  providers: [
    LoginService,
    LogoutService,
    ConfirmEmailService,
    RegisterService,
    TokenService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  imports: [
    UsersModule,
    JwtModule.register({}),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class AuthModule {
  constructor() {}
}
