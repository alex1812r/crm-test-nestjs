import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Success } from 'src/shared/entities/Success.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  async createProduct(@Args('data') data: CreateProductInput) {
    return await this.productsService.create(data);
  }

  @Query(() => [Product], { name: 'productsList' })
  async findAll() {
    return await this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('_id', { type: () => ID }) _id: string) {
    return this.productsService.findOne(_id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('_id', { type: () => ID }) _id: string,
    @Args('data') data: UpdateProductInput,
  ) {
    return this.productsService.update(_id, data);
  }

  @Mutation(() => Success)
  removeProduct(@Args('_id', { type: () => ID }) _id: string) {
    return this.productsService.remove(_id);
  }
}
