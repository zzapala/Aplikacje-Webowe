import { useState } from "react";

interface DodawanieProps {
  onDodajStudenta: (student:
    {imie: string; nazwisko: string; rocznik: number})
    => void;
}

function Dodawanie({ onDodajStudenta }: DodawanieProps) {
  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const [rocznik, setRocznik] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imie && nazwisko && rocznik) {
      onDodajStudenta({ imie, nazwisko, rocznik: parseInt(rocznik) });
      setImie("");
      setNazwisko("");
      setRocznik("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Imię"
        value={imie}
        onChange={(e) => setImie(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <input
        type="text"
        placeholder="Nazwisko"
        value={nazwisko}
        onChange={(e) => setNazwisko(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <input
        type="number"
        placeholder="Rocznik"
        value={rocznik}
        onChange={(e) => setRocznik(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <button type="submit" style={{ padding: "5px 10px" }}>
        Dodaj studenta
      </button>
    </form>
  );
}

export default Dodawanie;