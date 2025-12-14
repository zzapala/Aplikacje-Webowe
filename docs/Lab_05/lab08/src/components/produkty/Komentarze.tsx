import { Komentarz } from './Komentarz';
import type { KomentarzProps } from './Komentarz';
import { useEffect, useState } from 'react';

export default function Komentarze() {
    const [result, setResult] = useState<KomentarzProps[]>([]);
  
    useEffect(() => {
      const api = async () => {
        const data = await fetch("https://dummyjson.com/comments", {
          method: "GET"
        });
        const jsonData = await data.json();
        setResult(jsonData.comments);
      };
  
      api();
    }, []);
  
    return (
        <div className="komentarze">
        <h1>Komentarze:</h1>
        {result.map((komentarz) => (
          <Komentarz key={komentarz.id} komentarz={komentarz} />
        ))}
      </div>
    );
  }
  