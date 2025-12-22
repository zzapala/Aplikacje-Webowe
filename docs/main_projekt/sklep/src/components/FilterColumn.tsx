// src/components/FilterColumn/FilterColumn.tsx
import Filter from "./Filter"
import "./FilterColumn.css"

interface FilterColumnProps {
  handleFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void
  // Możesz dodać więcej propsów jeśli potrzebujesz
  selectedCategory?: string
}

function FilterColumn({ handleFilter, selectedCategory }: FilterColumnProps) {
  return (
    <div className="filter-column">
      <h2 className="filter-column__title">Filtruj książki</h2>
      <div className="filter-column__section">
        <Filter handleFilter={handleFilter} selectedCategory={selectedCategory} />
      </div>
      
      {/* Możesz dodać więcej filtrów w przyszłości */}
      <div className="filter-column__section">
        <h3>Cena</h3>
        {/* Tu będzie filtr cenowy */}
      </div>
      
      <div className="filter-column__section">
        <h3>Autor</h3>
        {/* Tu będzie filtr autorów */}
      </div>
    </div>
  )
}

export default FilterColumn