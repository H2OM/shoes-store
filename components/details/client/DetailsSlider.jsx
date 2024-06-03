'use client';
import Image from "next/image";
import { useState } from "react";

export default function DetailsSlider ({slider, img}) {
    const [slide, setSlide] = useState(slider !== null ? slider[0] : img);
    
    return (
        <div className="Details__split__slider">
            <div className="Details__split__slider__base">
                {
                    slider !== null ? <>
                        <div className="Details__split__slider__base__arrows-wrap" onClick={()=>{
                            const next = slider.indexOf(slide)-1;
                            setSlide((next < 0 ? slider[slider.length-1] : slider[next]));
                        }}>
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
                            src={"/img/"+slide}
                            alt={"slide"}
                            className={"Details__split__slider__base__image"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            quality={100}
                            priority={true}
                        />
                        <div className="Details__split__slider__base__arrows-wrap" onClick={()=>{
                            const next = slider.indexOf(slide)+1;
                            setSlide((next > slider.length-1 ? slider[0] : slider[next]));
                        }}>
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
                    :   <Image
                            src={"/img/"+slide}
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
                {slider !== null ? 
                    slider.map((image,i)=>{
                        return (
                            <Image 
                                src={"/img/"+image}
                                alt={`slide${i}`}
                                className={"Details__split__slider__slides__image" + ((image == slide) ? " Details__split__slider__slides__image_active" : "")}
                                width={105}
                                height={95}
                                quality={100}
                                priority={true}
                                key={image+i}
                                onClick={()=>{
                                    setSlide(image);
                                }}
                            />
                        )
                    })
                    : null}
            </div>
        </div>
    )
}