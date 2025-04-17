import TokenPair from 'src/auth/types/TokenPair';
import { RegisterDto } from 'src/auth/dto/register.dto';

export interface IRegisterService {
  register(user: RegisterDto): Promise<TokenPair>;
}
