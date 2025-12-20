
import "./Header.css"; // Stylizacja nagłówka
import Navlist from "../components/Navlist";
import Searchbar from "../components/Searchbar";
import IconButton from "../components/IconButton";


function Header() {

    return (
        <>
      <header className="header">
        <img src="/logo6.png" alt="On Books" className="logo" />
        <Searchbar />
        <div className="header-icons">
            <IconButton src="/heart.png" alt="Zapisane" />
            <IconButton src="/koszyk.png" alt="Mój koszyk" />
            <IconButton src="/user.png" alt="Moje konto" />
        </div>
      </header>

      <Navlist />
    </>
    );
}

export default Header;