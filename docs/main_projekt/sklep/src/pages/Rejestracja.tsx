import { useState } from "react"
import "./Login.css"
import { Link, useNavigate } from "react-router-dom"

function Rejestracja() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState("")
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, login, password }),
      })

      const data = await res.json()


      if (!res.ok) {
        setError("Niewłaściwe dane logowania")
        return
      }

      localStorage.setItem("token", data.token)
      navigate("/account")

    } catch {
      setError("Błąd połączenia z serwerem")
    }
  }

  const czyPuste = !email || !password


    return (
        <div className="login__container">
            <h1 className="login__welcome-text">Dołącz do Posłowia!</h1>
            <h3>Podaj dane uzytkownika:</h3>
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
                type="string"
                value={login}
                onChange={e => setLogin(e.target.value)}
                placeholder="Wpisz login"
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
                Stwórz konto
            </button>
            </div>
            </form>

            
     
           {error && <p className="login__error">{error}</p>}
            
           <br></br>
            <h3>Jeśli chcesz przejść do strony logowania:</h3>
            <Link to={`/login`} className="login__side-button" >
                Zaloguj się!
            </Link>

        </div> 

    )

}

export default Rejestracja;