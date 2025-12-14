import React from 'react';

function Aktualizacja() {
    const [produkt, setProdukt] = React.useState({ nazwa: "Pomidorek", cena: 10});

    const handleIncreasePrice = () => {
        setProdukt((prevProdukt) => ({
            ...prevProdukt,
            cena: 100,
        }));
    };
    

    return (
        <>
        <div>
            <h2>Cena za {produkt.nazwa} wynosi {produkt.cena}</h2>
            <button onClick={handleIncreasePrice}>Zastosuj rabat</button>
        </div>
        </>
    )
}

export default Aktualizacja;