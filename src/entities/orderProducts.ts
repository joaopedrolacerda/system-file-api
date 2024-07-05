import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order';
import { Product } from './product';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
//@ts-ignore

  id: number;

  @ManyToOne(() => Order, order => order.orderProducts)
//@ts-ignore

  order: Order;

  @ManyToOne(() => Product, product => product.orderProducts)
//@ts-ignore

  product: Product;

  @Column('decimal', { precision: 10, scale: 2 })
//@ts-ignore

  value: number;
}
