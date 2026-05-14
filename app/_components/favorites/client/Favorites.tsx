'use client';

import {useFavorites} from "@hooks/useFavorites";
import Cart from "@ui/cart/Cart";

export default function Favorites() {
    const {favorites} = useFavorites();

    return (
        <section className="Catalog section">
            <div className="grid">
                <h1 className="title title_black">Избранное</h1>
                {favorites.length > 0 &&
                    <div className="Catalog__content">
                        {favorites.map(product => {
                            return (
                                <Cart product={product} key={product.id}/>
                            )
                        })}
                    </div>
                }
                {favorites.length === 0 &&
                    <div className="title title_black title_small"
                         style={{fontWeight: "200", textAlign: "start", marginTop: "20px"}}>
                        Нет избранных товаров.
                    </div>
                }
            </div>
        </section>
    );
}