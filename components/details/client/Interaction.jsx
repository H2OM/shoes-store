'use client';
import { favsDataSlice, favsSelector } from "@/lib/redux/slices";
import { basketFetch } from "@/lib/redux/thunks";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Interaction ({Size, Article}) {
    const {favsData} = useSelector(favsSelector);
    const dispatch = useDispatch();
    const [favorite, changeFavorite] = useState(false);
    const [sizeValue, setSize] = useState(false);
    const [warning, setWarning] = useState(false);
    useEffect(()=>{
        if(warning) {
            setTimeout(()=>setWarning(false), 400);
        }
    }, [warning]);
    useEffect(()=>{
        if(favsData !== undefined) changeFavorite((Array.isArray(favsData) && favsData.includes(Article)) ? true : false);
    }, [favsData]);

    return (
        <>
            <div>
                <div className="Details__split__content__title" style={warning ? {borderLeft: "80px solid red"} : {}}>Выберите размер:</div>
                <div className="Details__split__content__sizes">
                    {
                        Size.split(".").map(s=>{
                            return (
                                <div className={"Details__split__content__sizes__size" + (sizeValue == s ? " Details__split__content__sizes__size_active" : "")} key={s} onClick={()=>setSize(s)}>{s}</div>
                            )
                        })
                    }
                </div>
                <div className="Details__split__content__subtitle Details__split__content__subtitle_lite">
                    <Image
                        className="Details__split__content__subtitle__svg"
                        src={"/svg/octagon.svg"}
                        height={0}
                        width={0}
                        sizes="100vw"
                        quality={100}
                        priority={true} 
                        alt="!" 
                    />
                    Последний размер
                </div>
            </div>
            
            <div className="btn Details__split__content__btn" onClick={()=>{
                if(sizeValue) {
                    dispatch(basketFetch({url: 'http://localhost/api/basket/add-basket', m:"POST", b: {article: Article, size: sizeValue}}));
                } else if (!warning) {
                    setWarning(true);
                }
            }}>В корзину</div>
            {
                favsData !== undefined ?
                <div className="Details__split__content__favorite" onClick={()=>{
                    dispatch(basketFetch({url: 'http://localhost/api/user/change-fav?article='+Article+'&action='+(favorite ? 'unset' : 'set'), m: "GET"}))
                        .then(data=>{
                            if(data.meta.requestStatus !== 'rejected') {
                                if(!favorite) {
                                    dispatch(favsDataSlice.actions.set([...favsData, Article]));
                                } else {
                                    dispatch(favsDataSlice.actions.set(favsData.filter((val)=>val != Article)));
                                }
                            } 
                        });
                }}>
                    { favorite
                        ?   <><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-suit-heart" viewBox="0 0 16 16">
                                <path className="bi bi-suit-heart" d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                            </svg>Убрать из избранного</>
                        :   <><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-suit-heart" viewBox="0 0 16 16">
                                <path className="bi bi-suit-heart" d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                            </svg>Добавить в избранное</>}
                </div> : null
            }
        </>
    )
}