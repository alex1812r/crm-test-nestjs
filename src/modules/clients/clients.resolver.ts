import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Success } from 'src/shared/entities/Success.entity';

@Resolver(() => Client)
export class ClientsResolver {
  constructor(private readonly clientsService: ClientsService) {}

  @Mutation(() => Client)
  async createClient(@Args('data') data: CreateClientInput) {
    return await this.clientsService.create(data);
  }

  @Query(() => [Client], { name: 'clientsList' })
  async findAll() {
    return await this.clientsService.findAll();
  }

  @Query(() => Client, { name: 'client' })
  findOne(@Args('_id', { type: () => ID }) _id: string) {
    return this.clientsService.findOne(_id);
  }

  @Mutation(() => Client)
  async updateClient(
    @Args('_id', { type: () => ID }) _id: string,
    @Args('data') data: UpdateClientInput,
  ) {
    return await this.clientsService.update(_id, data);
  }

  @Mutation(() => Success)
  removeClient(@Args('_id', { type: () => ID }) _id: string) {
    return this.clientsService.remove(_id);
  }

  @ResolveField()
  async ordersList(@Parent() client: Client) {
    return await this.clientsService.findOrders(client._id);
  }
}
