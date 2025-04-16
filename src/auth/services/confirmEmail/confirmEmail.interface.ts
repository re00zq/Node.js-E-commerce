import { User } from 'src/users/user.schema';

export interface IConfirmEmailService {
  confirmEmail(confirmationToken: string, email: string): Promise<User>;
}
