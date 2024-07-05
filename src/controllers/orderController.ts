// controllers/OrderController.ts
import { AppDataSource } from '../startDatabase';
import { Order } from '../entities/'; // Import your entities
import { BaseController } from './';

export default class OrderController extends BaseController<Order> {
  constructor() {
    const orderRepository = AppDataSource.getRepository(Order);
    super(orderRepository);
  }
}
