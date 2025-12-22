// src/components/Filter/Filter.tsx
import "./Filter.css"

interface FilterProps {
  handleFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void
  selectedCategory?: string
}

function Filter({ handleFilter, selectedCategory }: FilterProps) {
  return (
    <div className="filter">
      <label htmlFor="category" className="filter__label">
        Kategoria:
      </label>
      <select 
        id="category" 
        className="filter__select"
        onChange={handleFilter}
        value={selectedCategory || "All"}
      >
                <option value="All">Wszystkie kategorie</option>
                <option value="Classic">Klasyki</option>
                <option value="Gothic">Gotyckie</option>
                <option value="Philosophy">Filozoficzne</option>
                <option value="Psychological">Psychologiczne</option>
                <option value="Modern">Współczesne</option>
                <option value="Fantasy">Fantastyka</option>
                <option value="Academic">Akademickie</option>
                <option value="Historical">Historyczne</option>
                <option value="Adventure">Przygodowe</option>
                <option value="Political">Polityczne</option>
      </select>
    </div>
  )
}

export default Filter