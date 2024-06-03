'use client'
import ClientContext from "@/lib/clientProvider";
import { basketSelector } from "@/lib/redux/slices";
import { useContext } from "react";
import { useSelector } from "react-redux";
import ClientImage from "../../../lib/basecomponents/clientImage/clientImage";
import Link from "next/link";

export default function HeaderBtns () {
    const {isAuth } = useContext(ClientContext);
    const {basketData}= useSelector(basketSelector);
    return (
        <div className="Header__btns">
            <Link href={"/basket"} className="Header__btns__btn btn">
                <ClientImage src={"/svg/basket-white.svg"} alt={"-"} className={"btn__svg"} width={0} height={0} sizes={"100vw"} quality={100}/>
                Корзина 
                <div className="Header__btns__btn__count">{Array.isArray(basketData) ? basketData.length : basketData === undefined 
                ? <div className="Header__btns__btn__count__loader"></div>
                : "!"}</div>
            </Link>
            {
                isAuth == 'loading' 
                ? <button className="Header__btns__btn btn btn_disabled">loading...</button>
                : isAuth == true ? 
                    <Link className="Header__btns__btn btn" href={"/personal"}>
                        <ClientImage src={"/svg/user-white.svg"} alt={"-"} className={"btn__svg"} width={0} height={0} sizes={"100vw"} quality={100}/>
                        Личный кабинет
                    </Link>
                :   <Link className="Header__btns__btn btn" href={"/autorization/login"}>
                        <ClientImage src={"/svg/user-white.svg"} alt={"-"} className={"btn__svg"} width={0} height={0} sizes={"100vw"} quality={100}/>
                        Авторизация
                    </Link>
            }
        </div>
    )
}