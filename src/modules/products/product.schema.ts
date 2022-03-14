import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product as ProductEntity } from './entities/product.entity';

export type ProductDocument = ProductEntity & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ unique: true })
  code: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  imageUrl: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
