import type { CartItem } from '../types/CartItem'; // nowy typ
import type { Cart } from '../types/Cart';

export const getCart = async (token: string): Promise<CartItem[]> => {
  try {
    const res = await fetch('http://localhost:3000/api/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Nie udało się pobrać koszyka');
    }

    const data: Cart[] = await res.json();

    // zwracamy zarówno book, jak i quantity
    return data.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      book: item.Book
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
};
