import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../category.schema';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class FindCategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    private readonly i18n: I18nService,
  ) {}

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException(this.i18n.t('category.NF'));
    }
    return category;
  }
}
