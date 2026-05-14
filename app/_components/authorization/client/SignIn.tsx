'use client';

import useUser from "@hooks/useUser";
import {FormEvent} from "react";
import {UserSignInData} from "@_types/user";
import MaskInput from "@ui/maskInput/MaskInput";

export default function SignIn() {
    const {isPending, signIn} = useUser();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData) as unknown as UserSignInData;

        void signIn(data);
    }

    return (
        //Пароль должен быть больше 5 символов и содержать минимум 2 буквы разных регистров
        <form className="Authorization__content__form" method="post" onSubmit={handleSubmit}>
            <label className="Authorization__content__form__label" htmlFor="phone">Телефон:</label>
            <MaskInput className={"Authorization__content__form__input"} name={"phone"} required/>
            <label className="Authorization__content__form__label" htmlFor="password">Пароль:</label>
            <input className="Authorization__content__form__input" type="password" name="password"
                   autoComplete="current-password"
                   required
            />
            {/*TODO Забыли пароль*/}
            <button className="Authorization__content__form__subinfo">Забыли пароль?</button>
            <button className="btn" type="submit" disabled={isPending}>Войти</button>
        </form>
    )
}