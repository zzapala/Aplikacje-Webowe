import Book from "../models/Book";
import books from "../data/books.json";


export const seedBooks = async () => {
  for (const book of books) {
    // Sprawdź po ISBN, czy książka już istnieje
    const exists = await Book.findOne({ where: { isbn: book.isbn } });
    if (exists) {
       // await exists.update(book);
      } else {
        await Book.create(book);   
    }
    };
    console.log("✅ Seed zakończony");
}