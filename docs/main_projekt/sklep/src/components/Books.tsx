
import { useEffect, useState } from "react"
import { Book } from './Book';
import type { Book as BookType } from '../types/Book';
import './Books.css';

export function Books() {
  const [books, setBooks] = useState<BookType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/data/books.json")
      .then(res => res.json())
      .then(data => {
        setBooks(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Ładowanie…</p>

  return (
    <div className="books-container">
      <div className="books-list">
        {books.map(book => (
          <div key={book.id}>
            <Book book={book} />
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Books