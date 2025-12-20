import Pojemnik from './components/Pojemnik'
import Formularz from './components/Formularz'
import './App.css'
import {useState} from 'react';
interface PojemnikProps {
  identyfikator: string;
  nazwa: string;
  aktualnyPoziomWody: number;
  maksymalnyPoziomWody: number;
}


function App() {
  const MAX_POZIOM = 10
  const [pojemniki, setPojemniki] = useState<PojemnikProps[]>(
    [   { identyfikator: 'pojemnik_1', nazwa: 'Domyślny kubek', aktualnyPoziomWody: 0, maksymalnyPoziomWody: MAX_POZIOM },
      { identyfikator: 'pojemnik_2', nazwa: 'Drugi kubek', aktualnyPoziomWody: 3,   maksymalnyPoziomWody: MAX_POZIOM }]);

  const dodajPojemnik = (nowyPojemnik: PojemnikProps) => {
    setPojemniki((prevPojemniki) => [...prevPojemniki, nowyPojemnik]);
};

  return (
    <>
     <Formularz onDodajPojemnik={dodajPojemnik}/>
     <Losuj onDodajPojemnik={dodajPojemnik}/>
      <div className="pojemnikiApp">
        {pojemniki.map((pojemnik) => (
          <div key={pojemnik.identyfikator} className="pojemnik">
            <p>{pojemnik.nazwa}</p>
            <Pojemnik
              identyfikator={pojemnik.identyfikator}
              nazwa={pojemnik.nazwa}
              aktualnyPoziomWody={pojemnik.aktualnyPoziomWody}
              maksymalnyPoziomWody={MAX_POZIOM}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default App
