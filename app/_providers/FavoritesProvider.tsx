'use client';

import {createContext, useState, useEffect, ReactNode} from 'react';
import {favoritesAPI} from "@api";
import {ProviderFavorites} from "@_types/providers";
import {Product} from "@_types/product";

const FavoritesContext = createContext<ProviderFavorites | null>(null);

export function FavoritesProvider({children}: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => void get(), []);

    const get = async () => {
        setIsPending(true);

        const response = await favoritesAPI.get();

        setIsPending(false);

        if (response.success) setFavorites(response.data);
    }

    const toggle = async (id?: number) => {
        if (isPending || !id) return;

        setIsPending(true);

        const fallback = [...favorites];

        // Оптимистичное обновление только при удалении (сразу меняем в UI)
        const isAdded = favorites.find(product => product.id === id);

        setFavorites(prev => isAdded ? prev.filter(product => product.id !== id) : prev);

        let response;

        if (isAdded) {
            response = await favoritesAPI.remove(id);

        } else {
            response = await favoritesAPI.add(id);
        }

        if (!response.success) {
            setFavorites(fallback);
        } else {
            setFavorites(response.data);
        }

        setIsPending(false);
    };

    return (
        <FavoritesContext.Provider value={{get, favorites, isPending, toggle}}>
            {children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesContext;