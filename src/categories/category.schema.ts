import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String, required: true })
  name_en: string;

  @Prop({ type: String, required: true })
  name_ar: string;

  @Prop({ type: String })
  description_en?: string;

  @Prop({ type: String })
  description_ar?: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
