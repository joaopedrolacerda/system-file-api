import { Router } from 'express';
import multer from 'multer';
import { UploadController } from '../controllers';

const upload = multer({ dest: 'uploads/' });
const UploadRoutes = Router();
const uploadController = new UploadController();

UploadRoutes.post('/upload', upload.single('file'), (req, res) => uploadController.uploadFile(req, res));

export default UploadRoutes;