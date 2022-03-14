import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClientInput {
  @Field(() => String, { description: 'Documento Nacional de Identidad' })
  DNI: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;
}
