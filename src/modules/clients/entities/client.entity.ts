import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Timestamps } from 'src/shared/entities/Timestamps.entity';

@ObjectType()
export class Client extends Timestamps {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  DNI: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;
}
