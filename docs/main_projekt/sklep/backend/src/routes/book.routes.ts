import {Router} from 'express'
import { getAllBooks, getBookById } from '../controllers/book.controller'

const router = Router();

router.get("/", getAllBooks) // nazwa funckji nie musi odpowiadać ściezce URL
router.get("/:id", getBookById)

export default router;