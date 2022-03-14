import { InputType, ID, Field, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateOrderProductInput } from './create-order-product.input';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  number: number;

  @Field(() => ID)
  client: MongooseSchema.Types.ObjectId;

  @Field(() => [CreateOrderProductInput])
  productsList: Array<{
    product: MongooseSchema.Types.ObjectId;
    quantity: number;
  }>;
}
