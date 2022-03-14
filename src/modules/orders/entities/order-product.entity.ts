import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Product } from 'src/modules/products/entities/product.entity';

@ObjectType()
export class OrderProduct {
  @Field(() => ID)
  _id: string;

  @Field(() => Product)
  product: Product;

  @Field(() => Int)
  quantity: number;
}
