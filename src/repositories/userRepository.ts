import { AppDataSource } from '../dataSource';
import { User } from '../entities';
import { BaseRepository } from './baseRepository';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(AppDataSource, User);
    this.relations = ['orders', 'orders.orderProducts', 'orders.orderProducts.product'];
  }
}