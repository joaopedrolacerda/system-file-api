import { Repository, DataSource } from 'typeorm';

export class BaseRepository<T> {
    //@ts-ignore
  protected repository: Repository<T>;
  protected relations: string[] = [];

  constructor(dataSource: DataSource, entity: { new (): T }) {
    //@ts-ignore
    this.repository = dataSource.getRepository(entity);
  }
  async create(item: T): Promise<T> {
    return await this.repository.save(item);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<T | null> {
    return await this.repository.findOneBy({ id } as any);
  }
  async update(id: number, item: Partial<T>): Promise<void> {
  //@ts-ignore

    await this.repository.update(id, item);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}