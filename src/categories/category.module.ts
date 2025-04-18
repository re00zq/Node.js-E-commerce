import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryController } from './category.controller';
import { Category, CategorySchema } from './category.schema';
import { CreateCategoryService } from './services/createCategory.service';
import { DeleteCategoryService } from './services/deleteCategory.service';
import { UpdateCategoryService } from './services/updateCategory.service';
import { FindCategoryService } from './services/findCategory.service';
import { ListCategoriesService } from './services/listCategories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [
    CreateCategoryService,
    DeleteCategoryService,
    UpdateCategoryService,
    FindCategoryService,
    ListCategoriesService,
  ],
})
export class CategoryModule {}
