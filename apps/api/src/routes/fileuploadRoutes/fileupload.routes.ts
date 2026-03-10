import {fileUpload} from '@/controllers/fileuploadControllers/file.controller';
import { validateUser } from '@/middlewares/user.middleware';
import { Router } from 'express';

const router = Router();

router.post('/', fileUpload);

export default router;