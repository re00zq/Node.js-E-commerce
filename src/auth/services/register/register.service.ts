import { Injectable, BadRequestException } from '@nestjs/common';
import { hash } from 'bcrypt';

import { RegisterDto } from '../../dto/register.dto';
import { User, UserDocument } from '../../../users/user.schema';
import { TokenService } from '../token/token.service';
import { IRegisterService } from './register.interface';
import TokenPair from '../../types/TokenPair';
import { I18nService } from 'nestjs-i18n';
import { FindUserService } from 'src/users/services/findUser.service';
import { CreateUserService } from 'src/users/services/createUser.service';
@Injectable()
export class RegisterService implements IRegisterService {
  constructor(
    private readonly findUser: FindUserService,
    private readonly createUser: CreateUserService,
    private readonly tokenService: TokenService,
    private readonly i18n: I18nService,
  ) {}

  async register(user: RegisterDto): Promise<TokenPair> {
    //handle duplicate email
    const isExist: boolean = (await this.findUser.findOne({
      email: user.email.toLocaleLowerCase(),
    }))
      ? true
      : false;
    if (isExist)
      throw new BadRequestException(this.i18n.t('auth.EMAIL_Already_TAKEN'));

    // hashing password
    user.password = await hash(user.password, 10);

    //saving user data in DB
    user.email = user.email.toLocaleLowerCase();
    const newUser: UserDocument = await this.createUser.create(user);

    //sending confirmation email
    this.tokenService.sendConfirmationToken(newUser);

    // update refresh token in DB and send tokens
    const tokens = await this.tokenService.getTokens(newUser);
    await this.tokenService.updateRefreshToken(
      newUser.id,
      tokens['refreshToken'] as string,
    );

    return tokens;
  }
}
