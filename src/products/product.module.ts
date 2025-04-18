import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from './product.controller';
import { CreateProductService } from './services/createProdect.service';
import { DeleteProductService } from './services/deleteProduct.service';
import { FindProductService } from './services/findProduct.service';
import { ListProductService } from './services/listProducts.service';
import { UpdateProductService } from './services/updateProduct.service';
import { Product, ProductSchema } from './product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [
    CreateProductService,
    DeleteProductService,
    FindProductService,
    ListProductService,
    UpdateProductService,
  ],
})
export class ProductModule {}
