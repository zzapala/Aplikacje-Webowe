import { Router } from 'express'
import { CartController } from '../controllers/cart.controllers'
import { authenticateJWT } from '../middleware/auth.middleware'

const router = Router()
router.post('/', authenticateJWT, CartController.addToCart)
router.delete('/:bookId', authenticateJWT, CartController.removeFromCart)
router.get('/', authenticateJWT, CartController.cartList)

  
export default router
