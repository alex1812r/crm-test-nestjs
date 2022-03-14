import { InputType, ID, Field, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateOrderProductInput {
  @Field(() => ID)
  product: MongooseSchema.Types.ObjectId;

  @Field(() => Int)
  quantity: number;
}
