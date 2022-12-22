import { Router } from 'express';
import { createPost, getPosts } from '../controllers/postControllers.js';
const router = new Router();

router.get('/posts', getPosts);

router.get('/post/:id', (req, res) => {
	res.json({
		messenge: 'Проверка успешна',
	});
});

router.post('/post', createPost);

export default router;
