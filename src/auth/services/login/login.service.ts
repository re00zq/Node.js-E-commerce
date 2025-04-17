import { compare } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { User, UserDocument } from 'src/users/user.schema';
import TokenPair from 'src/auth/types/TokenPair';
import { ILoginService } from './login.interface';
import { UsersService } from 'src/users/users.service';
import { TokenService } from '../token/token.service';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly i18n: I18nService,
  ) {}
  async login(email: string, password: string): Promise<TokenPair> {
    // get the user from DB
    const user: UserDocument | null = await this.usersService.findOne({
      email,
    });

    // check if the email or password is't correct
    if (!user || !(await compare(password, user.password)))
      throw new UnauthorizedException(
        this.i18n.t('auth.EMAIL_OR_PASS_NOT_CORRECT'),
      );

    // update refresh token in DB and send tokens
    const tokens = await this.tokenService.getTokens(user);
    await this.tokenService.updateRefreshToken(
      user._id.toHexString(),
      tokens['refreshToken'] as string,
    );

    // send jwt tokens
    return tokens;
  }
}
