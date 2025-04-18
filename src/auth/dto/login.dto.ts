import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginDto {
  @IsEmail({}, { message: i18nValidationMessage('validation.EMAIL_INVALID') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.EMAIL_REQUIRED') })
  email: string;

  @IsString({ message: i18nValidationMessage('validation.PASSWORD_STRING') })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.PASSWORD_REQUIRED'),
  })
  password: string;
}
