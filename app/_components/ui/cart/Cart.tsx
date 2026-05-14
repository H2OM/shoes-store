'use client';

import './cart.scss';
import Image from "next/image";
import {useState} from "react";
import {Product} from "@_types/product";
import {Icons} from "@components/ui/icons/Icons";
import {useFavorites} from "@hooks/useFavorites";
import {useBasket} from "@hooks/useBasket";
import Link from "next/link";

type Modal = {
    show: boolean;
    sizes: boolean;
}
// TODO добавить colors в CART

export default function Cart({product, isSlider = false}: { product: Product; isSlider?: boolean; }) {
    const {isFavorite, isPending, toggle} = useFavorites(product.id);
    const {add} = useBasket();
    const [modal, setModal] = useState<Modal>({show: false, sizes: false});
    const [sizesNav, setSizesNav] = useState<number>(0);

    const sizes: string[] = product.size.split(".");
    const title: string = (product.title.length > 19 ? product.title.slice(0, 19) + "... " : product.title);

    return (
        <div className={"cart-wrap" + (isSlider ? " cart-wrap_slide" : "")}>
            <div className="cart"
                 onMouseEnter={({currentTarget}) => {
                     let target = currentTarget;

                     if (!target.classList.contains("cart")) target = target.closest(".cart")!;

                     target.classList.remove("cart_unactive");
                     target.classList.add("cart_active");

                     setModal({...modal, show: true});
                 }}
                 onMouseLeave={({currentTarget}) => {
                     let target = currentTarget;

                     if (!target.classList.contains("cart")) target = target.closest(".cart")!;

                     target.classList.remove("cart_active");
                     target.classList.add("cart_unactive");

                     setModal({sizes: false, show: false});
                 }}>
                <div className={"cart__heart" + (isPending ? ' _disabled' : '')} onClick={() => toggle()}>
                    <Icons type={isFavorite() ? 'filedHeart' : 'unfiledHeart'}/>
                </div>
                <Link href={`/product/${product.id}`}>
                    <Image
                        src={`/img/${product.image.trim()}`}
                        alt={"ОШИБКА ЗАГРУЗКИ ФОТОГРАФИИ"}
                        className={"cart__img"}
                        width={0}
                        height={0}
                        sizes="100vw"
                        quality={100}
                        priority={true}
                    />
                </Link>
                <div className="cart__desc">
                    <div className="cart__desc__price cart__desc__price_new">
                        {product.price.toLocaleString('ru-RU', {
                            style: 'currency',
                            currency: 'RUB',
                        })}&nbsp;
                        {product.price_old ?
                            <span className="cart__desc__price cart__desc__price_old">
                                {product.price_old.toLocaleString('ru-RU', {
                                    style: 'currency',
                                    currency: 'RUB',
                                })}
                            </span>
                            : null
                        }
                    </div>
                    <Link href={`/product/${product.id}`} className="cart__desc__title">{product.type} {title}</Link>
                    <h3 className="cart__desc__sub-title">{product.brand}</h3>
                    <div className="cart__desc__size">{sizes.slice(0, 16).join(" ") + ' ...'}</div>
                </div>
                {(modal.show && !modal.sizes) &&
                    <button className="cart__btn btn btn_small" onClick={() => setModal({...modal, sizes: true})}>
                        В корзину
                    </button>
                }
                <div className="cart__sizes" style={(modal.sizes && modal.show) ? {} : {display: "none"}}>
                    <div className="cart__sizes__wrapper" style={{transform: `translateX(-${sizesNav * 20}%)`}}>
                        {sizes.length !== 0 ?
                            sizes.map((size, i) => {
                                return (
                                    <button key={i} className="cart__sizes__wrapper__btn"
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                setModal({...modal, sizes: false});
                                                add(product.id, size);
                                            }}>
                                        {size}
                                    </button>
                                )
                            }) : <div>Товар закончился</div>
                        }
                    </div>
                    <div className="cart__sizes__nav">
                        {sizes.length !== 0 ?
                            sizes.map((_, i) => {
                                if (!(i % 5 === 0)) return null;

                                return (
                                    <div className={"cart__sizes__nav__tab" + (sizesNav === i ? ' _active' : '')}
                                         key={i}
                                         onClick={(e) => {
                                             e.stopPropagation();
                                             setSizesNav(i);
                                         }}
                                    ></div>
                                );
                            }) : <div>Товар закончился</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}