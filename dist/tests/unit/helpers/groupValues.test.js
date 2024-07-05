"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groupValues_1 = __importDefault(require("../../../helpers/groupValues"));
const services_1 = require("../../../services");
// Mock the formatDateToDB function
jest.mock('../../../services', () => ({
    formatDateToDB: jest.fn(),
}));
describe('groupValues', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('should group orders by userId and orderId', () => {
        const data = [
            { userId: 2, userName: 'Medeiros', orderId: 12345, productId: 111, value: 256.24, date: '01/12/2020' },
            { userId: 2, userName: 'Medeiros', orderId: 12345, value: 256.24, date: '01/12/2020' }
        ];
        services_1.formatDateToDB.mockReturnValueOnce('2020-12-01');
        services_1.formatDateToDB.mockReturnValueOnce('2020-12-01');
        const expectedOutput = {
            2: {
                userName: 'Medeiros',
                userId: 2,
                orders: [
                    {
                        orderId: 12345,
                        totalValue: 512.48,
                        date: '2020-12-01',
                        products: [
                            { productId: 111, value: 256.24 },
                            { productId: undefined, value: 256.24 }
                        ]
                    }
                ]
            }
        };
        const result = (0, groupValues_1.default)(data);
        expect(result).toEqual(expectedOutput);
    });
    it('should handle an empty input array', () => {
        const data = [];
        const expectedOutput = {};
        const result = (0, groupValues_1.default)(data);
        expect(result).toEqual(expectedOutput);
    });
    it('should group orders correctly with multiple users and orders', () => {
        const data = [
            { userId: 1, userName: 'test user do joão', orderId: 101, productId: 201, value: 50, date: '01/12/2020' },
            { userId: 1, userName: 'test user do joão', orderId: 102, productId: 202, value: 75, date: '02/12/2020' },
            { userId: 2, userName: 'test user do joão 2', orderId: 103, productId: 203, value: 1000, date: '03/12/2020' },
            { userId: 2, userName: 'test user do joão 2', orderId: 104, productId: 204, value: 1500, date: '04/12/2020' },
        ];
        services_1.formatDateToDB.mockReturnValueOnce('2020-12-01');
        services_1.formatDateToDB.mockReturnValueOnce('2020-12-02');
        services_1.formatDateToDB.mockReturnValueOnce('2020-12-03');
        services_1.formatDateToDB.mockReturnValueOnce('2020-12-04');
        const expectedOutput = {
            1: {
                userName: 'test user do joão',
                userId: 1,
                orders: [
                    {
                        orderId: 101,
                        products: [{ productId: 201, value: 50 }],
                        totalValue: 50,
                        date: '2020-12-01',
                    },
                    {
                        orderId: 102,
                        products: [{ productId: 202, value: 75 }],
                        totalValue: 75,
                        date: '2020-12-02',
                    },
                ],
            },
            2: {
                userName: 'test user do joão 2',
                userId: 2,
                orders: [
                    {
                        orderId: 103,
                        products: [{ productId: 203, value: 1000 }],
                        totalValue: 1000,
                        date: '2020-12-03',
                    },
                    {
                        orderId: 104,
                        products: [{ productId: 204, value: 1500 }],
                        totalValue: 1500,
                        date: '2020-12-04',
                    },
                ],
            },
        };
        const result = (0, groupValues_1.default)(data);
        expect(result).toEqual(expectedOutput);
    });
});
