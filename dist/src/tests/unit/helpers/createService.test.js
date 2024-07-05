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
require("reflect-metadata");
const createServices_1 = require("../../../helpers/createServices");
const typeorm_1 = require("../../___mocks___/typeorm");
const userRepository_1 = require("../../../repositories/userRepository");
const orderRepository_1 = require("../../../repositories/orderRepository");
const productRepository_1 = require("../../../repositories/productRepository");
//@ts-ignore
const entities_1 = require("../../../entities");
jest.mock('../../../repositories/userRepository');
jest.mock('../../../repositories/orderRepository');
jest.mock('../../../repositories/productRepository');
describe('SaveProcess', () => {
    let saveProcess;
    let userData;
    beforeEach(() => {
        userRepository_1.UserRepository.mockImplementation(() => typeorm_1.repositoryMock);
        orderRepository_1.OrderRepository.mockImplementation(() => typeorm_1.repositoryMock);
        productRepository_1.ProductRepository.mockImplementation(() => typeorm_1.repositoryMock);
        saveProcess = new createServices_1.SaveProcess(typeorm_1.dataSourceMock, new userRepository_1.UserRepository(), new orderRepository_1.OrderRepository(), new productRepository_1.ProductRepository());
        userData = {
            user1: {
                userId: 1,
                userName: 'User',
                orders: [
                    {
                        orderId: 1,
                        date: '2020-12-01',
                        totalValue: 100,
                        products: [
                            { productId: 11, value: 250 },
                            { productId: 22, value: 250 },
                        ],
                    },
                ],
            },
        };
    });
    it('should save user data correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        typeorm_1.repositoryMock.findOne.mockReturnValue('alo');
        typeorm_1.repositoryMock.findOne.mockResolvedValue(null);
        typeorm_1.repositoryMock.findOne.mockResolvedValue(null);
        typeorm_1.repositoryMock.findOne.mockResolvedValue(null);
        yield saveProcess.saveUserData(userData);
        expect(typeorm_1.queryRunnerMock.startTransaction).toHaveBeenCalled();
        expect(typeorm_1.repositoryMock.findOne).toHaveBeenCalledWith(1);
        expect(typeorm_1.repositoryMock.findOne).toHaveBeenCalledWith(1);
        expect(typeorm_1.queryRunnerMock.manager.save).toHaveBeenCalledWith(expect.any(entities_1.Order));
        expect(typeorm_1.repositoryMock.findOne).toHaveBeenCalledWith(1);
        expect(typeorm_1.queryRunnerMock.manager.save).toHaveBeenCalledWith(expect.any(entities_1.Product));
        expect(typeorm_1.queryRunnerMock.commitTransaction).toHaveBeenCalled();
        expect(typeorm_1.queryRunnerMock.release).toHaveBeenCalled();
    }));
    it('should rollback transaction on error', () => __awaiter(void 0, void 0, void 0, function* () {
        typeorm_1.repositoryMock.findOne.mockResolvedValueOnce(null);
        typeorm_1.repositoryMock.findOne.mockRejectedValueOnce(new Error('Test error'));
        yield expect(saveProcess.saveUserData(userData)).rejects.toThrow('Test error');
        expect(typeorm_1.queryRunnerMock.startTransaction).toHaveBeenCalled();
        expect(typeorm_1.queryRunnerMock.rollbackTransaction).toHaveBeenCalled();
        expect(typeorm_1.queryRunnerMock.release).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=createService.test.js.map