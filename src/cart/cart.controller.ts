import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { GetUserCartService } from './services/getUserCart.service';
import { UpdateCartItemsService } from './services/updateCartItems.service';
import { RemoveFromCartService } from './services/removeFromCart.service';
import { ClearCartService } from './services/clearCart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemsDto } from './dto/update-cart-items.dto';
import { AddToCartService } from './services/addToCart.service';

@Controller('cart')
@UseGuards(AccessTokenGuard)
export class CartController {
  constructor(
    private readonly addToCartService: AddToCartService,
    private readonly getUserCartService: GetUserCartService,
    private readonly updateCartItemService: UpdateCartItemsService,
    private readonly removeFromCartService: RemoveFromCartService,
    private readonly clearCartService: ClearCartService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async addToCart(@Body() dto: AddToCartDto, @Request() req) {
    const userId = req.user._id;
    const cart = await this.addToCartService.add(userId, dto);
    return {
      status: 'success',
      data: { cart },
    };
  }

  @Get()
  async getUserCart(@Request() req) {
    const userId = req.user._id;
    const cart = await this.getUserCartService.getCart(userId);
    return {
      status: 'success',
      data: { cart },
    };
  }

  @Patch()
  async updateItem(@Body() dto: UpdateCartItemsDto, @Request() req) {
    const userId = req.user._id;
    const cart = await this.updateCartItemService.update(userId, dto);
    return {
      status: 'success',
      data: { cart },
    };
  }

  @Delete(':productId')
  async removeItem(@Param('productId') productId: string, @Request() req) {
    const userId = req.user._id;
    const cart = await this.removeFromCartService.remove(userId, productId);
    return {
      status: 'success',
      data: { cart },
    };
  }

  @Delete()
  async clearCart(@Request() req) {
    const userId = req.user._id;
    return await this.clearCartService.clear(userId);
  }
}
