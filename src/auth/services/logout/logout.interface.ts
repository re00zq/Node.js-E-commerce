import TokenPair from 'src/auth/types/TokenPair';

export interface IlogoutService {
  logout(userId: string): Promise<TokenPair>;
}
