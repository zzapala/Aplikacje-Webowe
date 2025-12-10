import { useState } from 'react';

function FormularzZwierz() {
    const [zwierze, setZwierze] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZwierze(event.target.value);
    };
    
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h3>Podaj swojego ulubionego zwierzaka:</h3>
            <input
                type = 'text'
                value = {zwierze}
                onChange={handleInputChange}
                placeholder = 'Wpisz swojego ulubionego zwierzaka'
                style = {{
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    width: "100%",
                    maxWidth: "300px",
                }}
            />
            <p style = {{ marginTop: "20px", fontSize: "18px" }}>
                Twój ulubiony zwierzak to: <strong>{zwierze || "..."}</strong>!
            </p>
        </div>
    );
}

export default FormularzZwierz;