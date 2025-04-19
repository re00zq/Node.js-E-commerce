import { Injectable, NotFoundException } from '@nestjs/common';
import { Order, OrderDocument } from '../order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { I18nService } from 'nestjs-i18n';
import { ClearCartService } from 'src/cart/services/clearCart.service';

@Injectable()
export class AcceptOrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly i18n: I18nService,
    private readonly clearCart: ClearCartService,
  ) {}
  async accept(id: string): Promise<Order> {
    const acceptedOrder = await this.orderModel.findByIdAndUpdate(id, {
      status: 'accepted',
    });
    if (!acceptedOrder) throw new NotFoundException(this.i18n.t('order.NF'));
    const userId: string = acceptedOrder.userId.toString();
    this.clearCart.clear(userId);

    return acceptedOrder;
  }
}
