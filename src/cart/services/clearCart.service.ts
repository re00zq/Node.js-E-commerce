import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../cart.schema';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ClearCartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private readonly i18n: I18nService,
  ) {}

  async clear(userId: string) {
    await this.cartModel.findOneAndUpdate({ userId }, { items: [] });
    return {
      status: 'success',
      message: this.i18n.t('cart.CLEARED'),
    };
  }
}
