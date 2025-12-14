import { useState, useEffect } from "react";

type CounterState = {
    count: number;
};

function Licznik() {
    const [state, setState] = useState<CounterState> ({ count: 0 });
    const onClick = () => {
        setState({ count: state.count + 1 });
    }
    useEffect(() => {
      console.log(`Licznik został zaktualizowany: ${state.count}`);
    }, [state.count]); 

    useEffect(() => {
      console.log("Hello world!");
    }, []);
    
    return (
      <div className="licznik">
        <h3>Licznik: {state.count}</h3>
        <button onClick={onClick}>Zwiększ</button>
      </div>
    );
}

export default Licznik;