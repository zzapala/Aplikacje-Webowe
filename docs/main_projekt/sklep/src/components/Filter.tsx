// src/components/Filter/Filter.tsx
import "./Filter.css"

interface FilterProps {
  handleFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void
  selectedCategory?: string
  selectedSort?: string
  handleSortChange?: (event:React.ChangeEvent<HTMLSelectElement>) => void
}

function Filter({ handleFilter, selectedCategory, selectedSort, handleSortChange }: FilterProps) {
  return (
    <div className="filter">
    <div className="filter-group">
      <label htmlFor="category" className="filter-label">
        Kategoria:
      </label>
      <select 
        id="category" 
        className="filter-select"
        onChange={handleFilter}
        value={selectedCategory || "All"}
      >
                <option value="All">Wszystkie kategorie</option>
                <option value="Klasyki">Klasyki</option>
                <option value="Gotyckie">Gotyckie</option>
                <option value="Filozoficzne">Filozoficzne</option>
                <option value="Psychologiczne">Psychologiczne</option>
                <option value="Współczesne">Współczesne</option>
                <option value="Fantastyka">Fantastyka</option>
                <option value="Akademickie">Akademickie</option>
                <option value="Historyczne">Historyczne</option>
                <option value="Przygodowe">Przygodowe</option>
                <option value="Polityczne">Polityczne</option>
      </select>
    </div>


    {handleSortChange && (
        <div className="filter-group">
            <label htmlFor="sort" className="filter-label">
                Sortuj według:
            </label>
            <select
                id = "sort"
                className="filter-select"
                onChange={handleSortChange}
                value={selectedSort || "default"}
            >
                <option value = "default">Domyślnie</option>
                <option value = "price-asc">Cena: rosnąco</option>
                <option value = "price-desc">Cena: malejąco</option>
                <option value = "title-asc">Tytuł: A–Z</option>
                <option value = "title-desc">Tytuł: Z–A</option>
                <option value = "author-asc">Autor: A–Z</option>
                
            </select>
        </div>
    )}

    </div>
    
  )
}

export default Filter