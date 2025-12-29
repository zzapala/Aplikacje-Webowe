import React, { useEffect, useState } from 'react';
import type { CartItem } from '../types/CartItem';
import { getCart } from '../utils/cartItems';
import './Koszyk.css'
import { Link } from 'react-router-dom';



const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const token = localStorage.getItem('token');
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [orderMessage, setOrderMessage] = useState<string | null>(null);


  useEffect(() => {
    if (!token) return;

    const fetchCart = async () => {
      const items = await getCart(token);
      setCartItems(items);
    };

    fetchCart();
  }, [token]);

  if (!token) {
    return <p>Musisz się zalogować, żeby zobaczyć koszyk</p>;
  }

  if (cartItems.length === 0) {
    return <p>Nie masz nic w koszyku.</p>;
  }

  const changeQuantity = async (bookId: number, delta: number) => {
    const currentItem = cartItems.find(item => item.book.id === bookId);
    if (!currentItem) return;
  
    const newQuantity = Math.max(1, currentItem.quantity + delta);
  
    if (newQuantity === currentItem.quantity) return;
  
    setCartItems((prev) =>
      prev.map((item) =>
        item.book.id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  
    try {
      const response = await fetch('http://localhost:3000/api/cart', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ 
          bookId, 
          quantity: newQuantity
        }),
      });
  
      if (!response.ok) {
        throw new Error('Błąd synchronizacji koszyka');
      }
    } catch (error) {
      console.error("Nie udało się zaktualizować koszyka:", error);
    }
  };
  const removeFromCart = async (bookId: number) => {
    setCartItems((prev) =>
      prev.filter((item) => item.book.id !== bookId)
    );
  
    try {
      await fetch(`http://localhost:3000/api/cart/${bookId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );  
  
  const handleOrder = async () => {
    setLoadingOrder(true);
    setOrderMessage(null);

    try {
      const res = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}) 
      });

      const data = await res.json();

      if (!res.ok) {
        setOrderMessage(data.message || 'Błąd składania zamówienia');
        return;
      }

      setOrderMessage('Zamówienie zostało złożone!');
      setCartItems([]);
    } catch (err) {
      console.error(err);
      setOrderMessage('Błąd serwera');
    } finally {
      setLoadingOrder(false);
    }
  };
  

  return (
    <>

      <h2>Twój koszyk</h2>
      <div className="cart-page">
        <div className="books-cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.book.cover} alt={item.book.title} />
              <div className="cart-item-text">
              <div className="cart-item-left">
              <Link to={`/products/${item.book.id}`}>
                <div className="cart-item-title">{item.book.title}</div>
              </Link>
                <div className="cart-item-author">{item.book.author}</div>
              </div>
              <div className="cart-item-right">
                <div className="cart-item-price">{item.book.price.toFixed(2)} zł</div>
                <div className="cart-item-qnt">Ilość: {item.quantity}</div> 
                <div className="cart-item-qnt-change">
                  <button className="qnt-change-button" onClick={() => changeQuantity(item.book.id, +1)}>+</button>
                  <button className="qnt-change-button" onClick={() => changeQuantity(item.book.id, -1)}>-</button>

                </div>
                  <button className="remove-button" onClick={() => removeFromCart(item.book.id)}>usuń</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Produkty w koszyku:</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="item-summary-row">
                <div className="item-summary-title">{item.book.title}</div>
              <div className="item-summary-price">
                {item.quantity} × {item.book.price.toFixed(2)} zł ={" "}
                <strong>
                  {(item.quantity * item.book.price).toFixed(2)} zł
                </strong>
                <hr></hr>
              </div>
              
            </div>
          ))}
          <div className="cart-summary-total">
            <strong>Suma:</strong> {totalPrice.toFixed(2)} zł
          </div>
          <button 
            className="order-button" 
            onClick={handleOrder} 
            disabled={loadingOrder || cartItems.length === 0}
          >
            {loadingOrder ? "Składanie zamówienia..." : "Zamów produkty"}
          </button>
          {orderMessage && <p>{orderMessage}</p>}
        </div>
    </div>
    </>
  );
};

export default CartPage;
