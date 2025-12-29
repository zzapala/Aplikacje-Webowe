import type { Book } from '../types/Book';

export interface Favourite {
  id: number;
  userId: number;
  bookId: number;
  Book: Book; // include Book
}
