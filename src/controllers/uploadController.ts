import { Request, Response } from 'express';
import fs from 'fs';
import { SaveProcess } from '../helpers/createServices';
import groupValues from '../helpers/groupValues';
import { readSheet } from '../services';
// import { SaveProcess } from '../services/saveProcess';
import { AppDataSource } from '../startDatabase'; 
import { OrderRepository, ProductRepository, UserRepository } from '../repositories';


export class UploadController {
  public async uploadFile(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    const jsonToConvert = readSheet({ fileBuffer });

    const groupedValues = groupValues(jsonToConvert[0].data);

    fs.unlinkSync(filePath);

    const saveProcess = new SaveProcess(AppDataSource, new UserRepository(),new OrderRepository(), new ProductRepository());
    await saveProcess.saveUserData(groupedValues);

    res.json(groupedValues);
  }
}