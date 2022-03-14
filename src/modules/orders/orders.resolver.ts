import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { Success } from 'src/shared/entities/Success.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  createOrder(@Args('data') data: CreateOrderInput) {
    return this.ordersService.create(data);
  }

  @Query(() => [Order], { name: 'ordersList' })
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('_id', { type: () => ID }) _id: string) {
    return this.ordersService.findOne(_id);
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('_id', { type: () => ID }) _id: string,
    @Args('data') data: UpdateOrderInput,
  ) {
    return await this.ordersService.update(_id, data);
  }

  @Mutation(() => Success)
  async removeOrder(@Args('_id', { type: () => ID }) _id: string) {
    return await this.ordersService.remove(_id);
  }
}
