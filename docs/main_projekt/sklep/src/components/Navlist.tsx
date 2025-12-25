import { Link } from "react-router-dom";
import "./NavList.css";



function NavList() {
  return (
    <ul className="nav-list">
      
      <li>
        <Link to="/products">Książki</Link>
      </li>
      <li>
        <Link to="/new">Nowości</Link>
      </li>
      <li>
        <Link to="/rental">Wypożyczalnia</Link>
      </li>
      <li>
        <Link to="/about">O nas</Link>
      </li>
    </ul>
  );
}

export default NavList;