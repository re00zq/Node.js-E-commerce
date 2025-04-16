import TokenPair from 'src/auth/types/TokenPair';

export interface ILoginService {
  login(email: string, password: string): Promise<TokenPair>;
}
