import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Client } from '../clients/client.schema';
import { Product, ProductDocument } from '../products/product.schema';
import { Order as OrderEntity } from './entities/order.entity';

export type OrderDocument = OrderEntity & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ unique: true, required: true })
  number: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Client.name,
    required: true,
  })
  client: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [
      {
        quantity: { type: Number },
        product: { type: MongooseSchema.Types.ObjectId, ref: Product.name },
      },
    ],
  })
  productsList: Array<{ quantity: number; product: ProductDocument }>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
