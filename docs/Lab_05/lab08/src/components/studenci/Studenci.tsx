interface StudenciProps {
    imie: string;
    nazwisko: string;
    wiek: number;
    kierunek: string;
}

function Studenci() {
    const Students: StudenciProps[] = [
        { imie: "Jan", nazwisko: "Kowalski", wiek: 21, kierunek: "Informatyka" },
        { imie: "Anna", nazwisko: "Nowak", wiek: 22, kierunek: "Matematyka" },
        { imie: "Piotr", nazwisko: "Wiśniewski", wiek: 20, kierunek: "Fizyka" },
    ];

    return (
        <div>
            <h2>Lista studentów:</h2>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid white", padding: "8px" }}>Imię i nazwisko</th>
                        <th style={{ border: "1px solid white", padding: "8px" }}>Wiek</th>
                        <th style={{ border: "1px solid white", padding: "8px" }}>Kierunek</th>
                    </tr>
                </thead>
                <tbody>
                    {Students.map((student, index) => (
                        <tr key={index}>
                            <td style={{ border: "1px solid white", padding: "8px" }}>
                                {student.imie} {student.nazwisko}
                            </td>
                            <td style={{ border: "1px solid white", padding: "8px" }}>{student.wiek}</td>
                            <td style={{ border: "1px solid white", padding: "8px" }}>{student.kierunek}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Studenci;