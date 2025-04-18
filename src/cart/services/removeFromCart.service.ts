import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../cart.schema';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class RemoveFromCartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private readonly i18n: I18nService,
  ) {}

  async remove(userId: string, productId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) throw new NotFoundException(this.i18n.t('NF'));

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );

    return cart.save();
  }
}
