import React, { useEffect, useState } from 'react';
import type { Book } from '../types/Book';
import { getFavourites } from '../utils/favourites';
import { Book as BookComponent } from '../components/Book';

const FavouritesPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    const fetchFavourites = async () => {
      const favBooks = await getFavourites(token);
      setBooks(favBooks);
    };

    fetchFavourites();
  }, [token]);

  if (!token) {
    return <p>Musisz się zalogować, żeby zobaczyć ulubione książki</p>;
  }

  if (books.length === 0) {
    return <p>Nie masz jeszcze ulubionych książek.</p>;
  }

  return (
    <div className="favourites-page">
      <h2>Moje ulubione książki</h2>
      <div className="books-list">
        {books.map((book) => (
          <BookComponent key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default FavouritesPage;
