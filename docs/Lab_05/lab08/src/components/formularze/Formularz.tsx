import { useState } from "react";

function Formularz() {
  const [name, setName] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3>Podaj swoje imię:</h3>
      <input
        type="text"
        value={name}
        onChange={handleInputChange}
        placeholder="Wpisz swoje imię"
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
        Witaj, <strong>{name || "..."}</strong>!
      </p>
    </div>
  );
}

export default Formularz;