import { IsMongoId, IsNumber, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class AddToCartDto {
  @IsMongoId({
    message: i18nValidationMessage('validation.PRODUCT_ID_INVALID'),
  })
  productId: string;

  @IsNumber(
    {},
    { message: i18nValidationMessage('validation.QUANTITY_NUMBER') },
  )
  @Min(1, { message: i18nValidationMessage('validation.QUANTITY_MIN') })
  quantity: number;
}
