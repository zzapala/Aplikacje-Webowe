import './Koszyk.css';
import Produkt from './Produkt';

function Koszyk() {
  return (
    <div className="koszyk">
      <h3>Zawartość koszyka:</h3>
      <ul>
        <Produkt nazwa="Jabłko Golden" />
        <Produkt nazwa="Gruszka Konferencja" />
        <Produkt nazwa="Banan" />
        <Produkt nazwa="Winogrono" />
        <Produkt nazwa="Pomarańcza" />
      </ul>
    </div>
  );
}

export default Koszyk;