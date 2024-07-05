import express from 'express';
import { createRequire } from 'module';

//@ts-ignore
import { initializeDatabase } from './startDatabase';
import multer from 'multer';
import fs from 'fs';
import * as dotenv from 'dotenv';
//@ts-ignore


import {OrderRoutes, UploadRoutes, userRoutes} from './routes';
dotenv.config();

const startApp = async () => {
  const app = express();
  const upload = multer({ dest: 'uploads/' });
  app.use(express.json());

  try {
    await initializeDatabase();

    // app.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    //   if (!req.file) {
    //     return res.status(400).send('No file uploaded.');
    //   }

    //   const filePath = req.file.path;
    //   const fileBuffer = fs.readFileSync(filePath);
    //   const jsonToConvert = readSheet({ fileBuffer });

    //   const groupedValues = groupValues(jsonToConvert[0].data);

    //   fs.unlinkSync(filePath);

    //   const userService = new SaveProcess(AppDataSource);
    //   await userService.saveUserData(groupedValues);

    //   res.json(groupedValues);
    // });

    app.use('/users', userRoutes);
    app.use('/files', UploadRoutes);
    app.use('/orders', OrderRoutes)

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {

    console.error('Failed to initialize the app:', error);
  
  }
};

startApp();
