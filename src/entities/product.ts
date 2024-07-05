import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderProduct } from './';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
//@ts-ignore

  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
//@ts-ignore

  value: number;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
//@ts-ignore

  orderProducts: OrderProduct[];
}
