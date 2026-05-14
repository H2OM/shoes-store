'use client';

import {callbackAPI} from '@api';
import {FormEvent, useState} from "react";
import {CallbackForm} from "@_types/callbacks";

export default function InfoForm() {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if (isFetching) return;

        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        setIsFetching(true);

        await callbackAPI.form(data as unknown as CallbackForm);

        setIsFetching(false);
    }

    return (
        <form className="About__callback__form" onSubmit={handleSubmit}>
            <div className="About__callback__form__block">
                <label className="About__callback__form__block__wrap">
                    Имя:<input className="About__callback__form__block__wrap__input"
                               name="first_name"
                               type="text"
                               placeholder="Ваше имя..."
                               required/>
                </label>
                <label className="About__callback__form__block__wrap">
                    Почта для ответа:<input className="About__callback__form__block__wrap__input"
                                            name="email"
                                            type="text"
                                            placeholder="Ваша почта..."
                                            required/>
                </label>
            </div>
            <div className="About__callback__form__block">
                <label className="About__callback__form__block__wrap">
                    Тема вопроса:<input className="About__callback__form__block__wrap__input"
                                        name="title"
                                        type="text"
                                        placeholder="Тема..."
                                        required/>
                </label>
            </div>
            <div className="About__callback__form__block">
                <label className="About__callback__form__block__wrap">
                    Текст вопроса:<textarea className="About__callback__form__block__wrap__input"
                                            name="message"
                                            cols={30}
                                            rows={10}
                                            placeholder="Вопрос..."/>
                </label>
            </div>
            <button className="btn About__callback__form__block__submit" type="submit">Отправить</button>
        </form>
    );
}