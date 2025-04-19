import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../order.schema';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class DeleteOrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly i18n: I18nService,
  ) {}

  async delete(id: string) {
    const result = await this.orderModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(this.i18n.t('order.NF'));
    }
    return {
      status: 'success',
      message: this.i18n.t('order.DELETED'),
    };
  }
}
