import { compare } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { User, UserDocument } from 'src/users/user.schema';
import TokenPair from 'src/auth/types/TokenPair';
import { ILoginService } from './login.interface';
import { UsersService } from 'src/users/users.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}
  async login(email: string, password: string): Promise<TokenPair> {
    // get the user from DB
    const user: UserDocument | null = await this.usersService.findOne({
      email,
    });

    // check if the email or password is't correct
    if (!user || !(await compare(password, user.password)))
      throw new UnauthorizedException("Email or password is't correct!");

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
