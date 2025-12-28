import { useEffect, useState } from "react"

type CartItem = {
  id: number
  book: {
    id: number
    title: string
    author: string
    price: number
  }
  quantity: number
}

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError("Musisz być zalogowany, aby zobaczyć koszyk")
      setLoading(false)
      return
    }

    fetch("/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Błąd przy pobieraniu koszyka")
        return res.json()
      })
      .then((data) => {
        setCartItems(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Ładowanie koszyka...</p>
  if (error) return <p>{error}</p>
  if (cartItems.length === 0) return <p>Twój koszyk jest pusty</p>

  return (
    <div>
      <h2>Twój koszyk</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <strong>{item.book.title}</strong> — {item.book.author} — {item.quantity} szt. — {item.book.price} zł
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Cart
