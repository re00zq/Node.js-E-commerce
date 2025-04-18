import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryService } from './services/createCategory.service';
import { ListCategoriesService } from './services/listCategories.service';
import { FindCategoryService } from './services/findCategory.service';
import { UpdateCategoryService } from './services/updateCategory.service';
import { DeleteCategoryService } from './services/deleteCategory.service';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategory: CreateCategoryService,
    private readonly listCategories: ListCategoriesService,
    private readonly findCategory: FindCategoryService,
    private readonly updateCategory: UpdateCategoryService,
    private readonly deleteCategory: DeleteCategoryService,
  ) {}

  @Roles(['admin'])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createCategory.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.listCategories.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findCategory.findOne(id);
  }

  @Roles(['admin'])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.updateCategory.update(id, updateCategoryDto);
  }

  @Roles(['admin'])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteCategory.delete(id);
  }
}
