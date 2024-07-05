"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const dataSource_1 = require("../dataSource");
const entities_1 = require("../entities");
const baseRepository_1 = require("./baseRepository");
class UserRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(dataSource_1.AppDataSource, entities_1.User);
        this.relations = ['orders', 'orders.orderProducts', 'orders.orderProducts.product'];
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map