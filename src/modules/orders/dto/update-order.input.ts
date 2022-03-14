import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateOrderProductInput } from './create-order-product.input';
import { CreateOrderInput } from './create-order.input';

@InputType()
export class UpdateOrderInput extends PartialType(
  OmitType(CreateOrderInput, ['productsList', 'number']),
) {
  @Field(() => [CreateOrderProductInput], { nullable: true, defaultValue: [] })
  addProducts?: Array<{
    product: MongooseSchema.Types.ObjectId;
    quantity: number;
  }>;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  removeProducts?: Array<MongooseSchema.Types.ObjectId>;
}
