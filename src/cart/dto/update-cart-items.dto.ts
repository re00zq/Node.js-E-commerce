import { IsMongoId, IsNumber, Min } from 'class-validator';

export class UpdateCartItemsDto {
  @IsMongoId()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
