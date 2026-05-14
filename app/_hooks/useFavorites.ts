import {useContext} from "react";
import FavoritesContext from "@providers/FavoritesProvider";
import {ProviderFavorites} from "@_types/providers";

export function useFavorites(productId?: number) {
    const context = useContext<ProviderFavorites | null>(FavoritesContext);

    if (!context) {
        throw new Error('Favorites provider is missing');
    }

    return {
        ...context,
        isFavorite: (id?: number) => {
            const pId = id || productId;

            if (!pId) return false;

            return Boolean(context.favorites.find(product => product.id === pId));
        },
        toggle: (id?: number) => context.toggle(id ?? productId)
    };
}
