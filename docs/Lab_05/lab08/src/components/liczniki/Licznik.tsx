import { useState } from "react";

type CounterState = {
    count: number;
};

function Licznik() {
    const [state, setState] = useState<CounterState> ({ count: 0 });
    const onClick = () => {
        setState({ count: state.count + 1 });
    }
    return (
      <div className="licznik">
        <h3>Licznik: {state.count}</h3>
        <button onClick={onClick}>Zwiększ</button>
      </div>
    );
}

export default Licznik;