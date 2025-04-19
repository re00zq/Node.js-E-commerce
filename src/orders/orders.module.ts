import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { Order, OrderSchema } from './order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AcceptOrderService } from './services/acceptOrder.service';
import { DeleteOrderService } from './services/deleteOrder.service';
import { GetUserOrderService } from './services/getUserOrder.service';
import { ListOrdersService } from './services/listOrders.service';
import { MakeOrderService } from './services/makeOrder.service';
import { ClearCartService } from 'src/cart/services/clearCart.service';
import { CartModule } from 'src/cart/cart.module';
import { DeleteMyOrderService } from './services/deleteMyOrder.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CartModule,
  ],
  controllers: [OrdersController],
  providers: [
    AcceptOrderService,
    DeleteOrderService,
    GetUserOrderService,
    ListOrdersService,
    MakeOrderService,
    DeleteMyOrderService,
  ],
})
export class OrdersModule {}
