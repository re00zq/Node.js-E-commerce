import TokenPair from 'src/auth/types/TokenPair';
import { User } from 'src/users/user.schema';

export interface ITokenService {
  getTokens(user: User): Promise<TokenPair>;
  updateRefreshToken(userId: string, refreshToken: string): Promise<void>;
  refreshTokens(refreshToken: string, userId: string): Promise<TokenPair>;
  sendConfirmationToken(user: User);
}
