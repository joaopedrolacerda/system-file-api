"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const userRoutes = (0, express_1.Router)();
const userController = new controllers_1.UserController();
userRoutes.get('/', (req, res) => userController.getAll(req, res));
userRoutes.post('/dates', (req, res) => userController.getByDates(req, res));
exports.default = userRoutes;
//# sourceMappingURL=userRoutes.js.map