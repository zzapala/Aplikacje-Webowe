import LogoutButton from "../components/LogoutButton"
import "./Panel.css"
import { useAuth } from "../hooks/useAuth";
import OrdersList from "../components/OrdersList"; // Dodaj ten import

function Panel() {
    const { user, loading } = useAuth();

    if (loading) return <p>Ładowanie danych użytkownika...</p>;
    if (!user) return <p>Nie jesteś zalogowany</p>;
    
    return (
        <div className="profile-panel">
            <div className="profile-panel_personal-info">
                <img src="/user.png" className="user-pic" alt="user"></img>
                <div className="user-data-left">
                    <h2 className="user-name">Witaj, {user.login}</h2>
                    <div className="logout"><LogoutButton /></div>
                </div>
            </div>
            <div className="profile-panel_orders-data">
                <div className="orders-info">
                    <h2>Twoje zamówienia:</h2>
                    <OrdersList />
                </div>
            </div>
        </div>
    )
}

export default Panel;