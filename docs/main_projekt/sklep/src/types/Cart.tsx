import type { Book } from '../types/Book';

export interface Cart {
  id: number;
  userId: number;
  bookId: number;
  quantity: number;
  Book: Book; // include Book
}
