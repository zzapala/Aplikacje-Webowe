import { Router } from 'express';
import { createOrder } from '../controllers/orders.controller';
import { getOrders } from '../controllers/orders.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticateJWT, createOrder);
router.get('/', authenticateJWT, createOrder);

export default router;
