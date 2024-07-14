'use client';
import MaskInput from "@/lib/basecomponents/maskInput/maskInput";
import ClientContext from "@/lib/clientProvider";
import { fetchRequest } from "@/lib/redux/thunks";
import { useContext } from "react";
import { useDispatch } from "react-redux";

export default function Login () {
    const {loading } = useContext(ClientContext);
    const dispatch = useDispatch();
    return (
        //Пароль должен быть больше 5 символов и содержать минимум 2 буквы разных регистров
        <form className="Autorization__content__form" method="post" onSubmit={async e=>{
            e.preventDefault();
            const formData = new FormData(e.target);
            const {meta : {requestStatus}, payload} = await dispatch(fetchRequest({url: '/api/user/sign-in', m: 'POST', b: formData}));
            if (requestStatus === 'fulfilled') {
                if(payload == true) {
                    window.location.replace("/");
                } else {
                    alert(payload);
                }   
                
            } else {
                alert("Arguments Error");
            }
        }}>
            <label className="Autorization__content__form__label" htmlFor="login">Телефон:</label>
            <MaskInput className={"Autorization__content__form__input"} name={"number"} always={true} required/>
            <label className="Autorization__content__form__label" htmlFor="password">Пароль:</label>
            <input className="Autorization__content__form__input" type="password" name="password" required/>
            <button className="Autorization__content__form__subinfo">Забыли пароль</button>
            <button className="btn" type="submit" disabled={loading}>Войти</button>
        </form>
    )
}