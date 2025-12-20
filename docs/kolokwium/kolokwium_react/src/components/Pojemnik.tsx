import "./Pojemnik.css";
export interface PojemnikProps {
    aktualnyPoziomWody: number;
    maksymalnyPoziomWody: number;
    nazwa: string;
    identyfikator: string;
}

function Pojemnik(props: PojemnikProps) {

    return (
        <div>
            {Array.from({length: props.maksymalnyPoziomWody}).map((_, index) => {
                if (9-index >= props.aktualnyPoziomWody) {
                    return <div key={index} className="pustyPoziom">-</div>

                } else {
                    return <div key={index} className="napelnionyPoziom">💧</div>

                }
            }
            )}
            
        </div>

    )
};

export default Pojemnik;