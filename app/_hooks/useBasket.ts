import {useContext} from "react";
import BasketContext from "@providers/BasketProvider";
import {ProviderBasket} from "@_types/providers";

export function useBasket() {
    const context = useContext<ProviderBasket | null>(BasketContext);

    if (!context) {
        throw new Error('Basket provider is missing');
    }

    return {
        ...context,
        getItem: (id: number, size: string) =>
            context.basket.find(p => p.id === id && p.size === size)
    };
}
