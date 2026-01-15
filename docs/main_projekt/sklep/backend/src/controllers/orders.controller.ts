import { Request, Response } from 'express';
import { Orders, OrderItem, Cart, Book } from '../models'; 

export const createOrder = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
  
    try {
      const cartItems = await Cart.findAll({ 
        where: { userId },
        include: [{ model: Book }]
      });
  
      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: 'Koszyk jest pusty' });
      }
  
      const order = await Orders.create({ userId, totalPrice: 0 });
  
      let calculatedTotal = 0;
  
      for (const item of cartItems) {
        const book = (item as any).Book || (item as any).book;
  
        if (!book) {
          console.error("Nie znaleziono danych książki dla elementu koszyka:", item.id);
          continue; 
        }
  
        await OrderItem.create({
          orderId: order.id,
          bookId: book.id,
          title: book.title,
          price: book.price,
          quantity: item.quantity,
        });
  
        calculatedTotal += book.price * item.quantity;
      }
  
      order.totalPrice = calculatedTotal;
      await order.save();
  
      await Cart.destroy({ where: { userId } });
  
      return res.status(201).json({ 
        message: 'Zamówienie utworzone', 
        orderId: order.id 
      });
  
    } catch (err: any) {
      console.error("SZCZEGÓŁY BŁĘDU 500:", err);
      return res.status(500).json({ 
        message: 'Błąd serwera', 
        error: err.message 
      });
    }
  };

export const getOrders = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const orders = await Orders.findAll({
      where: { userId },
      include: [OrderItem],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};
