'use client';

import ClientContext from "@/lib/clientProvider";
import { basketSelector, favsDataSlice, favsSelector } from "@/lib/redux/slices";
import { basketFetch } from "@/lib/redux/thunks";
import Image from "next/image";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import './basket.scss';
import Link from "next/link";
import Spinner from "@/lib/basecomponents/spinner/spiner";

export default function Basket () {
    const {basketData, status} = useSelector(basketSelector);
    const {favsData} = useSelector(favsSelector);
    const dispatch = useDispatch();
    const {isAuth} = useContext(ClientContext);
    const info = {
        totalPrice: 0,
        delivery: "",
        totalValue: 0
    };
    const goods = (Array.isArray(basketData) && basketData.length > 0) ? (basketData.map((v, i)=>{

        info.totalPrice += (v.Price * v.Value);
        info.totalValue += v.Value;
        // info.delivery = v.delivery;
        info.delivery = "02.02.2024";
        const heading = (v.Title + v.Brand + v.Type).length;
        return (
            <div className="Basket__split__content__cart" key={v.Article + v.Size}>
                <div className="Basket__split__content__cart__desc">
                    <h2 className="Basket__split__content__cart__desc__price">{v.Price} ₽</h2>
                    <div className="Basket__split__content__cart__desc__title">{(heading > 25 ? v.Brand + " " + v.Title.slice(0,25-heading) + "... " : v.Brand +" " + v.Title + " ")}<span className="Basket__split__content__cart__desc__title__type">{v.Type}</span></div>
                    <div className="Basket__split__content__cart__desc__subtitle">Артикул - {v.Article}</div>
                    <div className="Basket__split__content__cart__desc__subtitle">Размер - {v.Size}</div>
                    {/* <div className="Basket__split__content__cart__desc__subtitle">Цвет - {v.Mod}</div> */}
                </div>
                <div className="Basket__split__content__cart__options" style={isAuth != 1 ? {justifyItems: "center", gridTemplateColumns: "1fr 1fr"} : {}}>
                    { isAuth == 1 ?
                        <button className="Basket__split__content__cart__options__btn" style={v.Fav ? {backgroundColor: "#971CC3"} : {}} onClick={()=>{
                            if(!v.fav) {
                                dispatch(favsDataSlice.actions.set([...favsData, v.Article]));
                            } else {
                                dispatch(favsDataSlice.actions.set(favsData.filter((val)=>val != v.Article)));
                            }
                            dispatch(basketFetch({url: 'http://localhost/api/user/change-fav?article='+v.Article+'&action='+(v.Fav ? 'unset' : 'set'), m: "GET"}));
                        }}>
                            <Image
                                className="Basket__split__content__cart__options__btn__svg"
                                src={"/svg/" + (v.Fav ? "heart.svg" : "heartStroke.svg")}
                                style={v.Fav ? {filter: "invert(1)"} : {}}
                                height={0}
                                width={0}
                                sizes="100vw"
                                quality={100}
                                priority={true} 
                                alt="heart" 
                            />
                        </button> : null
                    }
                    <div className="Basket__split__content__cart__options__value">
                        <button className="Basket__split__content__cart__options__value__btn" onClick={()=>{
                            dispatch(basketFetch({url: 'http://localhost/api/basket/set-count', m:"POST", b: {article: v.Article, size: v.Size, type: "less"}}));
                        }}> 
                            <Image
                                className="Basket__split__content__cart__options__value__btn__svg"
                                src={"/svg/dash.svg"}
                                height={0}
                                width={0}
                                sizes="100vw"
                                quality={100}
                                priority={true} 
                                alt="-" 
                            />
                        </button>
                        <span className="Basket__split__content__cart__options__value__show">{v.Value}</span>
                        <button className="Basket__split__content__cart__options__value__btn" onClick={()=>{
                           dispatch(basketFetch({url: 'http://localhost/api/basket/set-count', m:"POST", b: {article: v.Article, size: v.Size, type: "more"}}));
                        }}>
                            <Image
                                className="Basket__split__content__cart__options__value__btn__svg"
                                src={"/svg/plus.svg"}
                                height={0}
                                width={0}
                                sizes="100vw"
                                quality={100}
                                priority={true} 
                                alt="+" 
                            />
                        </button>
                    </div>
                    <button className="Basket__split__content__cart__options__remove" onClick={()=>{
                        dispatch(basketFetch({url: 'http://localhost/api/basket/remove-prod', m:"POST", b: {article: v.Article, size: v.Size }}));
                    }}>
                        <Image
                            className="Basket__split__content__cart__options__remove__svg"
                            src={"/svg/x.svg"}
                            height={0}
                            width={0}
                            sizes="100vw"
                            quality={100}
                            priority={true} 
                            alt="X" 
                        />
                    </button>
                </div>
                <Link href={"/catalog/"+v.Category+"/"+v.Article}>
                    <Image
                        className="Basket__split__content__cart__image"
                        src={"/img/"+v.Image}
                        height={160}
                        width={160}
                        quality={100}
                        priority={true} 
                        alt="изображение" 
                    />
                </Link>
            </div>
        )
    })) : null;
    return (
        <section className="Basket section">
            {basketData === undefined ? <Spinner/> : null}
            <div className="grid">
                <h1 className="title title_black">Корзина покупок</h1>
                {
                    goods !== null ?
                        <div className="Basket__split">
                            <div className="Basket__split__side">
                                <div className="Basket__split__side__block">
                                    <span className="Basket__split__side__block__title">Итоговая сумма:</span>
                                    <p className="Basket__split__side__block__value">
                                        {
                                            String(info.totalPrice).length > 3 
                                                ? (String(info.totalPrice).substring(0, String(info.totalPrice).length - 3) + " " + String(info.totalPrice).substring(String(info.totalPrice).length -3, String(info.totalPrice).length))
                                                : info.totalPrice 
                                        }{" ₽"}

                                    </p>
                                </div>
                                <div className="Basket__split__side__block">
                                    <span className="Basket__split__side__block__title">Дата доставки:</span>
                                    <p className="Basket__split__side__block__value">{info.delivery}</p>
                                </div>
                                <div className="Basket__split__side__block">
                                    <span className="Basket__split__side__block__title">Общее количество:</span>
                                    <p className="Basket__split__side__block__value">{info.totalValue}</p>
                                </div>
                                <Link href={"/basket/order"} className="btn Basket__split__side__confirm">Оформить заказ</Link>
                                <button className="btn Basket__split__side__clear" onClick={()=>{
                                    dispatch(basketFetch({url: 'http://localhost/api/basket/full-clear'}));
                                }}>Очистить корзину</button>
                            </div>
                            <div className="Basket__split__content">
                                {goods}
                            </div>
                        </div>
                    : basketData !== undefined 
                    ? <div className="title title_black title_small" style={{fontWeight: "200", textAlign: "start", marginTop: "20px"}}>Корзина пуста</div>
                    : null
                }
            </div>
        </section>
    )
}