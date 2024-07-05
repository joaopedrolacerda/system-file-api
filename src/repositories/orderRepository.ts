import { AppDataSource } from '../dataSource';
import { Order } from '../entities';
import { BaseRepository } from './baseRepository';

export class OrderRepository extends BaseRepository<Order> {
  constructor() {
    super(AppDataSource, Order);
    this.relations = [];
  }
}