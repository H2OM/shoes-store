'use client';

import useUser from "@hooks/useUser";
import Spinner from "@ui/spinner/Spinner";
import LoadScreen from "@ui/loadScreen/LoadScreen";
import {useEffect, useMemo, useState} from "react";
import {UserOrder} from "@_types/user";
import {userAPI} from "@api";
import Link from "next/link";
import Image from "next/image";

const orderStatusesMap: Record<number, string> = {
    0: "В обработке",
    1: "Принят в доставку",
    2: "Доставляется"
}

export default function PersonalOrders() {
    const {user, isPending} = useUser();
    const [loading, setLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<UserOrder[] | null>(null);

    useEffect(() => void getOrders(), []);

    const total: Record<number, number> = useMemo(() => {
        if (orders === null) return {};

        const result: Record<number, number> = {};

        orders.forEach(order => {
            result[order.id] = order.products.length;
        })

        return result;
    }, [orders]);

    async function getOrders() {
        setLoading(true);

        const response = await userAPI.getOrders();

        setLoading(false);

        if (response.success) {
            setOrders(response.data);

        } else {
            setOrders(null);
        }
    }

    if (!user) return <Spinner/>;

    return (
        <>
            {(isPending || loading) && <LoadScreen><Spinner/></LoadScreen>}
            <h2 className="title title_black title_small">Заказы</h2>
            {orders && orders.length > 0 && orders.map(order => (
                <div className="Personal__split__content__block" key={order.id}>
                    <div className="Personal__split__content__block__order">
                        <div className="Personal__split__content__block__order__bar">
                            <div className="Personal__split__content__block__order__bar__title">
                                Заказ от {order.date}
                            </div>
                            <div className="Personal__split__content__block__order__bar__title">
                                {orderStatusesMap[order.status] ?? "Доставлен"}
                            </div>
                            <div className="Personal__split__content__block__order__bar__title">
                                №{order.number}
                            </div>
                        </div>
                        <div className="Personal__split__content__block__order__content">
                            {order.products.map(product => (
                                <div className="Personal__split__content__block__order__content__cart" key={product.id}>
                                    <div className="Personal__split__content__block__order__content__cart__desc">
                                        <h2 className="Personal__split__content__block__order__content__cart__desc__price">
                                            {product.price.toLocaleString('ru-RU', {
                                                style: 'currency',
                                                currency: 'RUB',
                                            })}
                                        </h2>
                                        <Link
                                            className="Personal__split__content__block__order__content__cart__desc__link"
                                            href={`/product/${product.id}`}>
                                            <div
                                                className="Personal__split__content__block__order__content__cart__desc__title">
                                                {product.title}
                                            </div>
                                        </Link>
                                        <div
                                            className="Personal__split__content__block__order__content__cart__desc__subtitle">
                                            Артикул - {product.article}
                                        </div>
                                        <div
                                            className="Personal__split__content__block__order__content__cart__desc__subtitle">
                                            Размер - {product.size}
                                        </div>
                                    </div>
                                    <Link className="Personal__split__content__block__order__content__cart__desc__link"
                                          href={`/product/${product.id}`}>
                                        <Image
                                            src={`/img/${product.image.trim()}`}
                                            alt={"ОШИБКА ЗАГРУЗКИ ФОТОГРАФИИ"}
                                            className={"Personal__split__content__block__order__content__cart__image"}
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            quality={100}
                                            priority={true}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="Personal__split__content__block__order__bar _bottom">
                            <div className="Personal__split__content__block__order__bar__title">
                                Итог - {total[order.id].toLocaleString('ru-RU', {
                                style: 'currency',
                                currency: 'RUB',
                            })}
                            </div>
                            <div className="Personal__split__content__block__order__bar__title">
                                Дата доставки {order.delivery_date}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {orders && orders.length === 0 &&
                <div className="title title_black title_small"
                     style={{fontWeight: "200", textAlign: "start", marginTop: "20px"}}>
                    У вас еще нет заказов
                </div>
            }
            {!loading && orders === null &&
                <div className="title title_black title_small"
                     style={{fontWeight: "200", textAlign: "start", marginTop: "20px"}}>
                    Не удалось получить заказы
                </div>
            }
        </>
    );
}