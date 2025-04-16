import { Injectable, BadRequestException } from '@nestjs/common';
import { hash } from 'bcrypt';

import { RegisterDto } from '../../../DTOs/register.dto';
import { UsersService } from '../../../users/users.service';
import { User, UserDocument } from '../../../users/user.schema';
import { TokenService } from '../token/token.service';
import { IRegisterService } from './register.interface';
import TokenPair from '../../types/TokenPair';
@Injectable()
export class RegisterService implements IRegisterService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async register(user: RegisterDto): Promise<TokenPair> {
    //handle duplicate email
    const isExist: boolean = (await this.usersService.findOne({
      email: user.email.toLocaleLowerCase(),
    }))
      ? true
      : false;
    if (isExist) throw new BadRequestException('this email is already taken');

    // hashing password
    user.password = await hash(user.password, 10);

    //saving user data in DB
    user.email = user.email.toLocaleLowerCase();
    const newUser: UserDocument = await this.usersService.create(user);

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
