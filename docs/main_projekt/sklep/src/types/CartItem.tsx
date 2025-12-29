import type { Book } from './Book';

export interface CartItem {
  id: number;         // id rekordu w tabeli Cart
  quantity: number;   // ilość w koszyku
  book: Book;         // książka
}
