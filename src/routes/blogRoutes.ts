import express from 'express';
import { isAuthenticated } from '../middlewares/authenticateJWT';
import * as blogController from '../controllers/blogController';
import upload from '../config/multer'


const router = express.Router();
router.post('/',isAuthenticated,upload.single('imageUrl'),blogController.createBlog);
router.get('/',blogController.getBlogs);
router.get('/:id',blogController.getBlogById);
router.patch('/:id',isAuthenticated, blogController.updateBlog);
router.delete('/:id',isAuthenticated, blogController.deleteBlog);

export default router;
