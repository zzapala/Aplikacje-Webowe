import { Link } from "react-router-dom";
import "./NavList.css";



function NavList() {
  return (
    <ul className="nav-list">
      <li>
        <Link to="/">Literatura piękna</Link>
      </li>
      <li>
        <Link to="/cart">Fantasy i Science Fiction</Link>
      </li>
      <li>
        <Link to="/login">Powieści historyczne</Link>
      </li>
    </ul>
  );
}

export default NavList;