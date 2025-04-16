import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

import authConfig from 'src/config/authConfig';
import JwtPayload from '../types/jwtPayload';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: authConfig().refreshJwt.secret,
    });
  }
  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('Authorization')?.split(' ')[1];
    return { ...payload, refreshToken };
  }
}
