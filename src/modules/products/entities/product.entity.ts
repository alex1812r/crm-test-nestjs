import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Timestamps } from 'src/shared/entities/Timestamps.entity';

@ObjectType()
export class Product extends Timestamps {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  code: string;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  imageUrl: string;
}
