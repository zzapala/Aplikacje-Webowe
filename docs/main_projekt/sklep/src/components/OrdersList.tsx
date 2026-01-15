import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface OrderItem {
  id: number;
  title: string;
  bookId: number;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  totalPrice: number;
  createdAt: string;
  OrderItems: OrderItem[];
}

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Błąd pobierania zamówień:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Ładowanie zamówień...</p>;
  if (orders.length === 0) return <p>Nie masz jeszcze żadnych zamówień.</p>;

  return (
    <div className="orders-container">
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <span><strong>Zamówienie nr:</strong> #{order.id}</span>
            <span><strong>Data:</strong> {new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="order-items-list">
            {order.OrderItems?.map((item) => (
              <div key={item.id} className="order-item-row">
                <Link to={`/products/${item.bookId}`} className="order-item-title">
                  {item.title}
                </Link>
                <span>{item.quantity} szt. × {item.price.toFixed(2)} zł</span>
              </div>
            ))}
          </div>
          <div className="order-summary">
            <strong>Suma: {order.totalPrice.toFixed(2)} zł</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;