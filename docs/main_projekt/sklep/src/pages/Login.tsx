import { useState } from "react"
import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";

function Logowanie() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    
      try {
        const res = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }), // <-- ważne!
        });
    
        const data = await res.json();
    
        if (!res.ok) {
          setError(data.message);
          return;
        }
    
        login(data.token);
        navigate("/products");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Błąd połączenia z serwerem");
      }
    };
    
  const czyPuste = !email || !password


    return (
        <div className="login__container">
            <h1 className="login__welcome-text">Zaloguj się</h1>
            <h3>Podaj dane logowania:</h3>
            <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Wpisz email"
                className = "login__input"
            />
            <br />
            <input
                type="password"
                className="login__input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Wpisz hasło"
            />
            <br />
            <div className="login__tools">
            <button className="login__button" disabled={czyPuste} type="submit">
                Zaloguj się!
            </button>
            
            <a href='https://www.youtube.com/watch?v=5LMPXah4dG4&list=PLgWgYbAIZLblLVh9t4f-4PfVBLnRU00Tq&index=2' className="login__password-forgot">Zapomniałeś hasła?</a>

           {error && <p className="login__error">{error}</p>}

            </div>
            </form>
            <br></br>
            <h3>Jeśli nie masz jeszcze konta...</h3>
            <Link to={`/register`} className="login__side-button" >
                Zarejestruj się teraz!
            </Link>
            
            
        </div> 
    )

}

export default Logowanie;