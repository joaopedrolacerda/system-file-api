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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const _1 = require("./");
const _2 = require("./");
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
    //@ts-ignore
    ,
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)()
    //@ts-ignore
    ,
    __metadata("design:type", String)
], Order.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 })
    //@ts-ignore
    ,
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => _1.User, user => user.orders)
    //@ts-ignore
    ,
    __metadata("design:type", Array)
], Order.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _2.OrderProduct, orderProduct => orderProduct.order, { cascade: true })
    //@ts-ignore
    ,
    __metadata("design:type", Array)
], Order.prototype, "orderProducts", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)()
], Order);
