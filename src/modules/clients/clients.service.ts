import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from './client.schema';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Order, OrderDocument } from '../orders/order.schema';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(data: CreateClientInput) {
    const newClient = new this.clientModel(data);
    await newClient.save();
    return newClient;
  }

  async findAll(): Promise<Array<Client>> {
    return this.clientModel.find({});
  }

  async findOne(_id: string) {
    return await this.clientModel.findById(_id);
  }

  async update(_id: string, data: UpdateClientInput) {
    const updatedClient = await this.clientModel.findByIdAndUpdate(_id, data);
    return updatedClient;
  }

  async remove(_id: string) {
    const client = await this.clientModel.findById(_id);
    if (client) {
      await this.orderModel.deleteMany({ client: client._id });
      await client.remove();
    }
    return { success: true };
  }
}
