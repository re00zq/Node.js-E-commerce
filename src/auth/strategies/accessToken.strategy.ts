import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import authConfig from 'src/config/authConfig';
import JwtPayload from '../types/jwtPayload';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.schema';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig().jwt.secret,
    });
  }
  async validate(payload: JwtPayload): Promise<User | null> {
    const user: User | null = await this.userService.findOne({
      id: payload.sub,
    });
    return user;
  }
}
