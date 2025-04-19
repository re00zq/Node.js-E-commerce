import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../order.schema';
import { I18nService } from 'nestjs-i18n';
import { DeleteOrderService } from './deleteOrder.service';

@Injectable()
export class DeleteMyOrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly deleteOrder: DeleteOrderService,
    private readonly i18n: I18nService,
  ) {}

  async deleteMine(id: string) {
    const order: OrderDocument | null = await this.orderModel.findOne({
      userId: id,
    });
    if (!order) throw new NotFoundException(this.i18n.t('order.MINE_NF'));
    this.deleteOrder.delete(order._id.toString());
  }
}
