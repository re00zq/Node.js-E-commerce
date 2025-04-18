import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductSearchService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(query: string = ''): Promise<Product[]> {
    const searchRegex = new RegExp(query, 'i'); // case-insensitive

    // console.log(searchRegex);

    return this.productModel
      .find({
        $or: [
          { name_en: { $regex: searchRegex } },
          { description_en: { $regex: searchRegex } },
        ],
      })
      .exec();
  }
}
