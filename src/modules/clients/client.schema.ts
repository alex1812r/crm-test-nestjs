import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Client as ClientEntity } from './entities/client.entity';
export type ClientDocument = ClientEntity & Document;

@Schema({ timestamps: true })
export class Client {
  @Prop({ unique: true, required: true })
  DNI: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
