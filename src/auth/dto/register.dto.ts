import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class RegisterDto {
  @IsString({ message: i18nValidationMessage('validation.FIRST_NAME_STRING') })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.FIRST_NAME_REQUIRED'),
  })
  firstName: string;

  @IsString({ message: i18nValidationMessage('validation.LAST_NAME_STRING') })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.LAST_NAME_REQUIRED'),
  })
  lastName: string;

  @IsEmail({}, { message: i18nValidationMessage('validation.EMAIL_INVALID') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.EMAIL_REQUIRED') })
  email: string;

  @IsString({ message: i18nValidationMessage('validation.PASSWORD_STRING') })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.PASSWORD_REQUIRED'),
  })
  password: string;
}
