import { Router } from 'express';
import uploadsController from '../controllers/uploadsController.js';
const router = new Router();

router.post('/uploads', uploadsController.upload);

export default router;
