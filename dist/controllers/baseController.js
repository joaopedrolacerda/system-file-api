"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    //@ts-ignore
    constructor(repository) {
        this.repository = repository;
        this.relations = ['orders', 'orders.orderProducts', 'orders.orderProducts.product'];
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = this.repository.create(req.body);
                const result = yield this.repository.save(entity);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(500).json({ message: "Ocorreu um erro no cadastro", error });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = yield this.repository.find({
                    relations: this.relations
                });
                res.status(200).json(entities);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao carregar dados", error });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                //@ts-ignore
                const entity = yield this.repository.findOne({ where: { id: id } });
                if (!entity) {
                    res.status(404).json({ message: "Item não encontrado" });
                }
                else {
                    res.status(200).json(entity);
                }
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao carregar dados", error });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                //@ts-ignore
                const entity = yield this.repository.findOne(id);
                if (!entity) {
                    res.status(404).json({ message: "Item não encontrado" });
                    return;
                }
                this.repository.merge(entity, req.body);
                const result = yield this.repository.save(entity);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao carregar dados", error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield this.repository.delete(id);
                if (result.affected === 0) {
                    res.status(404).json({ message: "Item não encontrado" });
                }
                else {
                    res.status(204).send();
                }
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao carregar dados", error });
            }
        });
    }
}
exports.BaseController = BaseController;
