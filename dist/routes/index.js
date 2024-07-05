"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = exports.UploadRoutes = exports.userRoutes = void 0;
const orderRoute_1 = __importDefault(require("./orderRoute"));
exports.OrderRoutes = orderRoute_1.default;
const uploadRoute_1 = __importDefault(require("./uploadRoute"));
exports.UploadRoutes = uploadRoute_1.default;
const userRoutes_1 = __importDefault(require("./userRoutes"));
exports.userRoutes = userRoutes_1.default;
