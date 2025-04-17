import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import authConfig from 'src/config/authConfig';
import { IConfirmEmailService } from './confirmEmail.interface';
import JwtPayload from 'src/auth/types/jwtPayload';
import { User, UserDocument } from 'src/users/user.schema';
import { FindUserService } from 'src/users/services/findUser.service';
import { UpdateUserService } from 'src/users/services/updateUser.service';

@Injectable()
export class ConfirmEmailService implements IConfirmEmailService {
  constructor(
    private readonly findUser: FindUserService,
    private readonly updateUser: UpdateUserService,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  async confirmEmail(confirmationToken: string, email: string): Promise<User> {
    let payload: JwtPayload;
    // check the token validation
    try {
      // if token is valide extract the payload
      payload = await this.jwtService.verifyAsync(confirmationToken, {
        secret: authConfig().confirmation.secret,
      });
      // if token is not valide throw an error
    } catch (_error) {
      // console.log(_error);
      throw new BadRequestException(this.i18n.t('auth.TOKEN_NV'));
    }
    // chech if the user use another user's token
    if (payload.email !== email)
      throw new BadRequestException(
        this.i18n.t('auth.ANOTHER_TOKEN', { args: { email } }),
      );

    // if the token is valid update the confirmed value
    const user: UserDocument | null = await this.findUser.findOne({
      email,
    });
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('auth.EMAIL_NF', { args: { email } }),
      );
    }
    if (user.confirmed)
      throw new ForbiddenException(this.i18n.t('auth.USER_Already_CONFIRMED'));
    user.confirmed = true;
    this.updateUser.update(user._id.toHexString(), user);
    return user;
  }
}
