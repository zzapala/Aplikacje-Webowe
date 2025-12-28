import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Book } from "../types/Book";
import './PodstronaProduktu.css'

const BookDetailsPage = () => {
  const { id } = useParams(); // pobiera wartość z URL
  const [book, setBook] = useState<Book |null >(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => console.log(err));
  }, [id]);

  if (!book) return <div>Ładowanie...</div>;

  return (
    <div className="book-details__container">
        <div className="book-details__subpage">
            <img className="book-details__img" src={book.cover} alt={book.title} />
            <div className = "book-details__text-container">
                <div className="book-detail__book-info">
                  <div className="book-detail__book-title">{book.title}</div>
                  <div className="book-detail__book-author">{book.author}</div>
                </div>
                <div className="book-detail__book-price">{book.price.toFixed(2)} zł</div>
                <button id="add-cart" className="book-details__button">Dodaj do koszyka</button>
                <button id="add-fav" className="book-details__button">Dodaj do ulubionych</button>
             </div>
        </div>
        <div className = "book-details__long-paragraph">
            <p>{book.description}</p>
        </div>
        <div className="book-details__long-paragraph">
            <h2>Opinie</h2>
        </div>
    </div>
  );
};

export default BookDetailsPage;
