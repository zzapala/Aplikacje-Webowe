import { Request, Response } from 'express';
import { Cart, Book } from '../models'; 

export class CartController {

  static async addToCart(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
      
      const userId = req.user.id;
      const { bookId, quantity } = req.body;

      if (!bookId) return res.status(400).json({ message: "bookId is required" });

      const targetQty = quantity && quantity > 0 ? quantity : 1;

      let item = await Cart.findOne({ where: { userId, bookId } });

      if (item) {
        item.quantity = targetQty;
        await item.save();
      } else {
        item = await Cart.create({ userId, bookId, quantity: targetQty });
      }

      return res.status(200).json(item);
    } catch (err: any) {
      console.error("BŁĄD ADD_TO_CART:", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  
  static async removeFromCart(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const userId = req.user.id;
      const { bookId } = req.params;

      const deleted = await Cart.destroy({
        where: { userId, bookId }
      });

      if (deleted) {
        return res.status(200).json({ message: 'Removed from cart' });
      } else {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
    } catch (err: any) {
      console.error("BŁĄD REMOVE_FROM_CART:", err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async cartList(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const cartItems = await Cart.findAll({
        where: { userId: req.user.id },
        include: [{ model: Book }],
      });

      return res.status(200).json(cartItems);
    } catch (err: any) {
      console.error("BŁĄD CART_LIST:", err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
}