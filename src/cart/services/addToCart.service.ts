import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../cart.schema';
import { AddToCartDto } from '../dto/add-to-cart.dto';

@Injectable()
export class AddToCartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async add(userId: string, dto: AddToCartDto): Promise<Cart> {
    let cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      cart = new this.cartModel({ userId, items: [dto] });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === dto.productId,
      );

      if (existingItem) {
        existingItem.quantity += dto.quantity;
      } else {
        cart.items.push(dto);
      }
    }

    return cart.save();
  }
}
