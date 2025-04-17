import { Injectable } from '@nestjs/common';

import { IlogoutService } from './logout.interface';
import TokenPair from 'src/auth/types/TokenPair';
import { UpdateUserService } from 'src/users/services/updateUser.service';

@Injectable()
export class LogoutService implements IlogoutService {
  constructor(private readonly updateUser: UpdateUserService) {}

  async logout(userId: string): Promise<TokenPair> {
    await this.updateUser.update(userId, { refreshToken: undefined });
    return {
      accessToken: null,
      refreshToken: null,
    };
  }
}
