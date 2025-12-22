// src/pages/Produkty.tsx
import Books from "../components/Books"
import "./Produkty.css"
import { useState } from "react"
import FilterColumn from "../components/FilterColumn"

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  function handleFilter(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(event.target.value)
    console.log("Wybrana kategoria:", event.target.value)
  }

  return (
    <div className="products-page">
      <h1 className="products-page__title">Produkty</h1>
      
      <div className="products-page__layout">
        
        <main className="products-page__content">
          <Books selectedCategory={selectedCategory} />
        </main>

        <aside className="products-page__sidebar">
          <FilterColumn 
            handleFilter={handleFilter} 
            selectedCategory={selectedCategory} 
          />
        </aside>
      </div>
    </div>
  )
}

export default Products