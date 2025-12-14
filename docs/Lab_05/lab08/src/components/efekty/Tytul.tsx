import { useEffect, useState } from "react";

function Tytul() {
  const [title, setTitle] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    document.title = title || "Strona bez tytułu";
  }, [title]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3>Jak nazwiesz tę stronę?</h3>
      <input
        type="text"
        value={title}
        onChange={handleInputChange}
        placeholder="Wpisz tytuł strony"
        style={{
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          width: "100%",
          maxWidth: "300px",
        }}
      />
    </div>
  );
}

export default Tytul;