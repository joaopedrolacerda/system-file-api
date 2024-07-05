"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const dataSource_1 = require("../dataSource");
const entities_1 = require("../entities");
const baseRepository_1 = require("./baseRepository");
class ProductRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(dataSource_1.AppDataSource, entities_1.Product);
        this.relations = [];
    }
}
exports.ProductRepository = ProductRepository;
