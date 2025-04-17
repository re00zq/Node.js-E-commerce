import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { CreateProductService } from './services/createProdect.service';
import { ListProductService } from './services/listProducts.service';
import { FindProductService } from './services/findProduct.service';
import { DeleteProductService } from './services/deleteProduct.service';
import { UpdateProductService } from './services/updateProduct.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createProduct: CreateProductService,
    private readonly listProducts: ListProductService,
    private readonly findProduct: FindProductService,
    private readonly deleteProduct: DeleteProductService,
    private readonly updateProduct: UpdateProductService,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.createProduct.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.listProducts.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findProduct.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.updateProduct.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteProduct.delete(id);
  }
}
