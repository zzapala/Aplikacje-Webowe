import { Router } from 'express'
import { FavouriteController } from '../controllers/favourite.controller'
import { authenticateJWT } from '../middleware/auth.middleware'

const router = Router()
router.post('/', authenticateJWT, FavouriteController.add)
router.delete('/:bookId', authenticateJWT, FavouriteController.remove)
router.get('/', authenticateJWT, FavouriteController.list)

  
export default router
