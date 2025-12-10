import { useState } from "react";
import Przycisk from "./Przycisk";

type CounterState = {
  count: number;
};

function NowyLicznik() {
  const [state, setState] = useState<CounterState>({ count: 0 });

  const onClick = () => {
    setState({ count: state.count + 1 });
  };

  return (
    <div className="licznik">
      <h3>Licznik: {state.count}</h3>
      <Przycisk onClick={onClick} />
    </div>
  );
}

export default NowyLicznik;