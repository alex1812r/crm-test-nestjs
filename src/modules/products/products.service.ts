import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product, ProductDocument } from './product.schema';
import { Order, OrderDocument } from '../orders/order.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(data: CreateProductInput) {
    const newProduct = new this.productModel(data);
    await newProduct.save();
    return newProduct;
  }

  async findAll(): Promise<Array<Product>> {
    return await this.productModel.find({});
  }

  async findOne(_id: string) {
    return await this.productModel.findById(_id);
  }

  async update(_id: string, data: UpdateProductInput) {
    const updatedProduct = await this.productModel.findByIdAndUpdate(_id, data);
    return updatedProduct;
  }

  async remove(_id: string) {
    const product = await this.productModel.findById(_id);
    if (product) {
      await this.orderModel.updateMany(
        {},
        {
          $pull: {
            productsList: {
              product: _id,
            },
          },
        },
      );

      await product.remove();
    }
    return {
      success: true,
    };
  }
}
