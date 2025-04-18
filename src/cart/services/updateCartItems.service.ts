import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../cart.schema';
import { UpdateCartItemsDto } from '../dto/update-cart-items.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UpdateCartItemsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private readonly i18n: I18nService,
  ) {}

  async update(userId: string, dto: UpdateCartItemsDto): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) throw new NotFoundException(this.i18n.t('cart.NF'));

    const item = cart.items.find(
      (i) => i.productId.toString() === dto.productId,
    );

    if (!item) throw new NotFoundException(this.i18n.t('cart.PRODUCT_NF'));

    item.quantity = dto.quantity;
    return cart.save();
  }
}
