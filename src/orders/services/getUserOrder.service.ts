import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../order.schema';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class GetUserOrderService {
  constructor(
    @InjectModel(Order.name) private OrderModel: Model<OrderDocument>,
    private readonly i18n: I18nService,
  ) {}

  async getOrder(userId: string): Promise<Order> {
    const order: Order | null = await this.OrderModel.findOne({
      userId,
    });
    if (!order) throw new NotFoundException(this.i18n.t('order.NF'));
    return order;
  }
}
