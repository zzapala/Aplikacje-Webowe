import { useAuth } from "../hooks/useAuth";
import "./LogoutButton.css"

function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button className="logout" onClick={logout}>
      Wyloguj się
    </button>
  );
}

export default LogoutButton;
