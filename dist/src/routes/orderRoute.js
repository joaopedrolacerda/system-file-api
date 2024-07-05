"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const OrderRoutes = (0, express_1.Router)();
const orderController = new controllers_1.OrderController();
OrderRoutes.get('/', (req, res) => orderController.getAll(req, res));
OrderRoutes.get('/:id', (req, res) => orderController.getOne(req, res));
exports.default = OrderRoutes;
//# sourceMappingURL=orderRoute.js.map