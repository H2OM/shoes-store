'use client'

import Link from "next/link";
import {Icons} from "@ui/icons/Icons";
import {useBasket} from "@hooks/useBasket";
import {useFavorites} from "@hooks/useFavorites";
import useUser from "@hooks/useUser";
import Spinner from "@ui/spinner/Spinner";

export default function HeaderButtons() {
    const {user, isPending: isUserPending} = useUser();
    const {basket} = useBasket();
    const {favorites} = useFavorites();

    return (
        <div className="Header__btns">
            <Link href={"/basket"} className="Header__btns__btn btn">
                <Icons type={'basket'}/>
                <div className="Header__btns__btn__count">{basket.length}</div>
            </Link>
            <Link href={"/favorites"} className="Header__btns__btn btn">
                <Icons type={'filedHeart'}/>
                <div className="Header__btns__btn__count">{favorites.length}</div>
            </Link>
            {(isUserPending && !user)
                ? <button className="Header__btns__btn btn _disabled"><Spinner mini={true}/></button>
                : <Link className="Header__btns__btn btn" href={user ? "/personal" : "/authorization/sign-in"}>
                    <Icons type={'user'}/>
                </Link>
            }
        </div>
    );
}