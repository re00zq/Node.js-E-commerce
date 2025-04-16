import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

import { User, UserDocument } from '../../../users/user.schema';
import authConfig from '../../../config/authConfig';
import { UsersService } from '../../../users/users.service';
import { ITokenService } from './token.interface';
import TokenPair from '../../types/TokenPair';
import { MailService } from '../../../mail/mail.service';
import JwtPayload from '../../types/jwtPayload';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  async getTokens(user: UserDocument): Promise<TokenPair> {
    // Creating payload by user data
    const payload: JwtPayload = {
      sub: user._id.toHexString(),
      email: user.email,
    };

    // get refresh token and access token
    const [accessToken, refreshToken] = await Promise.all([
      // the promise of access token
      this.jwtService.signAsync(payload, {
        secret: authConfig().jwt.secret,
        expiresIn: authConfig().jwt.expiredIn,
      }),
      // the promise of refresh token
      this.jwtService.signAsync(payload, {
        secret: authConfig().refreshJwt.secret,
        expiresIn: authConfig().refreshJwt.expiredIn,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    const hashedRefreshToken: string = await hash(refreshToken, 10);
    await this.usersService.update(id, { refreshToken: hashedRefreshToken });
  }

  async refreshTokens(
    refreshToken: string,
    userId: string,
  ): Promise<TokenPair> {
    // getting user with Id
    const user: UserDocument | null = await this.usersService.findOne({
      id: userId,
    });
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access denied'); // there is no user with this id or the user singned out

    // comparing between refresh token in DB and the on in local
    const tokenMatches: boolean = await compare(
      refreshToken,
      user.refreshToken,
    );

    // if the 2 refresh tokens are not match then throw an unauthorized exception
    if (!tokenMatches) throw new ForbiddenException('Access denied');

    // if the 2 refresh tokens are match then update both of them with new
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(userId, tokens['refreshToken'] as string);
    return tokens;
  }

  async sendConfirmationToken(user: UserDocument) {
    const payload = { sub: user._id.toHexString(), email: user.email };

    const confirmationToken = await this.jwtService.signAsync(payload, {
      secret: authConfig().confirmation.secret,
      expiresIn: authConfig().confirmation.expiredIn,
    });
    //console.log(confirmationToken);
    await this.mailService.sendToken(user, confirmationToken);
  }
}
