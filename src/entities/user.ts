import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Order } from './';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
//@ts-ignore
  id: number;

  @Column()
//@ts-ignore

  name: string;
  @ManyToMany(() => Order, order => order.users)
  @JoinTable()
//@ts-ignore
  orders: Order[];
}