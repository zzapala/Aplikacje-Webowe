import { CartItem } from "../models/CartItem"
import { Book } from "../models/Book"
import { Request, Response } from "express"

// get /cart
export async function getCart(req: Request, res: Response) {
  const userId = req.user!.id

  const items = await CartItem.findAll({
    where: { userId },
    include: [Book],
  })

  res.json(items)
}

// post /cart/items, czyli dodawanie do koszyka
export async function addToCart(req: Request, res: Response) {
    const userId = req.user!.id
    const { bookId, quantity = 1 } = req.body

  if (!bookId) {
    return res.status(400).json({ message: "Missing bookId" })
  }

  const existingItem = await CartItem.findOne({ where: { userId, bookId } })

  if (existingItem) {
    existingItem.quantity += quantity
    await existingItem.save()
    return res.json(existingItem)
  }

  const newItem = await CartItem.create({ userId, bookId, quantity })
  res.status(201).json(newItem)
}

// delete /cart/items/:bookId
export async function removeFromCart(req:Request, res:Response){
    const userId = req.user!.id
    const bookId = Number(req.params.bookId)

    const deleted = await CartItem.destroy({ where: { userId, bookId } })

     if (deleted === 0) {
       return res.status(404).json({ message: "Item not found in cart" })
     }

    res.status(204).send()
}

// patch /cart/items/:bookId
export async function updateQuantity(req:Request, res:Response){
    const userId = req.user!.id
    const bookId = Number(req.params.bookId)
    const { quantity } = req.body

     if (quantity === undefined || quantity < 1) {
       return res.status(400).json({ message: "Invalid quantity" })
     }

    const item = await CartItem.findOne({ where: { userId, bookId } })
     if (!item) {
       return res.status(404).json({ message: "Item not found in cart" })
     }

    item.quantity = quantity
    await item.save()
    res.json(item)
}

