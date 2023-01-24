import { Router } from 'express';
import searchController from '../controllers/searchController.js';
const router = new Router();

router.get('/search/:value', searchController.getSearch);

export default router;
