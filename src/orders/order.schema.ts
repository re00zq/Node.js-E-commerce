import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: Date,
    required: true,
  })
  date: Date;

  @Prop({ type: String, enum: ['accepted', 'refused'], default: 'refused' })
  status: String;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
