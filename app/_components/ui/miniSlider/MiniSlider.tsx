'use client';

import './minislider.scss';
import Image from "next/image";
import {useState} from "react";
import Cart from "@components/ui/cart/Cart";
import {Product} from "@_types/product";

export default function MiniSlider({title, products}: { title: string; products: Product[]; }) {
    const [slide, moveSlide] = useState<number>(0);

    return (
        <div className="miniSlider">
            <div className="topbar">
                <h2 className="title title_black">{title}</h2>
                <div className="topbar__nav">
                    <div className="topbar__nav-wrap"
                         style={(slide === 0 ? {transition: "0s all", visibility: "hidden"} : {})}
                         onClick={() => {
                             if (slide === 0) return;

                             moveSlide(sim => sim + 25);
                         }}>
                        <Image
                            src={"/png/arrow.png"}
                            alt={"back"}
                            className={"topbar__nav-wrap__arrows"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            quality={100}
                            priority={true}
                        />
                    </div>
                    <div className="topbar__nav-wrap"
                         style={(slide <= (-25 * (products.length - 4))) ? {
                             transition: "0s all",
                             visibility: "hidden"
                         } : {}}
                         onClick={() => {
                             if (slide <= (-25 * (products.length - 4))) return;

                             moveSlide((sim) => sim - 25);
                         }}>
                        <Image
                            src={"/png/arrow.png"}
                            alt={"next"}
                            className={"topbar__nav-wrap__arrows"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            quality={100}
                            priority={true}
                        />
                    </div>
                </div>
            </div>
            <div className="miniSlider__content"
                 style={{gridTemplateColumns: `repeat(${products.length},25%)`, transform: `translateX(${slide}%)`}}>
                {products.map(product => {
                    return (
                        <Cart key={product.id} product={product} isSlider={true}/>
                    )
                })}
            </div>
        </div>
    );
}