'use client';

import useUser from "@hooks/useUser";
import {ReactNode, useEffect} from "react";
import Link from "next/link";
import LoadScreen from "@ui/loadScreen/LoadScreen";
import Spinner from "@ui/spinner/Spinner";
import {usePathname, useRouter} from "next/navigation";

export default function Authorization({children}: { children: ReactNode }) {
    const {user, isPending} = useUser();
    const pathname = usePathname();
    const router = useRouter();
    const isSignIn = pathname.includes("sign-in");

    useEffect(() => {
        if (!isPending && user) {
            router.push("/personal");
        }
    }, [user, isPending]);

    return (
        <section className="Authorization section">
            <div className="grid">
                <h1 className="title title_black" style={{textAlign: "center"}}>Авторизация</h1>
                <div className="Authorization__tabs">
                    <div className={"Authorization__tabs__roller "
                        + (!isSignIn ? "Authorization__tabs__roller_roll" : "")}></div>
                    <Link href={"sign-in"}
                          className={"Authorization__tabs__btn"
                              + (isSignIn ? " _active" : "")
                              + (isPending ? " _block" : "")
                          }>
                        Вход
                    </Link>
                    <Link href={"sign-up"}
                          className={"Authorization__tabs__btn"
                              + (!isSignIn ? " _active" : "")
                              + (isPending ? " _block" : "")
                          }>
                        Регистрация
                    </Link>
                </div>
                <div className="Authorization__content">
                    {(isPending || user) && <LoadScreen><Spinner/></LoadScreen>}
                    {children}
                </div>
            </div>
        </section>
    )
}