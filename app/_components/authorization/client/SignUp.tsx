'use client';

import useUser from "@hooks/useUser";
import {FormEvent, useState} from "react";
import {UserSignUpData} from "@_types/user";
import MaskInput from "@ui/maskInput/MaskInput";
import toast from "react-hot-toast";

export default function SignUp() {
    const {isPending, signUp} = useUser();
    const [password, setPassword] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData) as unknown as UserSignUpData;

        if(data.password_confirmed !== password) {
            toast.error("Пароли не совпадают");

            return;
        }

        void signUp(data);
    }

    return (
        <form className="Authorization__content__form _type2" onSubmit={handleSubmit}>
            <div className="Authorization__content__form__split">
                <div className="Authorization__content__form__split__block">
                    <label className="Authorization__content__form__label" htmlFor="first_name">Имя:</label>
                    <input className="Authorization__content__form__input" type="text" name="first_name" required/>
                    <label className="Authorization__content__form__label" htmlFor="second_name">Фамилия:</label>
                    <input className="Authorization__content__form__input" type="text" name="second_name" required/>
                    <label className="Authorization__content__form__label" htmlFor="age">Возраст:</label>
                    <input className="Authorization__content__form__input" type="number" name="age" required/>
                    <label className="Authorization__content__form__label" htmlFor="genders">Пол:</label>
                    <div className="Authorization__content__form__subBlock" id="genders">
                        <input className="Authorization__content__form__input Authorization__content__form__input_radio"
                               type="radio" name="gender" id="female" value="female" required/>
                        <label className="Authorization__content__form__label Authorization__content__form__label_radio"
                               htmlFor="female">Женский</label>
                        <input className="Authorization__content__form__input Authorization__content__form__input_radio"
                               type="radio" name="gender" id="male" value="male" required/>
                        <label className="Authorization__content__form__label Authorization__content__form__label_radio"
                               htmlFor="male">Мужской</label>
                    </div>
                </div>
                <div className="Authorization__content__form__split__block">
                    <label className="Authorization__content__form__label" htmlFor="email">Электронная почта:</label>
                    <input className="Authorization__content__form__input" type="email" name="email" required/>
                    <label className="Authorization__content__form__label" htmlFor="number">Номер телефона:</label>
                    <MaskInput className={"Authorization__content__form__input"} name={"phone"} required/>
                    <label className="Authorization__content__form__label" htmlFor="password">Пароль:</label>
                    <input className="Authorization__content__form__input" type="password" name="password" required
                           autoComplete="new-password"
                           value={password}
                           onChange={({currentTarget}) => setPassword(currentTarget.value)}
                    />
                    <label className="Authorization__content__form__label" htmlFor="password_confirmed">
                        Повторите пароль:
                    </label>
                    <input className="Authorization__content__form__input form__field-status" type="password"
                           autoComplete="new-password"
                           name="password_confirmed"
                           onKeyDown={(e) => {
                               if (e.ctrlKey && e.code === 'KeyV') {
                                   e.preventDefault();
                               }

                               //TODO !!! сравнение паролей и добавление классов
                           }}
                    />
                </div>
            </div>
            <div className="Authorization__content__form _type2__footer">
                <label>
                    <input type="checkbox" name="agreement" required/>
                    <a className="Authorization__content__form__subinfo" target="blank" href={"agreement.html"}
                       style={{marginLeft: "5px"}}>
                        Согласие на обработку данных
                    </a>
                </label>
                <button className="btn Authorization__content__form__btn" type="submit" disabled={isPending}>
                    Зарегистрироваться
                </button>
            </div>
        </form>
    )
}