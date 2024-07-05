import { AppDataSource } from '../startDatabase';
import { User } from "../entities/";
import { BaseController } from "./baseController";
import { Request, Response } from "express";
import { UserRepository } from '../repositories';
import { Between } from 'typeorm';
import { formatDateToDB } from '../services';
class UserController extends BaseController<User> {
    relations: string[];
 
    constructor() {
        const userRepository = AppDataSource.getRepository(User);
        super(userRepository);
    
        this.relations = ['orders', 'orders.orderProducts', 'orders.orderProducts.product'];
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const entities = await this.repository.find({
                relations: this.relations,
            });
            const mapFactory = entities.map(user => ({
                ...user,
                orders: user.orders.map(order => {
                    const products = order.orderProducts.map(orderProduct => ({
                        productId: orderProduct.product.id,
                        value: orderProduct.value
                    }));

                    return {
                        ...order,
                        products,
                        orderProducts: undefined
                    };
                }),
            }));
            res.status(200).json(mapFactory);
        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro na operação", error });
        }
    }

    public async getByDates(req: Request, res: Response) {
        let { startDate, endDate } = req.body;
        if (!startDate) throw new Error('O parâmetro start date é necessário');
        if (!endDate) throw new Error('O parâmetro end date é necessário');
        startDate = formatDateToDB(startDate)
        endDate = formatDateToDB(endDate)
        try {
            const entities = await this.repository.findOne(
                {
                    //@ts-ignore
                    where: {
                        orders: { date: Between(startDate, endDate) }
                    }, relations: this.relations
                });
            res.status(200).json(entities);
        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro na operação", error });
        }
    }
}

export default UserController;