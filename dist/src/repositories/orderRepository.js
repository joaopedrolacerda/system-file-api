"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const dataSource_1 = require("../dataSource");
const entities_1 = require("../entities");
const baseRepository_1 = require("./baseRepository");
class OrderRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(dataSource_1.AppDataSource, entities_1.Order);
        this.relations = [];
    }
}
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=orderRepository.js.map