"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = exports.UserController = exports.OrderController = exports.BaseController = void 0;
const baseController_1 = require("./baseController");
Object.defineProperty(exports, "BaseController", { enumerable: true, get: function () { return baseController_1.BaseController; } });
const orderController_1 = __importDefault(require("./orderController"));
exports.OrderController = orderController_1.default;
const uploadController_1 = require("./uploadController");
Object.defineProperty(exports, "UploadController", { enumerable: true, get: function () { return uploadController_1.UploadController; } });
const userController_1 = __importDefault(require("./userController"));
exports.UserController = userController_1.default;
//# sourceMappingURL=index.js.map