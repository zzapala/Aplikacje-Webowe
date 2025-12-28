import { useEffect, useState, useMemo } from "react"
import { Book } from "./Book"
import type { Book as BookType } from "../types/Book"
import "./Books.css"
import type { SortOption } from "../pages/Produkty"


interface BooksProps {
  selectedCategory: string
  selectedSort: SortOption
  searchQuery: string;
}


export function Books({selectedCategory, selectedSort, searchQuery = ""}: BooksProps) {
  const [books, setBooks] = useState<BookType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // pobieram dane
  useEffect(() => {
    fetch("http://localhost:3000/api/books")
      .then(res => {
        if (!res.ok) throw new Error("Błąd ładowania danych")
        return res.json()
      })
      .then(data => {
        setBooks(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  
  const booksToDisplay = useMemo(() => {
    let filteredBooks = books.filter(book => {
      if (selectedCategory === "All") return true
      return book.category === selectedCategory
    })

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.description?.toLowerCase().includes(query) ||
        book.category?.toLowerCase().includes(query)
      )
    }

    switch (selectedSort) {
      case "price-asc":
        return [...filteredBooks].sort((a, b) => a.price - b.price)
      case "price-desc":
        return [...filteredBooks].sort((a, b) => b.price - a.price)
      case "title-asc":
        return [...filteredBooks].sort((a, b) => 
          a.title.localeCompare(b.title, 'pl')
        )
      case "title-desc":
        return [...filteredBooks].sort((a, b) => 
          b.title.localeCompare(a.title, 'pl')
        )
      case "author-asc":
        return [...filteredBooks].sort((a, b) => 
          a.author.localeCompare(b.author, 'pl')
        )
      default:
        return filteredBooks // Domyślna kolejność
    }
  }, [books, selectedCategory, selectedSort, searchQuery])


  


  if (loading) return <p className="loading">Ładowanie książek…</p>
  if (error) return <p className="error">Błąd: {error}</p>
  if (booksToDisplay.length === 0) {
    return <p className="no-results">Brak książek w wybranej kategorii</p>
  }

  
  return (
    <div className="books-container">
      <div className="books-info">
        <h2 className="books-info__title">
          {selectedCategory === "All" ? "Wszystkie książki" : selectedCategory}
          <span className="books-info__count"> ({booksToDisplay.length})</span>
        </h2>
        

      </div>

      <div className="books-list">
        {booksToDisplay.map(book => (
          <div key={book.id} className="book-wrapper">
            <Book book={book} />
          </div>
        ))}
      </div>

      {booksToDisplay.length === 0 && !loading && (
        <div className="no-results">
          <p>Nie znaleziono książek w tej kategorii.</p>
          <p>Spróbuj zmienić filtr kategorii.</p>
        </div>
      )}
    </div>
  )
}


export default Books
