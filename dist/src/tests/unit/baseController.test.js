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
const typeorm_1 = require("../___mocks___/typeorm");
const controllers_1 = require("../../controllers");
class TestEntity {
}
jest.mock('typeorm', () => ({
    DataSource: jest.fn(() => typeorm_1.dataSourceMock),
    Entity: jest.fn(),
    PrimaryGeneratedColumn: jest.fn(),
    Column: jest.fn(),
    OneToMany: jest.fn(),
    ManyToOne: jest.fn(),
}));
class TestController extends controllers_1.BaseController {
    constructor() {
        //@ts-ignore
        super(typeorm_1.dataSourceMock.getRepository(TestEntity));
    }
}
describe('BaseController', () => {
    let controller;
    let req;
    let res;
    beforeEach(() => {
        controller = new TestController();
        req = {
            params: {},
            body: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
    });
    it('should create an entity', () => __awaiter(void 0, void 0, void 0, function* () {
        req.body = { name: 'Test' };
        typeorm_1.repositoryMock.create.mockReturnValue(req.body);
        typeorm_1.repositoryMock.save.mockResolvedValueOnce(req.body);
        yield controller.create(req, res);
        expect(typeorm_1.repositoryMock.create).toHaveBeenCalledWith(req.body);
        expect(typeorm_1.repositoryMock.save).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(req.body);
    }));
    //@ts-ignore
    it('should get all entities', () => __awaiter(void 0, void 0, void 0, function* () {
        const entities = [{ id: 1, name: 'Test' }];
        typeorm_1.repositoryMock.find.mockResolvedValueOnce(entities);
        yield controller.getAll(req, res);
        expect(typeorm_1.repositoryMock.find).toHaveBeenCalledWith({ relations: controller.relations });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(entities);
    }));
    //@ts-ignore
    it('should get one entity', () => __awaiter(void 0, void 0, void 0, function* () {
        const entity = { id: 1, name: 'Test' };
        //@ts-ignore
        req.params.id = '1';
        typeorm_1.repositoryMock.findOne.mockResolvedValueOnce(entity);
        yield controller.getOne(req, res);
        expect(typeorm_1.repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(entity);
    }));
    //@ts-ignore
    it('should update an entity', () => __awaiter(void 0, void 0, void 0, function* () {
        const entity = { id: 1, name: 'Test' };
        //@ts-ignore
        req.params.id = '1';
        req.body = { name: 'Test' };
        typeorm_1.repositoryMock.findOne.mockResolvedValueOnce(entity);
        typeorm_1.repositoryMock.save.mockResolvedValueOnce(Object.assign(Object.assign({}, entity), req.body));
        yield controller.update(req, res);
        expect(typeorm_1.repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
        expect(typeorm_1.repositoryMock.merge).toHaveBeenCalledWith(entity, req.body);
        expect(typeorm_1.repositoryMock.save).toHaveBeenCalledWith(Object.assign(Object.assign({}, entity), req.body));
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(Object.assign(Object.assign({}, entity), req.body));
    }));
    //@ts-ignore
    it('should delete an entity', () => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        req === null || req === void 0 ? void 0 : req.params.id = '1';
        //@ts-ignore
        typeorm_1.repositoryMock.delete.mockResolvedValueOnce({ deleted: true });
        yield controller.delete(req, res);
        expect(typeorm_1.repositoryMock.delete).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=baseController.test.js.map