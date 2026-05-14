'use client';

import useUser from "@hooks/useUser";
import Spinner from "@ui/spinner/Spinner";
import LoadScreen from "@ui/loadScreen/LoadScreen";
import MaskInput from "@ui/maskInput/MaskInput";
import {FormEvent} from "react";
import {UserEditData} from "@_types/user";
import {useRouter} from "next/navigation";

export default function PersonalProfileEdit() {
    const {user, edit, isPending} = useUser();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        const response = await edit(data as unknown as UserEditData);

        if (response) {
            router.push("/personal");
        }
    }

    if (!user) return <Spinner/>;

    return (
        <>
            {isPending && <LoadScreen><Spinner/></LoadScreen>}
            <h2 className="title title_black title_small">Изменить профиль</h2>
            <form data-form onSubmit={handleSubmit}>
                <div className="Personal__split__content__split">
                    <div className="Personal__split__content__split__block">
                        <h3 className="Personal__split__content__split__block__title">Личная информация</h3>
                        <label className="Personal__split__content__split__block__label">
                            Имя: <input className="Personal__split__content__split__block__label__input"
                                        required
                                        type="text"
                                        name="first_name"
                                        defaultValue={user.first_name}/>
                        </label>
                        <label className="Personal__split__content__split__block__label">
                            Фамилия: <input className="Personal__split__content__split__block__label__input"
                                            type="text"
                                            name="second_name"
                                            defaultValue={user.second_name}/>
                        </label>
                        <label className="Personal__split__content__split__block__label">
                            Возраст: <input className="Personal__split__content__split__block__label__input"
                                            required
                                            type="number"
                                            name="age"
                                            defaultValue={user.age}/>
                        </label>
                        <div className="Personal__split__content__split__block__label _switch">
                            Пол:
                            <label className="Personal__split__content__split__block__label__switch">
                                <input className="Personal__split__content__split__block__label__switch__radio"
                                       required
                                       type="radio"
                                       name="gender"
                                       value="female"
                                       defaultChecked={user.gender === "female"}/> Женский
                            </label>
                            <label className="Personal__split__content__split__block__label__switch">
                                <input className="Personal__split__content__split__block__label__switch__radio"
                                       required
                                       type="radio"
                                       name="gender"
                                       value="male"
                                       defaultChecked={user.gender === "male"}/> Мужской
                            </label>
                        </div>
                    </div>
                    <div className="Personal__split__content__split__block">
                        <h3 className="Personal__split__content__split__block__title">Контактная информация</h3>
                        <label className="Personal__split__content__split__block__label">
                            Почта: <input className="Personal__split__content__split__block__label__input"
                                          required
                                          type="email" name="email"
                                          defaultValue={user.email}/>
                        </label>
                        <label className="Personal__split__content__split__block__label">
                            Номер телефона: <MaskInput
                            className={"Personal__split__content__split__block__label__input"}
                            required={true}
                            name="phone"
                            baseValue={user.phone}/>
                        </label>
                    </div>
                    {/*TODO смена пароля*/}
                </div>
                <button className="btn _w-100" type="submit" disabled={isPending}>Сохранить</button>
            </form>
        </>
    );
}