import {Router} from "express"

import {
    getCart,
    addToCart,
    removeFromCart,
    updateQuantity
} from "../controllers/cart.controller"

const router = Router()

// W cart.routes.ts dodaj:
router.get("/test", (req, res) => {
    res.json({ message: "Cart route works!" })
  })

router.get("/", getCart)
router.post("/items", addToCart)
router.delete("/items/:bookId", removeFromCart)
router.patch("/items/:bookId", updateQuantity)

export default router