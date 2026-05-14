'use client';

import Image from "next/image";
import {useState} from "react";

export default function DetailsSlider({slides, mainImage}: {
    slides: string[];
    mainImage: string;
}) {
    const [slide, setSlide] = useState<number>(0);

    return (
        <div className="Details__split__slider">
            <div className="Details__split__slider__base">
                {slides.length > 0 ?
                    <>
                        <div className="Details__split__slider__base__arrows-wrap"
                             onClick={() => setSlide(prev => prev <= 0 ? slides.length - 1 : prev - 1)}>
                            <Image
                                src={"/png/arrow.png"}
                                alt={"back"}
                                className={"Details__split__slider__base__arrows-wrap__arrow"}
                                width={0}
                                height={0}
                                sizes="100vw"
                                quality={100}
                                priority={true}
                            />
                        </div>
                        <Image
                            src={`/img/${slides[slide].trim()}`}
                            alt={"slide"}
                            className={"Details__split__slider__base__image"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            quality={100}
                            priority={true}
                        />
                        <div className="Details__split__slider__base__arrows-wrap"
                             onClick={() => setSlide(prev => prev >= slides.length - 1 ? 0 : prev + 1)}>
                            <Image
                                src={"/png/arrow.png"}
                                alt={"next"}
                                className={"Details__split__slider__base__arrows-wrap__arrow"}
                                width={0}
                                height={0}
                                sizes="100vw"
                                quality={100}
                                priority={true}
                            />
                        </div>
                    </>
                    : <Image
                        src={`/img/${mainImage.trim()}`}
                        alt={"slide"}
                        className={"Details__split__slider__base__image"}
                        width={500}
                        height={500}
                        quality={100}
                        priority={true}
                    />
                }
            </div>
            <div className="Details__split__slider__slides">
                {slides.map((image, i) => {
                    return (
                        <Image
                            src={`/img/${image.trim()}`}
                            alt={`slide${i}`}
                            className={"Details__split__slider__slides__image" + (i === slide ? " _active" : "")}
                            width={105}
                            height={95}
                            quality={100}
                            priority={true}
                            key={image + i}
                            onClick={() => setSlide(i)}
                        />
                    )
                })}
            </div>
        </div>
    )
}