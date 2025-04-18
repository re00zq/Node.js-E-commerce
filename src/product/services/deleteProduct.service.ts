import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../product.schema';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class DeleteProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly i18n: I18nService,
  ) {}

  async delete(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(this.i18n.t('product.NF'));
    }
  }
}
