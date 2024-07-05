import { UserRepository } from '../repositories';
import { OrderRepository } from '../repositories';
import { ProductRepository } from '../repositories';
import { OrderProduct, User } from '../entities';
import { Order } from '../entities';
import { Product } from '../entities';
import { DataSource } from 'typeorm';

export class SaveProcess {
  private userRepository: UserRepository;
  private orderRepository: OrderRepository;
  private productRepository: ProductRepository;
  private dataSource: DataSource;

  constructor(dataSource: DataSource, userRepository: UserRepository, orderRepository: OrderRepository, productRepository: ProductRepository) {
    this.userRepository = new UserRepository();
    this.orderRepository = new OrderRepository();
    this.productRepository = new ProductRepository();
    this.dataSource = dataSource;
  }

  async saveUserData(userData: any): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      for (const key in userData) {
        if (userData.hasOwnProperty(key)) {
          const userObj = userData[key];
          //@ts-ignore
          let user = await this.userRepository.findOne(userObj.userId);
          if (!user) {
            user = new User();
            user.id = userObj.userId;
            user.name = userObj.userName;
            user.orders = [];
            await queryRunner.manager.save(user);
          } else {
            user.orders = [];
          }

          for (const orderObj of userObj.orders) {
            //@ts-ignore
            let order = await this.orderRepository.findOne( orderObj.orderId);
            if (!order) {
              order = new Order();
              order.id = orderObj.orderId;
              order.date = orderObj.date;
              order.total = orderObj.totalValue;
              order.users = [];
              order.orderProducts = [];
            }
              //@ts-ignore
            if (!order.users.some(u => u.id === user.id)) {
              order.users.push(user);
            }
            //@ts-ignore
            if (!user.orders.some(o => o.id === order.id)) {
              user.orders.push(order);
            }

            await queryRunner.manager.save(order);  

            for (const productObj of orderObj.products) {
            //@ts-ignore
              let product = await this.productRepository.findOne(productObj.productId );
              if (!product) {
                product = new Product();
                product.id = productObj.productId;
                product.value = productObj.value;
                await queryRunner.manager.save(product);
              }

              let orderProduct = new OrderProduct();
              orderProduct.order = order;
              orderProduct.product = product;
              orderProduct.value = productObj.value;

              await queryRunner.manager.save(orderProduct);
              //@ts-ignore
              if (!order.orderProducts.some(op => op.id === orderProduct.id)) {
                order.orderProducts.push(orderProduct);
              }
            }

            await queryRunner.manager.save(order);
          }

          await queryRunner.manager.save(user);
        }
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
