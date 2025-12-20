import { useEffect, useState } from "react";
import type { PojemnikProps } from './Pojemnik';

function Losuj() {
    const [result, setResult] = useState<PojemnikProps[]>([]);
  
    useEffect(() => {
      const api = async () => {
        const data = await fetch("https://dummyjson.com/recipes", {
          method: "GET"
        });
        const jsonData = await data.json();
        setResult(jsonData.recipes);
      };
  
      api();
    }, []);

    return (


    )
}

export default Losuj;