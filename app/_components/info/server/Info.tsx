import '../info.scss';
import Image from "next/image";
import InfoForm from '@components/info/client/InfoForm';
import ClientImage from "@ui/clientImage/ClientImage";
import {Icons} from "@ui/icons/Icons";
import {contacts} from "@/_constants/contacts";

export default function Info() {
    return (
        <section className="About section" id="About">
            <div className="About__us">
                <div className="grid">
                    <h1 className="title title_black">О нас</h1>
                    <div className="About__us__section">
                        <div className="About__describe">
                            Интернет-магазин “Shoes” предоставляет большой выбор обуви для всех.
                        </div>
                        <Image
                            src="/img/sneaker.jpg"
                            alt="Изображение"
                            className="About__us__section__image"
                            width={500}
                            height={425}
                            priority={true}
                            quality={100}
                        />
                    </div>
                    <div className="About__us__section About__us__section_right">
                        <div className="About__describe">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda tenetur ut qui ipsum,
                            obcaecati quos illo distinctio laudantium laboriosam, blanditiis animi nam fuga, doloremque
                            voluptatibus amet adipisci molestias unde! Aut?
                        </div>
                        <Image
                            src="/img/sneaker.jpg"
                            alt="Изображение"
                            className="About__us__section__image"
                            width={500}
                            height={425}
                            priority={true}
                            quality={100}
                        />
                    </div>
                </div>
            </div>
            <div className="About__ordering">
                <div className="grid">
                    <h2 className="title">Как заказать товар в нашем магазине?</h2>
                    <div className="About__describe About__describe_typetwo">
                        Перейдите в интересующий вас раздел, выберете товар который вам понравится, нажмите добавить в
                        корзину.
                        Как закончите с выбором - переходите в корзину и нажмите кнопку оформить заказ.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod dolorum, iusto consequatur animi
                        ipsam magnam ex culpa voluptatem! Dicta, maiores! Provident mollitia nobis veritatis itaque
                        impedit minima doloribus, modi quia.
                    </div>
                </div>
            </div>
            <div className="About__connect" id="Contacts">
                <div className="grid">
                    <h2 className="title">Как с нами связаться?</h2>
                    <div className="About__describe About__describe_typethree">
                        <p>
                            Можете написать нам в <a href={contacts.socials.telegram} className="About__describe__link">Telegram
                            <Icons type={'telegram'} className={'About__describe__link__svg'}/>
                        </a> или <a href={contacts.socials.vk} className="About__describe__link">Vk
                            <Icons type={'vk'} className={'About__describe__link__svg'}/>
                        </a>.
                            <br/>
                            Наша почта - <span className="About__describe__link">{contacts.email}</span>.
                        </p>
                    </div>
                </div>
                <ClientImage
                    src={"/png/LOGOpng.png"}
                    alt="logo"
                    className="About__connect__logo"
                    width={350}
                    height={350}
                    quality={100}

                />
            </div>
            <div className="About__callback" id="Callback">
                <div className="grid">
                    <h1 className="title">Форма обратной связи</h1>
                    <div className="About__describe About__describe_typethree">Остались вопросы или нужна помощь
                        специалиста? Заполните форму и наш менеджер свяжется с вами.
                    </div>
                    <InfoForm/>
                </div>
            </div>
        </section>
    );
}