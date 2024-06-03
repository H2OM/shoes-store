'use client';
import Spinner from "@/lib/basecomponents/spinner/spiner";
import ClientContext from "@/lib/clientProvider";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Orders () {
    const {isAuth, setLoading} = useContext(ClientContext);
    const [orders, setOrders] = useState('uninitiated');
    const dispatch = useDispatch();
    const fetchData = useCallback(async () => {
        setLoading(true);
        const respons = await fetch('http://localhost/api/user/get-orders', {method: "GET"})
            .then(data=>{
                if(!data.ok) {
                    return undefined;
                }
                return data.json();
            })
            .catch(()=>undefined);
        setOrders(respons);
        setLoading(false);
      }, []);
    useEffect(()=>{
        if(isAuth == true) {
            fetchData();
        }
    }, [isAuth]);

    return (
        <>
            {isAuth == true ? <h2 className="title title_black title_small">Заказы</h2> : null}
            {
                orders =='uninitiated' ? <Spinner/>
                : 
                    <>
                        { (typeof orders === 'object' && !Array.isArray(orders)) ?
                            Object.keys(orders).map(id=>{
                                let totalPrice = 0;
                                const items = orders[id].goods.map(item => {
                                    totalPrice +=  Number(String(item.Price).replace(" ", ""));
                                    return (
                                        <div className="Personal__split__content__block__order__content__cart" key={item.Article}>
                                            <div className="Personal__split__content__block__order__content__cart__desc">
                                                <h2 className="Personal__split__content__block__order__content__cart__desc__price">{item.Price}{" ₽"}</h2>
                                                <Link className="Personal__split__content__block__order__content__cart__desc__link" to={serv+"catalog/"+item.Category+"/"+item.Article}><div className="Personal__split__content__block__order__content__cart__desc__title">{item.Title}</div></Link>
                                                <div className="Personal__split__content__block__order__content__cart__desc__subtitle">Артикул - {item.Article}</div>
                                                <div className="Personal__split__content__block__order__content__cart__desc__subtitle">Размер - {item.Size}</div>
                                            </div>
                                            <Link className="Personal__split__content__block__order__content__cart__desc__link" to={serv+"catalog/"+item.Category+"/"+item.Article}><img src={serv+"assets/img/"+item.Image} alt="изображение" className="Personal__split__content__block__order__content__cart__image"/></Link>
                                        </div>
                                    )
                                })
                                return (
                                    <div className="Personal__split__content__block" key={orders[id].Number}>
                                        <div className="Personal__split__content__block__order">
                                            <div className="Personal__split__content__block__order__bar">
                                                <div className="Personal__split__content__block__order__bar__title">Заказ от {orders[id].Date}</div>
                                                <div className="Personal__split__content__block__order__bar__title">
                                                    {orders[id].Status == 0 ? "В обработке" 
                                                        : orders[id].Status == 1 ? "Принят в доставку"
                                                        : orders[id].Status == 2 ? "Доставляется"
                                                        : "Доставлен"}
                                                </div>
                                                <div className="Personal__split__content__block__order__bar__title">№{orders[id].Number}</div>
                                            </div>
                                            <div className="Personal__split__content__block__order__content">
                                                {items}
                                            </div>
                                            <div className="Personal__split__content__block__order__bar Personal__split__content__block__order__bar_bottom">
                                                <div className="Personal__split__content__block__order__bar__title">Итог -{" "} 
                                                {
                                                    String(totalPrice).length > 3 
                                                        ? (String(totalPrice).substring(0, String(totalPrice).length - 3) + " " + String(totalPrice).substring(String(totalPrice).length -3, String(totalPrice).length))
                                                        : totalPrice 
                                                }{" ₽"}
                                                </div>
                                                <div className="Personal__split__content__block__order__bar__title">Дата доставки {orders[id].DeliverDate}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })  
                            : (typeof orders === 'object' && Array.isArray(orders) && orders.length == 0) ? <div className="title title_black title_small" style={{fontWeight: "200", textAlign: "start", marginTop: "20px"}}>У вас еще нет заказов</div>
                            : <div className="title title_black title_small" style={{fontWeight: "200", textAlign: "start", marginTop: "20px"}}>Здесь должна быть страница ошибки</div>
                        }
                    </>
            }
        </>
    )
}