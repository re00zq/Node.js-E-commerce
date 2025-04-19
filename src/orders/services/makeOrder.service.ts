import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../order.schema';

@Injectable()
export class MakeOrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async make(id: string): Promise<Order> {
    const order = new this.orderModel({ date: Date.now(), userId: id });
    return order.save();
  }
}
