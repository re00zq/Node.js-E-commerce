import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../category.schema';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UpdateCategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    private readonly i18n: I18nService,
  ) {}

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!category) {
      throw new NotFoundException(this.i18n.t('category.NF'));
    }
    return category;
  }
}
