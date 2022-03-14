import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order, OrderDocument } from './order.schema';
import { sendMail } from 'src/shared/email-transport';
import { MAIL_AUTH_USER } from 'src/shared/enviroments';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(data: CreateOrderInput) {
    const newOrder = new this.orderModel(data);
    await newOrder.save();
    await newOrder.populate([
      { path: 'client' },
      { path: 'productsList.product' },
    ]);

    await this.sendNotificationMail(newOrder);

    return newOrder;
  }

  async findAll() {
    const ordersList = await this.orderModel
      .find({})
      .populate([{ path: 'client' }, { path: 'productsList.product' }]);
    return ordersList;
  }

  async findOne(_id: string) {
    const order = await this.orderModel
      .findById(_id)
      .populate([{ path: 'client' }, { path: 'productsList.product' }]);
    return order;
  }

  async update(_id: string, data: UpdateOrderInput) {
    const { addProducts, removeProducts, ...restData } = data;

    await this.orderModel.updateOne({ _id }, restData);

    if (removeProducts?.length) {
      await this.orderModel.updateOne(
        { _id },
        {
          $pull: {
            productsList: {
              _id: { $in: removeProducts },
            },
          },
        },
      );
    }

    if (addProducts?.length) {
      await this.orderModel.updateOne(
        { _id },
        {
          $push: {
            productsList: addProducts,
          },
        },
      );
    }

    const order = await this.orderModel
      .findById(_id)
      .populate([{ path: 'client' }, { path: 'productsList.product' }]);

    return order;
  }

  async remove(_id: string) {
    await this.orderModel.findByIdAndDelete(_id);
    return { success: true };
  }

  async sendNotificationMail(order: OrderDocument) {
    let total = 0;
    const bodyRows = order.productsList
      .map(({ product, quantity }) => {
        const productsTotal = (product.price * quantity).toFixed(2);
        total += Number(productsTotal);
        return `
          <tr>
            <td>${product.name}</td>
            <td style="text-align: center;">
              $${product.price.toFixed(2)}
            </td>
            <td style="text-align: center;">${quantity}</td>
            <td style="text-align: center;">
              $${productsTotal}
            </td>
          </tr>`;
      })
      .join(' ');

    const message = {
      from: `Order Created <${MAIL_AUTH_USER}>`,
      to: order.client.email,
      subject: 'Order Created',
      html: `
        <h1>Order #${order.number}</h1>
        <hr>
        <h4>Products List</h4>
        <table border>
          <thead>
            <tr>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${bodyRows}
            <tr>
              <th colspan="3" style="text-align: end;">
                Global Total =
              </th>
              <td style="text-align: center;">
                $${total.toFixed(2)}
              </td>
            </tr>
          </tbody>  
        </table>
      `,
    };

    try {
      await sendMail(message);
    } catch (err) {
      console.error(err);
    }
  }
}
