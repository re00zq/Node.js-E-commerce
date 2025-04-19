import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { MakeOrderService } from './services/makeOrder.service';
import { Order } from './order.schema';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ListOrdersService } from './services/listOrders.service';
import { GetUserOrderService } from './services/getUserOrder.service';
import { DeleteOrderService } from './services/deleteOrder.service';
import { AcceptOrderService } from './services/acceptOrder.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { DeleteMyOrderService } from './services/deleteMyOrder.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly makeOrder: MakeOrderService,
    private readonly listOrders: ListOrdersService,
    private readonly getUserOrder: GetUserOrderService,
    private readonly deleteOrder: DeleteOrderService,
    private readonly acceptOrder: AcceptOrderService,
    private readonly deleteMine: DeleteMyOrderService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post('make')
  async make(@Request() req): Promise<Order> {
    const userId: string = req.user._id;
    const order: Order = await this.makeOrder.make(userId);
    return order;
  }

  @Roles(['admin'])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get()
  async findAll(): Promise<Order[]> {
    return await this.listOrders.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get('mine')
  async findOne(@Request() req): Promise<Order> {
    const userId = req.user._id;
    const order = await this.getUserOrder.getOrder(userId);
    return order;
  }

  @UseGuards(AccessTokenGuard)
  @Delete('mine')
  removeMine(@Request() req) {
    return this.deleteMine.deleteMine(req.user._id);
  }

  @Roles(['admin'])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteOrder.delete(id);
  }

  @Roles(['admin'])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Patch(':id')
  accept(@Param('id') id: string) {
    return this.acceptOrder.accept(id);
  }
}
