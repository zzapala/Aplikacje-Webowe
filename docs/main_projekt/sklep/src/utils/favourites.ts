import type { Book } from '../types/Book';
import type { Favourite } from '../types/Favourite'
export const getFavourites = async (token: string): Promise<Book[]> => {
  try {
    const res = await fetch('http://localhost:3000/api/favourites', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Nie udało się pobrać ulubionych');
    }

    const data: Favourite[] = await res.json(); // typujemy tablicę Favourite
    return data.map((f) => f.Book);
  } catch (err) {
    console.error(err);
    return [];
  }
};
