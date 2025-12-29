import type { Book } from '../types/Book';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Book.css';
import type { Favourite } from '../types/Favourite';

function BookComponent(param: { book: Book }) {
  const { book } = param;
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const [isFavourite, setIsFavourite] = useState(false);

  // sprawdzenie, czy książka jest w ulubionych przy renderze
  useEffect(() => {
    const checkFavourite = async () => {
      if (!isLoggedIn) return;
      const token = localStorage.getItem('token');
      if (!token) return;
  
      try {
        const res = await fetch('http://localhost:3000/api/favourites', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          console.error('Nie udało się pobrać ulubionych');
          return;
        }
  
        const data: Favourite[] = await res.json();
        setIsFavourite(data.some((f: Favourite) => f.Book.id === book.id));
      } catch (err) {
        console.error(err);
      }
    };
  
    checkFavourite();
  }, [book.id, isLoggedIn]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    try {
      const response = await fetch('/api/cart/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ bookId: book.id, quantity: 1 }),
      });
      if (!response.ok) throw new Error('Błąd podczas dodawania do koszyka');
      alert('Dodano do koszyka!');
    } catch (error) {
      alert('Coś poszło nie tak...');
      console.error(error);
    }
  };

  const handleToggleFavourite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      if (isFavourite) {
        const res = await fetch(`http://localhost:3000/api/favourites/${book.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Nie udało się usunąć z ulubionych');
        setIsFavourite(false);
      } else {
        const res = await fetch('http://localhost:3000/api/favourites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookId: book.id }),
        });
        if (!res.ok) throw new Error('Nie udało się dodać do ulubionych');
        setIsFavourite(true);
      }
    } catch (err) {
      console.error(err);
      alert('Coś poszło nie tak...');
    }
  };

  return (
    <div className="book-card">
      <Link to={`/products/${book.id}`}>
        <img src={book.cover} alt={`Okładka książki ${book.title}`} />
        <div className="book-title">{book.title}</div>
      </Link>
      <div className="book-author">{book.author}</div>
      <div className="book-price">{book.price.toFixed(2)} zł</div>
      <div id="book-cart" className="book-link">
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Dodaj do koszyka
        </button>
      </div>
      <div id="book-details" className="book-link">
        <button onClick={handleToggleFavourite} className="add-to-fav-button">
          <img
            src='/heart.png'
            className="book-card__like"
          />
          {isFavourite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        </button>
      </div>
    </div>
  );
}

export { BookComponent as Book };
export default BookComponent;
