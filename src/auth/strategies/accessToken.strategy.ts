import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import authConfig from 'src/config/authConfig';
import JwtPayload from '../types/jwtPayload';
import { User } from 'src/users/user.schema';
import { FindUserService } from 'src/users/services/findUser.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private findUser: FindUserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig().jwt.secret,
    });
  }
  async validate(payload: JwtPayload): Promise<User | null> {
    const user: User | null = await this.findUser.findOne({
      _id: payload.sub,
    });
    return user;
  }
}
