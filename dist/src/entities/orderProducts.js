"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProduct = void 0;
const typeorm_1 = require("typeorm");
const order_1 = require("./order");
const product_1 = require("./product");
let OrderProduct = class OrderProduct {
};
exports.OrderProduct = OrderProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
    //@ts-ignore
    ,
    __metadata("design:type", Number)
], OrderProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_1.Order, order => order.orderProducts)
    //@ts-ignore
    ,
    __metadata("design:type", order_1.Order)
], OrderProduct.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_1.Product, product => product.orderProducts)
    //@ts-ignore
    ,
    __metadata("design:type", product_1.Product)
], OrderProduct.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 })
    //@ts-ignore
    ,
    __metadata("design:type", Number)
], OrderProduct.prototype, "value", void 0);
exports.OrderProduct = OrderProduct = __decorate([
    (0, typeorm_1.Entity)()
], OrderProduct);
//# sourceMappingURL=orderProducts.js.map