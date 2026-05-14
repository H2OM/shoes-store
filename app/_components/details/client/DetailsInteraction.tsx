'use client';

import {useEffect, useState} from "react";
import {useFavorites} from "@hooks/useFavorites";
import {useBasket} from "@hooks/useBasket";
import {Icons} from "@ui/icons/Icons";
import {ProductBasket} from "@_types/product";

export default function DetailsInteraction({sizes, productId}: { sizes: string, productId: number }) {
    const {toggle, isFavorite, isPending: isFavoritesPending} = useFavorites(productId);
    const {add, remove, isPending: isBasketPending, getItem, basket} = useBasket();
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [inBasket, setInBasket] = useState<ProductBasket | undefined>(undefined);
    const [warning, setWarning] = useState(false);

    useEffect(() => {
        if (warning) {
            setTimeout(() => setWarning(false), 600);
        }
    }, [warning]);

    useEffect(() => {
        setInBasket(getItem(productId, selectedSize));
    }, [productId, selectedSize, basket]);

    const handleAddToBasket = () => {
        if (selectedSize) {
            add(productId, selectedSize);

        } else if (!warning) {
            setWarning(true);
        }
    }

    return (
        <div>
            <div className="Details__split__content__title" style={warning ? {borderLeftWidth: "21px"} : {}}>
                Выберите размер:
            </div>
            <div className="Details__split__content__sizes">
                {sizes.split(".").map(size => (
                    <div
                        className={"Details__split__content__sizes__size"
                            + (selectedSize === size ? " _active" : "")
                            + (getItem(productId, size) ? " _in-basket" : "")
                        }
                        key={size}
                        onClick={() => setSelectedSize(size)}>
                        {size}
                    </div>
                ))}
            </div>
            <div className="Details__split__content__subtitle _lite">
                <Icons type={'octagon'} className={'Details__split__content__subtitle__svg'}/>
                &nbsp;- Последний размер
                <br/>
                <Icons type={'basket'} className={'Details__split__content__subtitle__svg'} style={{fill: '#971cc3'}}/>
                &nbsp;- В корзине
            </div>
            {/*TODO доделать функционал - 'добавлено в корзину' и 'выбрать сколько добавить'*/}
            <div style={{display: "flex", flexDirection: "column", gap: '6px', minHeight: '136px'}}>
                <div className="Details__split__content__container">
                    <button className="btn" disabled={isBasketPending} onClick={handleAddToBasket}>
                        {inBasket ? `Добавить еще (${inBasket.count})` : 'В корзину'}
                    </button>
                    <button className={"btn" + (isFavorite() ? ' _selected' : '')} disabled={isFavoritesPending}
                            onClick={() => toggle()}>
                        <Icons type={isFavorite() ? 'filedHeart' : 'unfiledHeart'}/>
                    </button>
                </div>
                {inBasket &&
                    <button className="btn _outline _w-100" onClick={() => remove(productId, selectedSize)}>
                        Удалить из корзины
                    </button>
                }
            </div>
        </div>
    )
}