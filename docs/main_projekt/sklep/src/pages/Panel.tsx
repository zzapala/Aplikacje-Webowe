import LogoutButton from "../components/LogoutButton"
import "./Panel.css"

function Panel() {

    return (
        <div className="profile-panel">
            <div className="profile-panel_personal-info">
                <div className="user-data">
                    <img src="/user.png" className="user-pic"></img>
                    <h2 className="user-name">Witaj, Chuj</h2>
                </div>
                <div className="logout"><LogoutButton /></div>
            </div>
            <div className="profile-panel_orders-data">
                <div className="orders-info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, labore quod soluta autem nisi harum nobis, molestiae est officia cum impedit veniam ratione, expedita accusantium mollitia. Optio consectetur cupiditate cumque.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore optio doloremque magnam cupiditate recusandae alias quod, iste non minus quisquam eveniet, maiores incidunt, ad tenetur voluptatum sequi eius corrupti. Sed?
                </div>
            </div>
        </div>

    )
}

export default Panel