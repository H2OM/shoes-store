import {Product, ProductBasket} from "./product";
import {User, UserEditData, UserSignInData, UserSignUpData} from "@_types/user";

export interface ProviderFavorites {
    favorites: Product[];
    get: () => Promise<void>;
    toggle: (id?: number) => Promise<void>;
    isPending: boolean;
}

export interface ProviderBasket {
    basket: ProductBasket[];
    add: (productId: number, productSize: string, toastSuccess?: boolean, count?: number) => void;
    setCount: (productId: number, productSize: string, count: number) => void;
    decrement: (productId: number, productSize: string) => void;
    remove: (productId: number, productSize: string) => void;
    clear: () => void;
    toggle: (productId: number, productSize: string) => void;
    isPending: boolean;
}

export interface ProviderUser {
    user: User | null;
    isPending: boolean;
    get: () => Promise<void>;
    signIn: (data: UserSignInData) => Promise<void>;
    signUp: (data: UserSignUpData) => Promise<void>;
    edit: (data: UserEditData) => Promise<boolean>;
    logOut: () => Promise<void>;
}