// src/pages/Produkty.tsx
import Books from "../components/Books"
import "./Produkty.css"
import {useEffect, useState } from "react"
import FilterColumn from "../components/FilterColumn"
import { useLocation, useNavigate } from "react-router-dom"

export type SortOption = "default" | "price-asc" | "price-desc" | "title-asc" | "title-desc" | "author-asc"

function Products() {
  const location = useLocation()
  const navigate = useNavigate()

  const params = new URLSearchParams(location.search)
  const searchQuery = params.get("search") || ""

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSort, setSelectedSort] = useState<SortOption>("default")

  useEffect(() => {
    if (searchQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCategory("All")
    }
  }, [searchQuery])
  
  function handleFilter(event: React.ChangeEvent<HTMLSelectElement>) {
    const newCategory = event.target.value
    setSelectedCategory(newCategory)
  }

  function handleSortChange(sort: SortOption) {
    setSelectedSort(sort)
  }

  function clearSearch() {
    navigate("/products")
    setSelectedCategory("All")
    setSelectedSort("default")
  }
  
  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="products-page__title">
          {searchQuery ? (
            <>
              Wyniki wyszukiwania: "
              <span className="search-highlight">{searchQuery}</span>"
            </>
          ) : (
            "Książki"
          )}
        </h1>
        
        {searchQuery && (
          <div className="search-info">
            <p className="search-info__text">
              Znaleziono książki pasujące do Twojego zapytania.
              <button 
                onClick={clearSearch}
                className="search-button__page"
                title="Pokaż wszystkie książki"
              >
                Pokaż wszystkie książki
              </button>
            </p>
          </div>
        )}
      </div>
      
      <div className="products-page__layout">
        <main className="products-page__content">
          <Books 
            selectedCategory={selectedCategory}
            selectedSort={selectedSort}
            searchQuery={searchQuery}
          />
        </main>

        <aside className="products-page__sidebar">
          <FilterColumn 
            handleFilter={handleFilter} 
            selectedCategory={selectedCategory}
            selectedSort={selectedSort}
            handleSortChange={handleSortChange}
            clearFilters={clearSearch}
          />
        </aside>
      </div>
    </div>
  )
}

export default Products