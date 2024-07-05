import { Router } from 'express';
import { OrderController } from '../controllers';

const OrderRoutes = Router();
const orderController = new OrderController();

OrderRoutes.get('/', (req, res) => orderController.getAll(req, res));
OrderRoutes.get('/:id', (req, res) => orderController.getOne(req, res));

export default OrderRoutes;