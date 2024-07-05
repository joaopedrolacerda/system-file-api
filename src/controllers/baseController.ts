import { Request, Response } from "express";
import { Repository } from "typeorm";

export abstract class BaseController<T> {
    relations:  string[];
    //@ts-ignore
    protected repository: Repository<T>;
    //@ts-ignore
    constructor(repository: Repository<T>) {
        this.repository = repository;
        this.relations = ['orders', 'orders.orderProducts', 'orders.orderProducts.product'];
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const entity = this.repository.create(req.body);
            const result = await this.repository.save(entity);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro no cadastro", error });
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const entities = await this.repository.find({
                    relations: this.relations
                
                });
            res.status(200).json(entities);
        } catch (error) {
            res.status(500).json({ message: "Erro ao carregar dados", error });
        }
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            //@ts-ignore
            const entity = await this.repository.findOne({where:{id:id}});
            if (!entity) {
                res.status(404).json({ message: "Item não encontrado" });
            } else {
                res.status(200).json(entity);
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao carregar dados", error });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            //@ts-ignore
            const entity = await this.repository.findOne(id);
            if (!entity) {
                res.status(404).json({ message: "Item não encontrado" });
                return;
            }
            this.repository.merge(entity, req.body);
            const result = await this.repository.save(entity);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: "Erro ao carregar dados", error });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const result = await this.repository.delete(id);
            if (result.affected === 0) {
                res.status(404).json({ message: "Item não encontrado" });
            } else {
                res.status(204).send();
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao carregar dados", error });
        }
    }
}
