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
exports.SaveProcess = void 0;
const repositories_1 = require("../repositories");
const repositories_2 = require("../repositories");
const repositories_3 = require("../repositories");
const entities_1 = require("../entities");
const entities_2 = require("../entities");
const entities_3 = require("../entities");
class SaveProcess {
    constructor(dataSource, userRepository, orderRepository, productRepository) {
        this.userRepository = new repositories_1.UserRepository();
        this.orderRepository = new repositories_2.OrderRepository();
        this.productRepository = new repositories_3.ProductRepository();
        this.dataSource = dataSource;
    }
    saveUserData(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = this.dataSource.createQueryRunner();
            yield queryRunner.startTransaction();
            try {
                for (const key in userData) {
                    if (userData.hasOwnProperty(key)) {
                        const userObj = userData[key];
                        //@ts-ignore
                        let user = yield this.userRepository.findOne(userObj.userId);
                        if (!user) {
                            user = new entities_1.User();
                            user.id = userObj.userId;
                            user.name = userObj.userName;
                            user.orders = [];
                            yield queryRunner.manager.save(user);
                        }
                        else {
                            user.orders = [];
                        }
                        for (const orderObj of userObj.orders) {
                            //@ts-ignore
                            let order = yield this.orderRepository.findOne(orderObj.orderId);
                            if (!order) {
                                order = new entities_2.Order();
                                order.id = orderObj.orderId;
                                order.date = orderObj.date;
                                order.total = orderObj.totalValue;
                                order.users = [];
                                order.orderProducts = [];
                            }
                            //@ts-ignore
                            if (!order.users.some(u => u.id === user.id)) {
                                order.users.push(user);
                            }
                            //@ts-ignore
                            if (!user.orders.some(o => o.id === order.id)) {
                                user.orders.push(order);
                            }
                            yield queryRunner.manager.save(order);
                            for (const productObj of orderObj.products) {
                                //@ts-ignore
                                let product = yield this.productRepository.findOne(productObj.productId);
                                if (!product) {
                                    product = new entities_3.Product();
                                    product.id = productObj.productId;
                                    product.value = productObj.value;
                                    yield queryRunner.manager.save(product);
                                }
                                let orderProduct = new entities_1.OrderProduct();
                                orderProduct.order = order;
                                orderProduct.product = product;
                                orderProduct.value = productObj.value;
                                yield queryRunner.manager.save(orderProduct);
                                //@ts-ignore
                                if (!order.orderProducts.some(op => op.id === orderProduct.id)) {
                                    order.orderProducts.push(orderProduct);
                                }
                            }
                            yield queryRunner.manager.save(order);
                        }
                        yield queryRunner.manager.save(user);
                    }
                }
                yield queryRunner.commitTransaction();
            }
            catch (err) {
                yield queryRunner.rollbackTransaction();
                throw err;
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
}
exports.SaveProcess = SaveProcess;
