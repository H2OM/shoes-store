import {ReactNode} from "react";
import PersonalTabs from "@components/personal/client/PersonalTabs";
import ClientLink from "@ui/clientLink/ClientLink";
import {Icons} from "@ui/icons/Icons";

export default function Personal({children}: { children: ReactNode }) {
    return (
        <section className="Personal section">
            <div className="grid">
                <h1 className="title title_black">Личный кабинет</h1>
                <div className="Personal__split">
                    <PersonalTabs>
                        <ClientLink activeRoutes={["/personal", "/personal/edit"]}
                                    href={"/personal"}
                                    className={"btn _white Personal__split__side__btn"}
                                    activeClassName={"_active"}
                        >
                            <Icons type={'user'} className={'btn__svg'}/>
                            Профиль
                        </ClientLink>
                        <ClientLink href={"/personal/orders"}
                                    className={"btn _white Personal__split__side__btn"}
                                    activeClassName={"_active"}
                        >
                            <Icons type={'order'} className={'btn__svg'}/>
                            Заказы
                        </ClientLink>
                        <ClientLink href={"/personal/favorites"}
                                    className={"btn _white Personal__split__side__btn"}
                                    activeClassName={"_active"}
                        >
                            <Icons type={'unfiledHeart'} className={'btn__svg'}/>
                            Избранное
                        </ClientLink>
                    </PersonalTabs>
                    <div className="Personal__split__content">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}