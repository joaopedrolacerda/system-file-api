"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// controllers/OrderController.ts
const startDatabase_1 = require("../startDatabase");
const entities_1 = require("../entities/"); // Import your entities
const _1 = require("./");
class OrderController extends _1.BaseController {
    constructor() {
        const orderRepository = startDatabase_1.AppDataSource.getRepository(entities_1.Order);
        super(orderRepository);
    }
}
exports.default = OrderController;
//# sourceMappingURL=orderController.js.map