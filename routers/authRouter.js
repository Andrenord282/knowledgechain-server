import { Router } from 'express';
import authController from '../controllers/authController.js';
const router = new Router();

router.post('/registration', authController.registation);
router.post('/login', authController.logIn);
router.get('/logout', authController.logOut);
router.get('/refresh', authController.refresh);


export default router;
