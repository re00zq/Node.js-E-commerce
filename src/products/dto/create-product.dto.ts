import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateProductDto {
  @IsString({ message: i18nValidationMessage('validation.NAME_EN_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NAME_EN_REQUIRED') })
  name_en: string;

  @IsString({ message: i18nValidationMessage('validation.NAME_AR_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NAME_AR_REQUIRED') })
  name_ar: string;

  @IsString({
    message: i18nValidationMessage('validation.DESCRIPTION_EN_STRING'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.DESCRIPTION_EN_REQUIRED'),
  })
  description_en: string;

  @IsString({
    message: i18nValidationMessage('validation.DESCRIPTION_AR_STRING'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.DESCRIPTION_AR_REQUIRED'),
  })
  description_ar: string;

  @IsNumber({}, { message: i18nValidationMessage('validation.PRICE_NUMBER') })
  price: number;

  @IsNumber({}, { message: i18nValidationMessage('validation.STOCK_NUMBER') })
  @IsOptional()
  stock?: number;

  @IsString({ message: i18nValidationMessage('validation.IMAGE_URL_STRING') })
  @IsOptional()
  imageUrl?: string;

  @IsMongoId({ message: i18nValidationMessage('validation.CATEGORY_MONGO_ID') })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.CATEGORY_REQUIRED'),
  })
  category: string;
}
