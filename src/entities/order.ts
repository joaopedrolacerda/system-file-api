import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { User } from './';
import { OrderProduct } from './';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  //@ts-ignore

  id: number;

  @Column()
  //@ts-ignore

  date: string;

  @Column('decimal', { precision: 10, scale: 2 })
  //@ts-ignore

  total: number;

  @ManyToMany(() => User, user => user.orders)
  //@ts-ignore

  users: User[];

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.order, { cascade: true })
  //@ts-ignore

  orderProducts: OrderProduct[];
}
