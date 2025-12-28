import type { Book } from '../types/Book';

import { Link, useNavigate} from 'react-router-dom';
import './Book.css';

function BookComponent(param: {book: Book}) {
  const { book } = param;
  const isLoggedIn = !!localStorage.getItem("token")
  const navigate = useNavigate()

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      // Jeśli brak tokenu, przenieś do logowania
      navigate("/login")
      return
    }
    try {
      const response = await fetch("/api/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // token JWT
        },
        body: JSON.stringify({ bookId: book.id, quantity: 1 }),
      })

      if (!response.ok) {
        throw new Error("Błąd podczas dodawania do koszyka")
      }

      alert("Dodano do koszyka!")
    } catch (error) {
      alert("Coś poszło nie tak...")
      console.error(error)
    }
  }

  return (
    <Link to ={`/products/${book.id}`} className="book-card">
      <img src={book.cover} alt={`Okładka książki ${book.title}`} />
      <div className="book-title">{book.title}</div>
      <div className="book-author">{book.author}</div>
      <div className="book-price">{book.price.toFixed(2)} zł</div>
      <div id="book-cart" className="book-link">
        <button onClick={handleAddToCart} className='add-to-cart-button'>Dodaj do koszyka</button>
      </div>
      <div id="book-details" className="book-link">
        <button onClick={handleAddToCart} className='add-to-fav-button'><img src="/heart.png" className="book-card__like"></img>Dodaj do ulubionych</button>
      </div>
    </Link>
  );
}

export { BookComponent as Book }; // Eksportuj jako Book
export default BookComponent;