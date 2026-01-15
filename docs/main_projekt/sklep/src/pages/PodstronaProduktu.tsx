import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Book } from "../types/Book";
import './PodstronaProduktu.css'
import type { Favourite } from '../types/Favourite';
import { isTokenValid } from "../utils/auth";
import type { Review } from "../types/Review";
import type { User } from "../types/User";
import { fetchMe } from "../utils/auth";


const BookDetailsPage = () => {
  const { id } = useParams(); // pobiera wartość z URL
  const [book, setBook] = useState<Book |null >(null);
  const isLoggedIn = isTokenValid();
  const navigate = useNavigate();

  const [isFavourite, setIsFavourite] = useState(false);

  const [review, setReview] = useState<Review[]>([]);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(5);

  const [user, setUser] = useState<User | null>(null);


  const averageRating = review.length > 0
  ? review.reduce((sum, r) => sum + r.rating, 0) / review.length
  : 0;



  useEffect(() => {
    if (!isLoggedIn) {
      setUser(null);
      return;
    }
  
    fetchMe().then(u => setUser(u));
  }, [isLoggedIn]);

  
  useEffect(() => {
    fetch(`http://localhost:3000/api/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
  const checkFavourite = async () => {
    if (!isLoggedIn) return;
    if (!book) return; // <-- dodajemy tę linię
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
}, [book, isLoggedIn]); // <-- w dependency array dajemy book zamiast book.id


    useEffect(() => {
      if (!id) return;

      fetch(`http://localhost:3000/api/review/book/${id}`)
        .then(res => res.json())
        .then(data => setReview(data))
        .catch(err => console.error(err));
    }, [id]);


  if (!book) return <div>Ładowanie...</div>;

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ bookId: book.id, quantity: 1 }),
      });
      if (!response.ok) throw new Error('Błąd podczas dodawania do koszyka');
    } catch (error) {
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
    }
  };

  const handleAddOpinion = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token || !book) return;
  
    const res = await fetch('http://localhost:3000/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookId: book.id,
        description: description,
        rating: rating,
      }),
    });
  
    if (!res.ok) {
      console.error('Błąd dodawania opinii');
      return;
    }
  
    const newOpinion = await res.json();
    setReview(prev => [newOpinion, ...(prev || [])]);

  
    setDescription('');
    setRating(5);
  };

  const handleDeleteOpinion = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    try {
      const res = await fetch(`http://localhost:3000/api/review/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!res.ok) {
        const text = await res.text();
        console.error('Nie udało się usunąć opinii:', text);
        return;
      }
  
      setReview(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  
  
  

  return (
    <div className="book-details__container">
        <div className="book-details__subpage">
            <img className="book-details__img" src={book.cover} alt={book.title} />
            <div className = "book-details__text-container">
                <div className="book-detail__book-info">
                <div className="average-rating">
                    {averageRating.toFixed(1)} ★ / 5
                  </div>
                  <div className="book-detail__book-title">{book.title}</div>
                  <div className="book-detail__book-author">{book.author}</div>
                </div>
                <div className="book-detail__book-price">{book.price.toFixed(2)} zł</div>
                <button onClick={handleAddToCart} id="add-cart" className="book-details__button">Dodaj do koszyka</button>
                <button onClick={handleToggleFavourite} className="add-to-fav-button">
                    <img
                        src='/heart.png'
                        className="book-card__like"
                    />
                    {isFavourite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                </button>
            </div>
        </div>
        <div className = "book-details__long-paragraph">
            <p>{book.description}</p>
        </div>
        <div className="book-details__long-paragraph">
            <h2>Opinie</h2>
            <form className="add-opinion-form" onSubmit={handleAddOpinion}>
              <textarea
                placeholder="Napisz opinię"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
              <select value={rating} onChange={e => setRating(Number(e.target.value))}>
                {[5,4,3,2,1].map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <button type="submit">Dodaj opinię</button>
            </form>

            <div className="opinions-list">
              {review.length === 0 ? (
                <p>Brak opinii</p>
              ) : (
                review.map(op => (
                  <div key={op.id} className="opinion">
                    


                    <div className="opinion-header">
                      <span className="opinion-author">{op.User?.login || 'Nieznany'}</span>
                      <span className="opinion-rating">{op.rating} ★</span>
                    </div>
                    <div className="opinion-text">{op.description}</div>
                    {user && (user.role === 'admin' || Number(user.id) === op.userId) && (
                      <button
                      onClick={() => handleDeleteOpinion(op.id)}
                      className="opinion-delete-button"
                    >
                      Usuń
                    </button>
                    )}
                  </div>
                ))
              )}
            </div>
        </div>
    </div>
  );
};

export default BookDetailsPage;
