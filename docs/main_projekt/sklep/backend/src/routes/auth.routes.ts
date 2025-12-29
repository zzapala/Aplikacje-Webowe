import { Router } from 'express'
import { register, login } from '../controllers/auth.controller'
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get("/me", authenticateJWT, (req, res) => {
    res.json(req.user);
  });

export default router