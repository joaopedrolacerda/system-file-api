"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const startDatabase_1 = require("../startDatabase");
const entities_1 = require("../entities/");
const baseController_1 = require("./baseController");
const typeorm_1 = require("typeorm");
const services_1 = require("../services");
class UserController extends baseController_1.BaseController {
    constructor() {
        const userRepository = startDatabase_1.AppDataSource.getRepository(entities_1.User);
        super(userRepository);
        this.relations = ['orders', 'orders.orderProducts', 'orders.orderProducts.product'];
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = yield this.repository.find({
                    relations: this.relations,
                });
                const mapFactory = entities.map(user => (Object.assign(Object.assign({}, user), { orders: user.orders.map(order => {
                        const products = order.orderProducts.map(orderProduct => ({
                            productId: orderProduct.product.id,
                            value: orderProduct.value
                        }));
                        return Object.assign(Object.assign({}, order), { products, orderProducts: undefined });
                    }) })));
                res.status(200).json(mapFactory);
            }
            catch (error) {
                res.status(500).json({ message: "Ocorreu um erro na operação", error });
            }
        });
    }
    getByDates(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { startDate, endDate } = req.body;
            if (!startDate)
                throw new Error('O parâmetro start date é necessário');
            if (!endDate)
                throw new Error('O parâmetro end date é necessário');
            startDate = (0, services_1.formatDateToDB)(startDate);
            endDate = (0, services_1.formatDateToDB)(endDate);
            try {
                const entities = yield this.repository.findOne({
                    //@ts-ignore
                    where: {
                        orders: { date: (0, typeorm_1.Between)(startDate, endDate) }
                    }, relations: this.relations
                });
                res.status(200).json(entities);
            }
            catch (error) {
                res.status(500).json({ message: "Ocorreu um erro na operação", error });
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map