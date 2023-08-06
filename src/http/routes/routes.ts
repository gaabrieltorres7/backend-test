import { Router } from 'express';
import multerConfig from '../../utils/multer';
import { csvFileUpload } from '../../http/controllers/csvFileUpload';
import { search } from '../controllers/search';

const router = Router();

router.post('/api/files', multerConfig.single('file'), csvFileUpload);
router.get('/api/users', search);


export { router }