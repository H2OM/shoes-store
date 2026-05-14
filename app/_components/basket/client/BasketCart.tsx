'use client';

import {ProductBasket} from "@_types/product";
import {useFavorites} from "@hooks/useFavorites";
import {useBasket} from "@hooks/useBasket";
import {Icons} from "@ui/icons/Icons";
import Link from "next/link";
import Image from "next/image";

export default function BasketCart({product}: { product: ProductBasket }) {
    const {isFavorite, toggle} = useFavorites(product.id);
    const {add, decrement, remove} = useBasket();

    const titleLength = (product.title + product.brand + product.type).length;

    return (
        <div className="Basket__split__content__cart">
            <div className="Basket__split__content__cart__desc">
                <h2 className="Basket__split__content__cart__desc__price">
                    {product.price.toLocaleString('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                    })}
                </h2>
                <div className="Basket__split__content__cart__desc__title">
                    {product.brand} {titleLength > 25
                    ? product.title.slice(0, 25 - titleLength) + "... "
                    : product.title + " "
                }<span className="Basket__split__content__cart__desc__title__type">{product.type}</span>
                </div>
                <div className="Basket__split__content__cart__desc__subtitle">Артикул - {product.article}</div>
                <div className="Basket__split__content__cart__desc__subtitle">Размер - {product.size}</div>
            </div>
            <div className="Basket__split__content__cart__options">
                <button
                    className={"btn Basket__split__content__cart__options__btn" + (isFavorite() ? '' : '  _outline')}
                    onClick={() => toggle()}>
                    <Icons type={isFavorite() ? 'filedHeart' : 'unfiledHeart'}
                           className={"Basket__split__content__cart__options__btn__svg"}
                    />
                </button>
                <div className="Basket__split__content__cart__options__value">
                    <button className="Basket__split__content__cart__options__value__btn"
                            onClick={() => decrement(product.id, product.size)}>
                        <Icons type={'dash'} className={'Basket__split__content__cart__options__value__btn__svg'}/>
                    </button>
                    <span className="Basket__split__content__cart__options__value__show">{product.count}</span>
                    <button className="Basket__split__content__cart__options__value__btn"
                            onClick={() => add(product.id, product.size)}>
                        <Icons type={'plus'} className={'Basket__split__content__cart__options__value__btn__svg'}/>
                    </button>
                </div>
                <button className="btn Basket__split__content__cart__options__remove"
                        onClick={() => remove(product.id, product.size)}>
                    <Icons type={'cross'} className={'Basket__split__content__cart__options__remove__svg'}/>
                </button>
            </div>
            <Link href={`/product/${product.id}`}>
                <Image
                    className="Basket__split__content__cart__image"
                    src={`/img/${product.image.trim()}`}
                    height={160}
                    width={160}
                    quality={100}
                    priority={true}
                    alt="изображение"
                />
            </Link>
        </div>
    );
}