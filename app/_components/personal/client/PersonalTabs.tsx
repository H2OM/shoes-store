'use client';

import {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import useUser from "@hooks/useUser";
import {Icons} from "@ui/icons/Icons";

export default function PersonalTabs({children}: { children: ReactNode }) {
    const {user, isPending, logOut} = useUser();
    const [exitModal, setExitModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !user) {
            router.push("/authorization/sign-in");
        }
    }, [user, isPending]);

    return (
        <div className="Personal__split__side">
            {children}
            <div className={"Personal__split__side__block"}>
                <button
                    className={"btn Personal__split__side__btn _exit" + (exitModal ? " _gray _active" : "")}
                    onClick={() => setExitModal(true)}>
                    <Icons type={'exit'} className={'btn__svg'}/>
                    Выход
                </button>
                <div className={"Personal__split__side__block__modal" + (exitModal ? " _active" : "")}>
                    <p className="Personal__split__side__block__modal__title">Подтвердите выход</p>
                    <div className="Personal__split__side__block__modal__wrap">
                        <button type="submit" className="btn" onClick={logOut}>
                            Выйти
                        </button>
                        <button className="btn _gray"
                                onClick={() => setExitModal(false)}>
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}