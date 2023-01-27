import { Router } from 'express';
import userActivityPostsController from '../controllers/userActivityPostsController.js';
const router = new Router();

router.get('/user-activity-posts', userActivityPostsController.userActivityPosts);
router.post('/mark-post', userActivityPostsController.markPost);
router.post('/rating-post', userActivityPostsController.ratingPost);

export default router;
