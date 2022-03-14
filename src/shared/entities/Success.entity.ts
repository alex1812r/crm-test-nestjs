import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Success {
  @Field(() => Boolean)
  success: boolean;
}
