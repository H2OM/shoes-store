'use client';
import { fetchRequest } from "@/lib/redux/thunks";
import { useDispatch } from "react-redux";


export default function FooterForm() {
    const dispatch = useDispatch();
    return (
        <form action="post" onSubmit={async (e)=>{
            e.preventDefault();
            const formData = new FormData(e.target);
            dispatch(fetchRequest({url: 'http://localhost/api/callback/mail-subscribe', m: 'POST', b: formData}));
        }}>
            <label htmlFor="mail" className="Footer__link">Подписка на рассылку:</label>
            <div className="Footer__form">
                <input type="email" name="mail" className="Footer__form__input" placeholder="Ваша почта..."/>
                <button type="submit" className="Footer__form__submit">Подписаться</button>
            </div>
        </form>

    )
}