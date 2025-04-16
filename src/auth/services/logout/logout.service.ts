import { Injectable } from '@nestjs/common';

import { IlogoutService } from './logout.interface';
import { UsersService } from 'src/users/users.service';
import TokenPair from 'src/auth/types/TokenPair';

@Injectable()
export class LogoutService implements IlogoutService {
  constructor(private readonly usersService: UsersService) {}

  async logout(userId: string): Promise<TokenPair> {
    await this.usersService.update(userId, { refreshToken: undefined });
    return {
      accessToken: null,
      refreshToken: null,
    };
  }
}
