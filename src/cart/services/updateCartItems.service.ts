import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../cart.schema';
import { UpdateCartItemsDto } from '../dto/update-cart-items.dto';

@Injectable()
export class UpdateCartItemsService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async update(userId: string, dto: UpdateCartItemsDto): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) throw new NotFoundException('Cart not found');

    const item = cart.items.find(
      (i) => i.productId.toString() === dto.productId,
    );

    if (!item) throw new NotFoundException('Product not in cart');

    item.quantity = dto.quantity;
    return cart.save();
  }
}
