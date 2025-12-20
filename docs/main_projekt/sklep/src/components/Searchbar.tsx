import "./Searchbar.css";

function Searchbar() {
  return (
    <div className="searchbar">
      <input type="text" placeholder="Szukaj książek..." className="search-input" />
      <button className="search-button">Szukaj</button>
    </div>
  );
}

export default Searchbar;