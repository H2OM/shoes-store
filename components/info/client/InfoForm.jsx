'use client';
import { fetchRequest } from "@/lib/redux/thunks";
import { useDispatch } from "react-redux";


export default function InfoForm () {
    const dispatch = useDispatch();
    const formSubmit = async (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        await dispatch(fetchRequest({url: '/api/callback/form-callback', m: 'POST', b: formData}))
            .then(()=>e.target.reset());
    }

    return (
        <form className="About__callback__form" onSubmit={formSubmit}>
            <div className="About__callback__form__block">
                <label className="About__callback__form__block__wrap">Имя:<input className="About__callback__form__block__wrap__input" name="firstName" type="text" placeholder="Ваше имя..."/></label>
                <label className="About__callback__form__block__wrap">Почта для ответа:<input className="About__callback__form__block__wrap__input" name="mail" type="text" placeholder="Ваша почта..."/></label>
            </div>
            <div className="About__callback__form__block">
                <label className="About__callback__form__block__wrap">Тема вопроса:<input className="About__callback__form__block__wrap__input" name="title" type="text" placeholder="Тема..."/></label>
            </div>
            <div className="About__callback__form__block">
                <label className="About__callback__form__block__wrap">Текст вопроса:<textarea className="About__callback__form__block__wrap__input" name="message" cols="30" rows="10" placeholder="Вопрос..."></textarea></label>
            </div>
            <button className="btn About__callback__form__block__submit" type="submit">Отправить</button>
        </form>
    )
}