import express from 'express';
import { createLike ,getLikes,deleteLike} from '../controllers/likeController';

const router = express.Router();

router.post('/:id/likes', createLike);
router.get('/:id/likes', getLikes);
router.delete('/:id/likes', deleteLike);

export default router;