
import "./Header.css"; // Stylizacja nagłówka
import Navlist from "../components/Navlist";
import Searchbar from "../components/Searchbar";
import IconButton from "../components/IconButton";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";



function Header() {
    const { user, loading } = useAuth();

    if (loading) return null; // albo spinner

    const isLogged = !!user;

    const title = isLogged ? "Moje konto" : "Zaloguj się"

    return (
        <>
      <header className="header">
      <div className="logo-pic">
      <Link to="/products"><img src="/poslowie.png" alt="Posłowie" className="logo" /></Link>
      </div> 
      <Searchbar />

        <div className="header-icons">
            <Link to={isLogged ? "/wishlist" : "/login"}>
              <IconButton src="/heart.png" alt="Zapisane" />
            </Link>
            <Link to={isLogged ? "/cart" : "/login"}>
              <IconButton src="/koszyk.png" alt="Mój koszyk" />
            </Link>
            <Link to={isLogged ? "/account" : "/login"}>
              <IconButton src="/user.png" alt={title} />
            </Link>
        </div>
      </header>

      <Navlist />
    </>
    );
}

export default Header;