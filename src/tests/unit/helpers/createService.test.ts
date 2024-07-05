import 'reflect-metadata';
import { SaveProcess } from '../../../helpers/createServices';
import { dataSourceMock, repositoryMock,queryRunnerMock } from '../../___mocks___/typeorm';
import { UserRepository } from '../../../repositories/userRepository';
import { OrderRepository } from '../../../repositories/orderRepository';
import { ProductRepository } from '../../../repositories/productRepository';
//@ts-ignore
import { User, Order, Product } from '../../../entities';

jest.mock('../../../repositories/userRepository');
jest.mock('../../../repositories/orderRepository');
jest.mock('../../../repositories/productRepository');

describe('SaveProcess', () => {
  let saveProcess: SaveProcess;
  let userData: any;

  beforeEach(() => {
    (UserRepository as jest.Mock).mockImplementation(() => repositoryMock);
    (OrderRepository as jest.Mock).mockImplementation(() => repositoryMock);
    (ProductRepository as jest.Mock).mockImplementation(() => repositoryMock);
    saveProcess = new SaveProcess(dataSourceMock as any, new UserRepository(), new OrderRepository(), new ProductRepository());

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

  it('should save user data correctly', async () => {
    repositoryMock.findOne.mockReturnValue('alo')
    repositoryMock.findOne.mockResolvedValue(null); 
    repositoryMock.findOne.mockResolvedValue(null); 
    repositoryMock.findOne.mockResolvedValue(null); 

    await saveProcess.saveUserData(userData);

    expect(queryRunnerMock.startTransaction).toHaveBeenCalled();
    expect(repositoryMock.findOne).toHaveBeenCalledWith(1);

    expect(repositoryMock.findOne).toHaveBeenCalledWith(1); 
    expect(queryRunnerMock.manager.save).toHaveBeenCalledWith(expect.any(Order));

    expect(repositoryMock.findOne).toHaveBeenCalledWith(1); 
    expect(queryRunnerMock.manager.save).toHaveBeenCalledWith(expect.any(Product));

    expect(queryRunnerMock.commitTransaction).toHaveBeenCalled();
    expect(queryRunnerMock.release).toHaveBeenCalled();
  });

  it('should rollback transaction on error', async () => {
    repositoryMock.findOne.mockResolvedValueOnce(null);
    repositoryMock.findOne.mockRejectedValueOnce(new Error('Test error')); 

    await expect(saveProcess.saveUserData(userData)).rejects.toThrow('Test error');

    expect(queryRunnerMock.startTransaction).toHaveBeenCalled();
    expect(queryRunnerMock.rollbackTransaction).toHaveBeenCalled();
    expect(queryRunnerMock.release).toHaveBeenCalled();
  });
});
