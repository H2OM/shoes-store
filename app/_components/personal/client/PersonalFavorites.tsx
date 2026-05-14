'use client';

import useUser from "@hooks/useUser";
import Spinner from "@ui/spinner/Spinner";
import LoadScreen from "@ui/loadScreen/LoadScreen";
import {useFavorites} from "@hooks/useFavorites";
import Cart from "@ui/cart/Cart";

export default function PersonalFavorites() {
    const {user, isPending} = useUser();
    const {favorites} = useFavorites();

    if (!user) return <Spinner/>;

    return (
        <>
            {isPending && <LoadScreen><Spinner/></LoadScreen>}
            <h2 className="title title_black title_small">Избранное</h2>
            <div className="Personal__split__content__split">
                {favorites.length > 0 && favorites.map((item => (
                    <Cart product={item} key={item.id}/>
                )))}
                {favorites.length === 0 &&
                    <div className="title title_black title_lite">
                        Нет избранных товаров
                    </div>
                }
            </div>
        </>
    );
}