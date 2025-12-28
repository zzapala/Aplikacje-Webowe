// src/components/FilterColumn/FilterColumn.tsx
import type { SortOption } from "../pages/Produkty"
import Filter from "./Filter"
import "./FilterColumn.css"

interface FilterColumnProps {
  handleFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void
  selectedCategory: string
  selectedSort: SortOption
  handleSortChange: (sort: SortOption) => void
  clearFilters: () => void 
}

function FilterColumn({ 
  handleFilter, 
  selectedCategory, 
  selectedSort, 
  handleSortChange,
  clearFilters
}: FilterColumnProps) {
  
  const handleSortSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleSortChange(event.target.value as SortOption)
  }

  return (
    <div className="filter-column">
      <h2 className="filter-column__title">Filtry i sortowanie</h2>
      
      <div className="filter-column__section">
        <Filter 
          handleFilter={handleFilter} 
          selectedCategory={selectedCategory}
          selectedSort={selectedSort}
          handleSortChange={handleSortSelectChange}
        />
      </div>
      
      <div className="filter-column__section">
        <h3 className="filter-column__subtitle">Cena</h3>
        <div className="price-filter">
          <input 
            type="range" 
            min="0" 
            max="200" 
            className="price-slider"
            disabled
            title="Filtr cenowy wkrótce!"
          />
          <div className="price-labels">
            <span>0 zł</span>
            <span>100+ zł</span>
          </div>
        </div>
      </div>
      
      <div className="filter-column__section">
        <h3 className="filter-column__subtitle">Inne filtry</h3>
        <p className="coming-soon">Wkrótce więcej opcji filtrów!</p>
      </div>

      <button 
        className="filter-reset"
        onClick={clearFilters}
      >
        Wyczyść wszystkie filtry
      </button>
    </div>
  )
}

export default FilterColumn