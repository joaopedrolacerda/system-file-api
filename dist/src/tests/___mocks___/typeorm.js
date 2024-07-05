"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceMock = exports.queryRunnerMock = exports.repositoryMock = void 0;
exports.repositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    merge: jest.fn(),
};
exports.queryRunnerMock = {
    manager: {
        save: jest.fn(),
    },
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
};
exports.dataSourceMock = {
    createQueryRunner: jest.fn(() => exports.queryRunnerMock),
    getRepository: jest.fn(() => exports.repositoryMock),
};
jest.mock('typeorm', () => ({
    DataSource: jest.fn(() => exports.dataSourceMock),
    Entity: jest.fn(),
    PrimaryGeneratedColumn: jest.fn(),
    Column: jest.fn(),
    OneToMany: jest.fn(),
    ManyToOne: jest.fn(),
    ManyToMany: jest.fn(),
    JoinTable: jest.fn(),
}));
//# sourceMappingURL=typeorm.js.map