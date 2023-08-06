import { Router } from 'express';
import multerConfig from '../utils/multer';
import { csvFileUpload } from './csvFileUpload';

const router = Router();

router.post('/api/files', multerConfig.single('file'), csvFileUpload);


export { router }