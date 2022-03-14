import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Timestamps {
  @Field(() => Date)
  createdAt: string;

  @Field(() => Date)
  updatedAt: string;
}
