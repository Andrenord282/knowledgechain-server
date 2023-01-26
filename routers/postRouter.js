import { Router } from 'express';
import postsController from '../controllers/postsController.js';
const router = new Router();

router.get('/posts', postsController.getPosts);
router.get('/posts/:id');
router.post('/posts', postsController.createPost);


export default router;
