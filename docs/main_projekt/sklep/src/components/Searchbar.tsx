import { useNavigate } from "react-router-dom"
import "./Searchbar.css"
import { useState } from "react"

function Searchbar() {
  const [value, setValue] = useState("")
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (value.trim()) {
      navigate(`/products?search=${encodeURIComponent(value.trim())}`)
      setValue("")
    }
  }

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Szukaj książki lub autora..."
            className="search-input"
          />
          <button
            type="submit"
            className="search-button"
            disabled={!value.trim()}
          >
            Szukaj
          </button>
        </div>
      </form>
    </div>
  )
}

export default Searchbar
