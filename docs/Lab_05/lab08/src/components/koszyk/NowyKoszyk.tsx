import './Koszyk.css';
import Produkt from './Produkt';

function NowyKoszyk() {
  const names: string[] = ['Jabłko', 'Gruszka Konferencja', 'Banan', 'Winogrono', 'Pomarańcza'];
  return (
    <div className="koszyk">
      <h3>Zawartość koszyka:</h3>
      <ul>
        {names.map((name, index) => (
          <Produkt key={index} nazwa={name} />
        ))}
      </ul>
    </div>
  );
}

export default NowyKoszyk;