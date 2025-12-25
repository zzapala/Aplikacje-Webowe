import type { Book } from '../types/Book';

import { Link } from 'react-router-dom';
import './Book.css';

function BookComponent(param: {book: Book}) {
  const { book } = param;
  return (
    <div className="book-card">
      <img src={book.cover} alt={`Okładka książki ${book.title}`} />
      <div className="book-title">{book.title}</div>
      <div className="book-author">{book.author}</div>
      <div className="book-price">{book.price.toFixed(2)} zł</div>
      <div id="book-cart" className="book-link">
      <Link to={`/cart/add/${book.id}`} className="add-to-cart-button">Dodaj do koszyka</Link>
        </div>
        <div id="book-details" className="book-link">

        <Link to={`/book/${book.id}`}>Zobacz szczegóły</Link>
        </div>
    </div>
  );
}

export { BookComponent as Book }; // Eksportuj jako Book
export default BookComponent;