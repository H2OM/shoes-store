import '../personal.scss';
import ClientLink from '@/lib/basecomponents/clientLink/clientLink';
import ClientImage from '@/lib/basecomponents/clientImage/clientImage';
import PersonalTabs from '../client/personalTabs';
import Loadscreen from '@/lib/basecomponents/loadScreen/loadscreen';

export default function Personal ({children}) {
    return (
        <section className="Personal section">
            <div className="grid">
                <h1 className="title title_black">Личный кабинет</h1>
                <div className="Personal__split">
                    <PersonalTabs>
                        <ClientLink activeRoutes={["/personal", "/personal/edit"]} href={"/personal"}
                            className={"btn btn_small Personal__split__side__btn"} 
                            activeClassName={" Personal__split__side__btn_active"} 
                        >
                            <ClientImage src={"/svg/user.svg"} alt={"user"} className={"btn__svg"} width={0} height={0} sizes={"100vw"} quality={100}/>
                            Профиль
                        </ClientLink>
                        <ClientLink href={"/personal/orders"} 
                            className={"btn btn_small Personal__split__side__btn"} 
                            activeClassName={" Personal__split__side__btn_active"}
                        >
                            <ClientImage src={"/svg/order.svg"} alt={"order"} className={"btn__svg"} width={0} height={0} sizes={"100vw"} quality={100}/>
                            Заказы
                        </ClientLink>
                        <ClientLink href={"/personal/favorites"} 
                            className={"btn btn_small Personal__split__side__btn"}
                            activeClassName={" Personal__split__side__btn_active"}
                        >
                            <ClientImage src={"/svg/heartStroke.svg"} alt={"fav"} className={"btn__svg"} width={0} height={0} sizes={"100vw"} quality={100}/>
                            Избранное
                        </ClientLink>
                    </PersonalTabs>
                        <div className="Personal__split__content">
                            <Loadscreen/>
                            {children}
                        </div>
                </div>
            </div>
        </section> 
    )
}