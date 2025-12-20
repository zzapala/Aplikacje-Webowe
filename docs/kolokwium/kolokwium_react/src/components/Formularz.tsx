import {useState} from "react";
interface FormularzProps {
    onDodajPojemnik: (pojemnik:
        { identyfikator: string;
          nazwa: string;
          aktualnyPoziomWody: number;
          maksymalnyPoziomWody: number; })
        => void;
}

function Formularz(props: FormularzProps) {
    const [poczatkowyStan, setPoczatkowyStan] = useState(0);
    const [nazwa, setNazwa] = useState("");

    
    const handleWiecejWody = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPoczatkowyStan((prevStan) => Math.min(prevStan + 1, 10));
    };

    const handleMniejWody = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPoczatkowyStan((prevStan) => Math.max(prevStan - 1, 0));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const identyfikator = `pojemnik_${Date.now()}`;
        const nowyPojemnik = {
            identyfikator,
            nazwa,
            aktualnyPoziomWody: 10-poczatkowyStan,
            maksymalnyPoziomWody: 10
        };
        props.onDodajPojemnik(nowyPojemnik);
        setNazwa("");
        setPoczatkowyStan(0);
    }


    return (
      <form onSubmit={handleSubmit} >
        <label>Nazwa pojemnika:
        <input
            type="text"
            placeholder="nazwa kubka"
            value = {nazwa}
            onChange={(e) => setNazwa(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
        />
        </label>
        <br/>
        <label>Początkowy stan:
            <p>{poczatkowyStan}</p>
            <button className="przycisk" onClick={handleWiecejWody}>
                +
            </button>
            <button className = "przycisk" onClick={handleMniejWody}>
                -
            </button>

            <button type="submit" style={{ padding: "5px 10px" }}>
                Dodaj pojemnik
            </button>

        </label>
      </form>
    )
  }

export default Formularz;