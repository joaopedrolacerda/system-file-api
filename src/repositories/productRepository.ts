import { AppDataSource } from '../dataSource';
import { Product } from '../entities';
import { BaseRepository } from './baseRepository';

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(AppDataSource, Product);
    this.relations = [];
  }
}