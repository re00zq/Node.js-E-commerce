import TokenPair from 'src/auth/types/TokenPair';
import { RegisterDto } from 'src/DTOs/register.dto';

export interface IRegisterService {
  register(user: RegisterDto): Promise<TokenPair>;
}
