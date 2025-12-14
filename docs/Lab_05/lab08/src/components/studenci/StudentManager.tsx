import { useState } from "react";
import Dodawanie from "./Dodawanie";

interface StudenciProps {
    imie: string;
    nazwisko: string;
    rocznik: number;
}

function StudenciManager() {
    const [student, setStudent] = useState<StudenciProps[]>(
        [   { imie: "Jan", nazwisko: "Kowalski", rocznik: 2002 },
            { imie: "Anna", nazwisko: "Nowak", rocznik: 2001 },
            { imie: "Piotr", nazwisko: "Wiśniewski", rocznik: 2003 }]);

    const dodajStudenta = (nowyStudent: StudenciProps) => {
         setStudent((prevStudent) => [...prevStudent, nowyStudent]);
     };

    return (
    <div>
      <h2>Lista studentów:</h2>
      <Dodawanie onDodajStudenta={dodajStudenta} />
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid white", padding: "8px" }}>Imię i nazwisko</th>
            <th style={{ border: "1px solid white", padding: "8px" }}>Rocznik</th>
          </tr>
        </thead>
        <tbody>
          {student.map((student, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid white", padding: "8px" }}>
                {student.imie} {student.nazwisko}
              </td>
              <td style={{ border: "1px solid white", padding: "8px" }}>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
}

export default StudenciManager;