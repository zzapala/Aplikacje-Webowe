import { useState } from "react";

function Logowanie() {
    const [haslo, setHaslo] = useState("");
    const [powtorzHaslo, setPowtorzHaslo] = useState("");
    const [login, setLogin] = useState("");
    const [komunikat, setKomunikat] = useState("");

    const handleHasloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHaslo(event.target.value);
    };

    const handlePowtorzHasloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPowtorzHaslo(event.target.value);
    };

    const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }

    

    const czyZgodne = haslo && powtorzHaslo && haslo === powtorzHaslo;

    const czyPuste = !haslo || !powtorzHaslo || !login;

    const handleSubmit = () => {
        if (czyPuste) {
            setKomunikat("Proszę wprowadzić wszystkie dane.");
        } else if (czyZgodne) {
            setKomunikat("Hasła są zgodne!");
        } else {
            setKomunikat("Hasła nie są zgodne.");
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h3>Podaj dane logowania:</h3>
            <input
                type="text"
                value={login}
                onChange={handleLoginChange}
                placeholder="Wpisz login"
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
            <button style={{ marginTop: "20px", fontSize: "18px" }} disabled={czyPuste} onClick={handleSubmit}>
                Zaloguj się!
            </button>
            
            {komunikat && (
                <p style={{ marginTop: "20px", fontSize: "18px" }}>
                    {komunikat}
                </p>
            )}
        </div> 
    )

}

export default Logowanie;