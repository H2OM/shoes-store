'use client';
import './cart.scss';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { basketFetch } from "@/lib/redux/thunks.js";
import { favsDataSlice, favsSelector } from "@/lib/redux/slices";
export default function Cart ({info, isSlide = false}) {
    const {Image : img, Brand, Type, Title, Price, Price_old, Size : sizes, Article, Category} = info;
    const {favsData} = useSelector(favsSelector);
    const [modals, statusModals] = useState({
        show: false,
        isSizes: false
    });
    const [sizesNav, changeSizesNav] = useState(0);
    const [favorite, changeFavorite] = useState(false);
    const dispatch = useDispatch();
    const navigate = useRouter();
    const Size = sizes.split(".");
    useEffect(()=>{
        // console.log(favsData);
        if(favsData !== undefined) changeFavorite((Array.isArray(favsData) && favsData.includes(Article)) ? true : false);
    }, [favsData]);
    return (
        <div className={"cart-wrap" + (isSlide ? " cart-wrap_slide" : "")}>
            <div className="cart" onClick={({target})=>{
                switch(target.classList.value) {
                    case "cart__btn btn btn_small":
                    case "cart__sizes__nav":
                    case "cart__sizes":
                    case "bi bi-suit-heart": 
                        break;
                    default:
                        if(modals.isSizes) {
                            statusModals({...modals, isSizes: false});
                            break;
                        }
                        navigate.push(`/catalog/${Category}/${Article}`);
                        break;
                }
            }}
                onMouseEnter={({target})=>{
                    if(!target.classList.contains("cart")) target = target.closest(".cart");
                    target.classList.remove("cart_unactive");
                    target.classList.add("cart_active");
                    statusModals({...modals, show: true});
                }} onMouseLeave={({target})=>{
                    if(!target.classList.contains("cart")) target = target.closest(".cart");
                    target.classList.remove("cart_active");
                    target.classList.add("cart_unactive");
                    statusModals({isSizes: false, show: false});
                }}>
                {
                    favsData !== undefined ?
                    <div className="cart__heart" onClick={async ()=>{
                        await dispatch(basketFetch({url: 'http://localhost/api/user/change-fav?article='+Article+'&action='+(favorite ? 'unset' : 'set'), m: "GET"}))
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
                            ?   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-suit-heart" viewBox="0 0 16 16">
                                    <path className="bi bi-suit-heart" d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                                </svg>
                            :   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-suit-heart" viewBox="0 0 16 16">
                                    <path className="bi bi-suit-heart" d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                                </svg>}
                    </div> : null
                }
                <Image
                    src={"/img/"+img}
                    alt={"ОШИБКА ЗАГРУЗКИ ФОТОГРАФИИ"}
                    className={"cart__img"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    quality={100}
                    priority={true}
                />
                <div className="cart__desc">
                    <div className="cart__desc__price cart__desc__price_new">{Price} ₽{Price_old ? <span className="cart__desc__price cart__desc__price_old">{Price_old} ₽</span> : null}</div>
                    <h3 className="cart__desc__title">{Type} {(Title.length > 19 ? Title.slice(0,19) + "... " : Title)}</h3>
                    <h3 className="cart__desc__title">{Brand}</h3>
                    <div className="cart__desc__size">{Array.isArray(Size) ? Size.join(" ") : ""}</div>
                </div>
                {(modals.show && !modals.isSizes) ? <button className="cart__btn btn btn_small" onClick={()=>{
                    statusModals({...modals, isSizes: true});
                }}>В корзину</button> : null}
                <div className="cart__sizes" style={(modals.isSizes && modals.show) ? {} : {display: "none"}}>
                    <div className="cart__sizes__wrapper" style={{transform: `translateX(-${sizesNav * 20}%)`}}>
                        { (Array.isArray(Size) && Size.length != 0) ?
                            Size.map((value,i)=>{
                                return(
                                    <button key={i} className="cart__sizes__wrapper__btn" onClick={async (e)=>{
                                        e.stopPropagation();
                                        statusModals({...modals, isSizes: false});
                                        await dispatch(basketFetch({url: 'http://localhost/api/basket/add-basket', m:"POST", b: {article: Article, size: value}}));
                                    }}>{value}</button>
                                )
                            }) : <div>Товар закончился</div>
                        }
                    </div>
                    <div className="cart__sizes__nav">
                        
                        { (Array.isArray(Size) && Size.length != 0) ?
                           Size.map((value,i)=>{
                                if(!(i % 5 === 0)) return null;
                                return(
                                    <div className="cart__sizes__nav__tab" key={i} onClick={(e)=>{
                                        e.stopPropagation();
                                        changeSizesNav(i);
                                    }}></div>
                                );
                           }) : <div>Товар закончился</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}