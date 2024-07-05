import { Router } from 'express';
import { UserController } from '../controllers';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', (req, res) => userController.getAll(req, res));
userRoutes.post('/dates', (req, res) => userController.getByDates(req, res));

export default userRoutes;