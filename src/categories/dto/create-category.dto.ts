import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateCategoryDto {
  @IsString({ message: i18nValidationMessage('validation.NAME_EN_REQUIRED') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NAME_EN_REQUIRED') })
  name_en: string;

  @IsString({ message: i18nValidationMessage('validation.NAME_AR_REQUIRED') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NAME_AR_REQUIRED') })
  name_ar: string;

  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.DESCRIPTION_STRING') })
  description_en?: string;

  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.DESCRIPTION_STRING') })
  description_ar?: string;
}
