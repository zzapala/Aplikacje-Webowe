// src/pages/Produkty.tsx
import Books from "../components/Books"
import "./Produkty.css"
import { useState } from "react"
import FilterColumn from "../components/FilterColumn"

export type SortOption =   | "default" 
| "price-asc" 
| "price-desc" 
| "title-asc" 
| "title-desc" 
| "author-asc"

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSort, setSelectedSort] = useState<SortOption>("default")


  function handleFilter(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(event.target.value)
}

function handleSortChange(sort: SortOption) {
  setSelectedSort(sort)
}


  return (
    <div className="products-page">
      <h1 className="products-page__title">Produkty</h1>
      
      <div className="products-page__layout">
        
        <main className="products-page__content">
          <Books selectedCategory={selectedCategory} selectedSort={selectedSort} />
        </main>

        <aside className="products-page__sidebar">
          <FilterColumn 
            handleFilter={handleFilter} 
            selectedCategory={selectedCategory} 
            selectedSort = {selectedSort}
            handleSortChange={handleSortChange}
          />
        </aside>
      </div>
    </div>
  )
}

export default Products