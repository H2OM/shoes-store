'use client';
import { useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import ClientContext from "@/lib/clientProvider";
import { fetchRequest } from "@/lib/redux/thunks";
import { useRouter } from "next/navigation";
import ClientImage from "@/lib/basecomponents/clientImage/clientImage";

export default function PersonalTabs ({children}) {
    const {isAuth, loading} = useContext(ClientContext);
    const [exitModal, statusExitModal] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(()=>{
        if(!isAuth) {
            router.push("/autorization/login");
        }
        // if (isAuth == true) {
        //     dispatch(userFetch({url: 'http://localhost/api/user/get-user', m: 'GET', b: null}));
        // }
    }, [isAuth]);
    return (
        
        <div className="Personal__split__side" onClick={(e)=>{
            let target = e.target;
            if(target.classList.contains("Personal__split__side__btn") || target.classList.contains("btn__svg")) {
                if(target.classList.contains("btn__svg")) target = target.parentElement;
                if(target.classList.contains("Personal__split__side__btn_active")) {
                    e.preventDefault();
                }
                if(target.parentElement.classList.contains("Personal__split__side__block")) {
                    if(exitModal) {
                        target.parentElement.querySelector(".Personal__split__side__block__modal").classList.add("Personal__split__side__block__modal_close");
                        setTimeout(()=>statusExitModal(false),200);
                    } else {
                        statusExitModal(true);
                    }
                        
                } else { 
                    target.parentElement.querySelectorAll(".Personal__split__side__btn_active").forEach(elem=>elem.classList.remove("Personal__split__side__btn_active"));
                    target.classList.add("Personal__split__side__btn_active");
                }
            }
        }}>
            {children}
            <div className="Personal__split__side__block">
                <button className={"btn btn_small Personal__split__side__btn Personal__split__side__btn_exit" + (exitModal ? " Personal__split__side__btn_active_gray" : "")} onClick={(e)=>{
                    if(loading) e.stopPropagation();
                }}>
                    <ClientImage src={"/svg/exit.svg"} alt={"exit"} className={"btn__svg"} width={0} height={0} sizes={"100vw"} quality={100}/>
                    Выход
                </button>
                {
                    exitModal ? 
                    <div className="Personal__split__side__block__modal">
                        <p className="Personal__split__side__block__modal__title">Подвердите выход</p>
                        <div className="Personal__split__side__block__modal__wrap">
                            <form style={{width: "48%"}} onSubmit={async (e)=>{
                                if(!isAuth == true) return;
                                e.preventDefault();
                                const answer = await dispatch(fetchRequest({url: 'http://localhost/api/user/log-out', method: "GET"}));
                                if(!answer.error) {
                                    window.location.replace("http://localhost/");
                                }
                            }}>
                                <button type="submit" className="Personal__split__side__block__modal__wrap__btn">Выйти</button>
                            </form>
                            <button className="Personal__split__side__block__modal__wrap__btn Personal__split__side__block__modal__wrap__btn_gray" 
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    e.target.parentElement.parentElement.classList.add("Personal__split__side__block__modal_close");
                                    setTimeout(()=>statusExitModal(false),200);
                                }}>Отмена
                            </button>
                        </div>
                    </div> : null 
                }
            </div>
        </div>
    )
}