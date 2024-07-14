import Link from 'next/link';
import '../details.scss';
import {notFound} from "next/navigation";
import Image from "next/image";
import MiniSlider from '@/lib/basecomponents/miniSlider/miniSlider';
import Interaction from '../client/Interaction';
import TabsNavigation from '../client/TabsNavigation';
import DetailsSlider from '../client/DetailsSlider';

export default async function Details({data}) {

    const {product, related} = data;

    let {
        Title,
        Type,
        Brand,
        Size,
        Image: img,
        SliderImages,
        Price,
        Article,
        Color,
        Price_old: OldPrice,
        Category,
        Fav = null,
        Colors,
        Description
    } = product;

    Colors = Colors !== null ? Colors.split(",") : [];

    return (
        <section className="Details section">
            <div className="grid">
                <h1 className="title title_black">{Brand} {Title} <span className="title__type">{Type}</span></h1>
                <div className="Details__split">
                    <div className="Details__split__content">
                        <div>
                            <div className="Details__split__content__price">{Price} ₽</div>
                            <div
                                className="Details__split__content__subtitle Details__split__content__subtitle_art">Артикул
                                - {Article}</div>
                            <div
                                className="Details__split__content__subtitle Details__split__content__subtitle_color">Цвет
                                - {Color}</div>
                        </div>
                        {Colors.length > 1 ?
                            <>
                                <div className="Details__split__content__title">Другие цвета:</div>
                                <div className="Details__split__content__colors">
                                    {
                                        Colors.map(value => {
                                            value = value.split("#");

                                            return value[0] == Article
                                                ?
                                                <Image
                                                    className="Details__split__content__colors__type Details__split__content__colors__type_active"
                                                    src={`/img/${value[2]}`}
                                                    height={100}
                                                    width={110}
                                                    quality={100}
                                                    priority
                                                    alt="Цвет"
                                                    key={value[0]}
                                                />
                                                : <Link key={value[0]} href={`/catalog/${value[1]}/${value[0]}`}>
                                                    <Image
                                                        className="Details__split__content__colors__type"
                                                        src={`/img/${value[2]}`}
                                                        height={100}
                                                        width={110}
                                                        quality={100}
                                                        priority
                                                        alt="Цвет"
                                                        key={value[0]}
                                                    />
                                                </Link>
                                        })
                                    }
                                </div>
                            </>
                            : null
                        }
                        <Interaction Size={Size} Article={Article}/>
                    </div>
                    <DetailsSlider slider={(SliderImages != "" ? SliderImages.split(",") : null)} img={img}/>

                </div>
                <div className="Details__tabs">
                    <TabsNavigation>
                        <div className="Details__tabs__nav__tab Details__tabs__nav__tab_active" data-link={"Описание"}>
                            Описание
                        </div>
                        <div className="Details__tabs__nav__tab" data-link={"Товар"}>
                            О товаре
                        </div>
                        <div className="Details__tabs__nav__tab" data-link={"Отзывы"}>
                            Отзывы
                            {/* <span className="Details__tabs__nav__tab__value"> {Array.isArray(feedback) ? feedback.length : ""}</span> */}
                        </div>
                    </TabsNavigation>
                    <div className="Details__tabs__content">
                        <div className="Details__tabs__content__block Details__tabs__content__block_active"
                             data-link={"Описание"}>
                            {Description}
                        </div>
                        <div className="Details__tabs__content__block" data-link={"Товар"}>
                            //Характеристики
                        </div>
                        <div className="Details__tabs__content__block" data-link={"Отзывы"}>
                            //Отзывы
                        </div>
                    </div>
                </div>
                {Array.isArray(related) && related.length > 0 ?
                    <MiniSlider title={"Похожие товары"} products={related}/> : null}
            </div>
        </section>
    )
}