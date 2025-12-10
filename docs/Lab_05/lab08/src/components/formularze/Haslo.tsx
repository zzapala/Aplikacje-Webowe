import { useState } from "react";

function Hasla() {
    const [haslo, setHaslo] = useState("");
    const [powtorzHaslo, setPowtorzHaslo] = useState("");

    const handleHasloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHaslo(event.target.value);
    };

    const handlePowtorzHasloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPowtorzHaslo(event.target.value);
    };

    const czyZgodne = haslo && powtorzHaslo && haslo === powtorzHaslo;

    const czyPuste = !haslo || !powtorzHaslo;

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h3>Ustaw hasło:</h3>
            <input
                type="password"
                value={haslo}
                onChange={handleHasloChange}
                placeholder="Wpisz hasło"
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    width: "100%",
                    maxWidth: "300px",
                    marginBottom: "10px",
                }}
            />
            <br />
            <input
                type="password"
                value={powtorzHaslo}
                onChange={handlePowtorzHasloChange}
                placeholder="Powtórz hasło"
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    width: "100%",
                    maxWidth: "300px",
                }}
            />
            <p style={{ marginTop: "20px", fontSize: "18px" }}>
                {czyPuste
                    ? "Proszę wprowadzić hasło."
                    : czyZgodne
                    ? "Hasła są zgodne!"
                    : "Hasła nie są zgodne."}
            </p>
        </div> 
    )

}

export default Hasla;