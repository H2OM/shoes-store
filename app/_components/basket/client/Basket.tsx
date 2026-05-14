'use client';

import {useBasket} from "@hooks/useBasket";
import {useMemo} from "react";
import Link from "next/link";
import BasketCart from "@components/basket/client/BasketCart";
import LoadScreen from "@ui/loadScreen/LoadScreen";
import Spinner from "@ui/spinner/Spinner";

export default function Basket() {
    const {basket, isPending, clear} = useBasket();

    const total = useMemo(() => {
        return basket.reduce((acc, product) => ({
            price: acc.price + product.price * product.count,
            count: acc.count + product.count
        }), {price: 0, count: 0});
    }, [basket]);

    return (
        <section className="Basket section">
            {isPending && <LoadScreen><Spinner/></LoadScreen>}
            <div className="grid">
                <h1 className="title title_black">Корзина покупок</h1>
                {basket.length > 0 &&
                    <div className="Basket__split">
                        <div className="Basket__split__side">
                            <div className="Basket__split__side__block">
                                <span className="Basket__split__side__block__title">Итоговая сумма:</span>
                                <p className="Basket__split__side__block__value">
                                    {total.price.toLocaleString('ru-RU', {
                                        style: 'currency',
                                        currency: 'RUB',
                                    })}
                                </p>
                            </div>
                            <div className="Basket__split__side__block">
                                <span className="Basket__split__side__block__title">Дата доставки:</span>
                                <p className="Basket__split__side__block__value">-</p>
                            </div>
                            <div className="Basket__split__side__block">
                                <span className="Basket__split__side__block__title">Общее количество:</span>
                                <p className="Basket__split__side__block__value">{total.count}</p>
                            </div>
                            <Link href={"/basket/order"} className="btn Basket__split__side__confirm _w-100">
                                Оформить заказ
                            </Link>
                            <button className="btn _outline _w-100" onClick={() => clear()}>
                                Очистить корзину
                            </button>
                        </div>
                        <div className="Basket__split__content">
                            {basket.map(product => (
                                <BasketCart product={product} key={product.id + product.size}/>
                            ))}
                        </div>
                    </div>
                }
                {basket.length === 0 &&
                    <div className="title title_black title_small"
                         style={{fontWeight: "200", textAlign: "start", marginTop: "20px"}}>
                        Корзина пуста
                    </div>
                }
            </div>
        </section>
    );
}