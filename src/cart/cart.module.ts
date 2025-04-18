import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { ClearCartService } from './services/clearCart.service';
import { GetUserCartService } from './services/getUserCart.service';
import { RemoveFromCartService } from './services/removeFromCart.service';
import { UpdateCartItemsService } from './services/updateCartItems.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './cart.schema';
import { AddToCartService } from './services/addToCart.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  controllers: [CartController],
  providers: [
    AddToCartService,
    ClearCartService,
    GetUserCartService,
    RemoveFromCartService,
    UpdateCartItemsService,
  ],
})
export class CartModule {}
