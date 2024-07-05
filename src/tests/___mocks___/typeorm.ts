import { DataSource } from 'typeorm';

export const repositoryMock = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  merge: jest.fn(),
};
export const queryRunnerMock = {
  manager: {
    save: jest.fn(),
  },
  startTransaction: jest.fn(),
  commitTransaction: jest.fn(),
  rollbackTransaction: jest.fn(),
  release: jest.fn(),
};
export const dataSourceMock = {
  createQueryRunner: jest.fn(() => queryRunnerMock),
  getRepository: jest.fn(() => repositoryMock),
};

jest.mock('typeorm', () => ({
  DataSource: jest.fn(() => dataSourceMock),
  Entity: jest.fn(),
  PrimaryGeneratedColumn: jest.fn(),
  Column: jest.fn(),
  OneToMany: jest.fn(),
  ManyToOne: jest.fn(),
  ManyToMany: jest.fn(),
  JoinTable: jest.fn(),
}));