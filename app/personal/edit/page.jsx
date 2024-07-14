'use client';
import MaskInput from "@/lib/basecomponents/maskInput/maskInput";
import Spinner from "@/lib/basecomponents/spinner/spiner";
import ClientContext from "@/lib/clientProvider";
import { userSelector } from "@/lib/redux/slices";
import { fetchRequest, userFetch } from "@/lib/redux/thunks";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Edit () {
    const {isAuth, loading} = useContext(ClientContext);
    const { userData, status } = useSelector(userSelector);
    const [answer, setAnswer] = useState();
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
        if(isAuth == true && userData === undefined) {
            dispatch(userFetch({url: '/api/user/get-user', m: 'GET', b: null}));
        }
    }, [isAuth]);
    if(userData === undefined && (status == 'loading' || status == 'idle')) 
        return (<Spinner/>)
    if(userData === undefined && status == 'rejected') 
        return (<div className="title title_black title_small" style={{fontWeight: "200", textAlign: "start", marginTop: "20px"}}>Здесь должна быть страница ошибки</div>)
    if(userData !== undefined)
        return (
            <>
                <h2 className="title title_black title_small">Изменить профиль</h2>
                <form data-form method="post" onSubmit={async (e)=>{
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    dispatch(userFetch({url: '/api/user/edit-user', m: 'POST', b: formData}))
                        .then(data=>{
                            console.log(data.meta.requestStatus);
                            if(data.meta.requestStatus == 'fulfilled') {
                                router.push("/personal")
                            }
                        })
                }}>
                    <div className="Personal__split__content__split">
                        <div className="Personal__split__content__split__block">
                            <label className="Personal__split__content__split__block__label">Имя: <input type="text" name="firstName" defaultValue={userData.firstName} className="Personal__split__content__split__block__label__input"/></label>
                            <label className="Personal__split__content__split__block__label">Дата рождения: <input type="number" name="age" defaultValue={userData.age} className="Personal__split__content__split__block__label__input"/></label>
                            <label className="Personal__split__content__split__block__label">E-mail: <input type="mail" name="mail" defaultValue={userData.mail} className="Personal__split__content__split__block__label__input"/></label>
                            
                        </div>
                        <div className="Personal__split__content__split__block">
                            <label className="Personal__split__content__split__block__label">Фамилия: <input type="text" name="secondName" defaultValue={userData.secondName} className="Personal__split__content__split__block__label__input"/></label>
                            <label className="Personal__split__content__split__block__label">Телефон: <MaskInput className={"Personal__split__content__split__block__label__input"} name={"number"} always={true} baseValue={userData.number} required={true}/></label>
                            <div className="Personal__split__content__split__block__label Personal__split__content__split__block__label_switch">
                                Пол:
                                <label className="Personal__split__content__split__block__label__switch"><input type="radio" name="gender" value={"Женский"} defaultChecked={userData.gender == "female" ? true : false} className="Personal__split__content__split__block__label__switch__radio"/> Женский</label> 
                                <label className="Personal__split__content__split__block__label__switch"><input type="radio" name="gender" value={"Мужской"} defaultChecked={userData.gender == "male" ? true : false} className="Personal__split__content__split__block__label__switch__radio"/> Мужской</label>
                            </div>
                        </div>
                        <div className="Personal__split__content__split__password"></div>
                    </div>
                    <button className="btn" type="submit" disabled={loading}>Сохранить</button>
                    {status == 'rejected' ? <div style={{textAlign: "center",color: "#ff3838",fontWeight: 500}}>Ошибка изменения данных</div> : null}
                </form>
            </>
        )
}