import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Client } from 'src/modules/clients/entities/client.entity';
import { Timestamps } from 'src/shared/entities/Timestamps.entity';
import { OrderProduct } from './order-product.entity';

@ObjectType()
export class Order extends Timestamps {
  @Field(() => ID)
  _id: string;

  @Field(() => Int)
  number: number;

  @Field(() => Client)
  client: Client;

  @Field(() => [OrderProduct])
  productsList: Array<OrderProduct>;
}
