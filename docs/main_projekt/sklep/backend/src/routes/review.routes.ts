import { Router } from 'express';

import { createOpinion, getMyOpinions, getOpinionsByBook, deleteOpinion } from '../controllers/review.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticateJWT, createOpinion);
router.get('/me', authenticateJWT, getMyOpinions);
router.get('/book/:bookId', getOpinionsByBook);
router.delete('/:id', authenticateJWT, deleteOpinion)


export default router;
