'use client';
import Spinner from "@/lib/basecomponents/spinner/spiner";
import ClientContext from "@/lib/clientProvider";
import { userSelector } from "@/lib/redux/slices";
import { userFetch } from "@/lib/redux/thunks";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Profile () {
    const  {isAuth} = useContext(ClientContext);
    const { userData, status } = useSelector(userSelector);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(isAuth == true && userData === undefined) {
            dispatch(userFetch({url: '/api/user/get-user', m: 'GET', b: null}));
        }
    }, [isAuth]);
    if(status == 'loading' || userData === undefined && status == 'idle') 
        return (<Spinner/>)
    if(userData === undefined && status == 'rejected') 
        return (<div className="title title_black title_small" style={{fontWeight: "200", textAlign: "start", marginTop: "20px"}}>Здесь должна быть страница ошибки</div>)
    if(userData !== undefined)
        return (
            <>
                <h2 className="title title_black title_small">Профиль</h2>
                <div className="Personal__split__content__split">
                    <div className="Personal__split__content__split__block">
                        <h3 className="Personal__split__content__split__block__title">Личная информация</h3>
                        <div className="Personal__split__content__split__block__field">Ваше имя: <span data-info>{userData.firstName}</span></div>
                        <div className="Personal__split__content__split__block__field">Ваша фамилия: <span data-info>{userData.secondName}</span></div>
                        <div className="Personal__split__content__split__block__field">Возраст: <span data-info>{userData.age}</span></div>
                        <div className="Personal__split__content__split__block__field">Пол: <span data-info>{userData.gender == "female" ? "Женский" : "Мужской"}</span></div>
                    </div>
                    <div className="Personal__split__content__split__block">
                        <h3 className="Personal__split__content__split__block__title">Контактная информация</h3>
                        <div className="Personal__split__content__split__block__field">Ваша почта: <span data-info>{userData.mail}</span></div>
                        <div className="Personal__split__content__split__block__field">Ваша номер телефона: <span data-info>{userData.number}</span></div>
                    </div>
                </div>
                <Link href={"/personal/edit"} className="btn">Изменить информацию</Link>
            </>
        )
}
