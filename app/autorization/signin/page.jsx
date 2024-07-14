'use client';
import MaskInput from "@/lib/basecomponents/maskInput/maskInput";
import ClientContext from "@/lib/clientProvider";
import { fetchRequest } from "@/lib/redux/thunks";
import { useContext } from "react";
import { useDispatch } from "react-redux";

export default function Signin () {
    const {loading } = useContext(ClientContext);
    const dispatch = useDispatch();
    return (
        <form className="Autorization__content__form Autorization__content__form_type2" method="post" onSubmit={async e=>{
            e.preventDefault();
            const formData = new FormData(e.target);
            const {meta : {requestStatus}, payload} = await dispatch(fetchRequest({url: '/api/user/sign-up', m: 'POST', b: formData}));
            if (requestStatus === 'fulfilled') {
                if(payload === true) {
                    window.location.replace("/");
                } else {
                    alert(payload);
                }   
                
            } else {
                alert("Arguments Error");
            }
        }}>
            <div className="Autorization__content__form__split">
                <div className="Autorization__content__form__split__block">
                    <label className="Autorization__content__form__label" htmlFor="firstName">Имя:</label>
                    <input className="Autorization__content__form__input" type="text" name="firstName" required/>
                    <label className="Autorization__content__form__label" htmlFor="secondName">Фамилия:</label>
                    <input className="Autorization__content__form__input" type="text" name="secondName"/>
                    <label className="Autorization__content__form__label" htmlFor="age">Возраст:</label>
                    <input className="Autorization__content__form__input" type="number" name="age" required/>
                    <label className="Autorization__content__form__label" htmlFor="type2Genders">Пол:</label>
                    <div className="Autorization__content__form__subBlock" id="type2Genders">
                        <input className="Autorization__content__form__input Autorization__content__form__input_radio"  type="radio" name="gender" id="women" value={"Женский"}/>
                        <label className="Autorization__content__form__label Autorization__content__form__label_radio" htmlFor="women">Женский</label>
                        <input className="Autorization__content__form__input Autorization__content__form__input_radio"  type="radio" name="gender" id="men" value={"Мужской"}/>
                        <label className="Autorization__content__form__label Autorization__content__form__label_radio" htmlFor="men">Мужской</label>
                    </div>
                </div>
                <div className="Autorization__content__form__split__block">
                    <label className="Autorization__content__form__label" htmlFor="mail" required>Электронная почта:</label>
                    <input className="Autorization__content__form__input" type="mail" name="mail"/>
                    <label className="Autorization__content__form__label" htmlFor="number" required>Номер телефона:</label>
                    <MaskInput className={"Autorization__content__form__input"} name={"number"} always={true} required/>
                    <label className="Autorization__content__form__label" htmlFor="password" required>Пароль:</label>
                    <input className="Autorization__content__form__input" type="password" name="password"/>
                    <label className="Autorization__content__form__label" htmlFor="rePassword" required>Повторите пароль:</label>
                    <input className="Autorization__content__form__input" type="password" name="rePassword" onKeyDown={(e)=>{
                        if(e.ctrlKey && e.code == 'KeyV') {
                            e.preventDefault();
                        }
                    }}/>
                </div>
            </div>
            <div className="Autorization__content__form_type2__footer">
                <label><input type="checkbox" name="agreement" required/><a onClick={({target})=>target.previousElementSibling.checked = true} className="Autorization__content__form__subinfo" target="blank" href={"agreement.html"} style={{marginLeft:"5px"}}>Согласие на обработку данных</a></label>
                <button className="btn Autorization__content__form__btn" type="submit" disabled={loading}>Зарегистрироваться</button>
            </div>
        </form>
    )
}