'use client';

import {FormEvent, useState} from "react";
import {callbackAPI} from '@api';
export default function FooterForm() {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if (isFetching) return;

        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email')?.toString();

        if(!email) return;

        setIsFetching(true);

        await callbackAPI.subscribe({email});

        setIsFetching(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="mail" className="Footer__link">Подписка на рассылку:</label>
            <div className="Footer__form">
                <input type="email" name="email" className="Footer__form__input" placeholder="Ваша почта..."/>
                <button type="submit" className="Footer__form__submit">Подписаться</button>
            </div>
        </form>
    )
}