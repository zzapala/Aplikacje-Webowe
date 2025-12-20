import { useState } from "react";

type CounterState = {
    count: number;
};

function Licznik() {
    const [state, setState] = useState<CounterState>(() => {
      const savedState = localStorage.getItem("counterState");
      return savedState ? JSON.parse(savedState) : { count: 0 };
    });

    const onClick = () => {
      const newState = { count: state.count + 1 };
      setState(newState);
      localStorage.setItem("counterState", JSON.stringify(newState));
    };

    const reset = () => {
      const newState = { count: 0 };
      setState(newState);
      localStorage.setItem("counterState", JSON.stringify(newState));
    };

    return (
      <div className="licznik">
        <h3>Licznik: {state.count}</h3>
        <button onClick={onClick}>Zwiększ</button>
        <button onClick={reset}>Reset</button>
      </div>
    );
}

export default Licznik;