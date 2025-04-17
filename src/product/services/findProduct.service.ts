import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../product.schema';

@Injectable()
export class FindProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).populate('category');
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
