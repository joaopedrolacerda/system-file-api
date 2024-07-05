import { Request, Response } from 'express';
import { repositoryMock, dataSourceMock } from '../___mocks___/typeorm';
import { BaseController } from '../../controllers';

class TestEntity {}

jest.mock('typeorm', () => ({
  DataSource: jest.fn(() => dataSourceMock),
  Entity: jest.fn(),
  PrimaryGeneratedColumn: jest.fn(),
  Column: jest.fn(),
  OneToMany: jest.fn(),
  ManyToOne: jest.fn(),
}));

class TestController extends BaseController<TestEntity> {
  constructor() {
    //@ts-ignore
    super(dataSourceMock.getRepository(TestEntity));
  }
}
describe('BaseController', () => {
  let controller: TestController;
  let req: Partial<Request>;
  let res: Partial<Response>;

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

  it('should create an entity', async () => {
    req.body = { name: 'Test' };
    repositoryMock.create.mockReturnValue(req.body);
    repositoryMock.save.mockResolvedValueOnce(req.body);

    await controller.create(req as Request, res as Response);

    expect(repositoryMock.create).toHaveBeenCalledWith(req.body);
    expect(repositoryMock.save).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });
//@ts-ignore
it('should get all entities', async () => {
    const entities = [{ id: 1, name: 'Test' }];
    repositoryMock.find.mockResolvedValueOnce(entities);

    await controller.getAll(req as Request, res as Response);

    expect(repositoryMock.find).toHaveBeenCalledWith({ relations: controller.relations });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(entities);
  });
//@ts-ignore
  it('should get one entity', async () => {
    const entity = { id: 1, name: 'Test' };
    //@ts-ignore
    req.params.id = '1';
    repositoryMock.findOne.mockResolvedValueOnce(entity);

    await controller.getOne(req as Request, res as Response);

    expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(entity);
  });
  //@ts-ignore
  it('should update an entity', async () => {
    const entity = { id: 1, name: 'Test' };
    //@ts-ignore
    req.params.id = '1';
    req.body = { name: 'Test' };
    repositoryMock.findOne.mockResolvedValueOnce(entity);
    repositoryMock.save.mockResolvedValueOnce({ ...entity, ...req.body });

    await controller.update(req as Request, res as Response);

    expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(repositoryMock.merge).toHaveBeenCalledWith(entity, req.body);
    expect(repositoryMock.save).toHaveBeenCalledWith({ ...entity, ...req.body });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ...entity, ...req.body });
  });
 //@ts-ignore
  it('should delete an entity', async () => {
    //@ts-ignore
    req?.params.id = '1';
    //@ts-ignore
    repositoryMock.delete.mockResolvedValueOnce({ deleted: true });

    await controller.delete(req as Request, res as Response);

    expect(repositoryMock.delete).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});