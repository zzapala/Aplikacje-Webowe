import { useState } from "react";
import './Komentarz.css'

export interface KomentarzProps {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: UserProps;
}

export interface UserProps {
    id: number;
    username: string;
    fullName: string;
}

export function Komentarz({ komentarz }: { komentarz: KomentarzProps })  {
    
    const [likes, setLikes] = useState(komentarz.likes);

    return (
        <div className="komentarz">
            <p className="id_uzytkownik">@{komentarz.user.username}</p>
            <p className="imie_nazwisko">{komentarz.user.fullName}</p>
            <hr></hr>
            <p className="box_komentarz">{komentarz.body}</p>

            <hr></hr>
            <p>Liczba polubień: {likes}</p>

            <button className="przycisk" onClick={() => setLikes(likes + 1)}>
                Lubię to
            </button>
            <button className = "przycisk" onClick={() => setLikes(likes - 1)}>
                Nie lubię tego
            </button>
        </div>
    );
}

export default Komentarz;
