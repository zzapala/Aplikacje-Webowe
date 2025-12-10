interface ProduktProps {
    nazwa: string;
}

function Produkt(props: ProduktProps) {
    return (
        <div>
            <h3>Produkt: {props.nazwa}</h3>
        </div>
    );
}

export default Produkt;
    