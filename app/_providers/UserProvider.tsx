'use client'

import {createContext, ReactNode, useEffect, useState} from "react"
import {ProviderUser} from "@_types/providers";
import {User, UserEditData, UserSignInData, UserSignUpData} from "@_types/user";
import {userAPI} from "@api";
import {useFavorites} from "@hooks/useFavorites";

const UserContext = createContext<ProviderUser | null>(null);

export const UserProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isPending, setIsPending] = useState(true);
    const {get: getFavorites} = useFavorites();

    useEffect(() => void get(), []);

    const get = async () => {
        setIsPending(true);

        const response = await userAPI.get();

        setIsPending(false);

        if (response.success && response.data) {
            setUser(response.data);
        }
    }

    const signIn = async (data: UserSignInData) => {
        setIsPending(true);

        const response = await userAPI.signIn(data);

        setIsPending(false);

        if (response.success) {
            setUser(response.data);
            void getFavorites();
        }
    }

    const signUp = async (data: UserSignUpData) => {
        setIsPending(true);

        const response = await userAPI.signUp(data);

        setIsPending(false);

        if (response.success) {
            setUser(response.data);
            void getFavorites();
        }
    }

    const logOut = async () => {
        setIsPending(true);

        const response = await userAPI.logOut();

        setIsPending(false);

        if (response.success) {
            setUser(null);
        }
    }

    const edit = async (data: UserEditData) => {
        setIsPending(true);

        const response = await userAPI.edit(data);

        setIsPending(false);

        if (response.success) {
            setUser(response.data);
        }

        return Boolean(response.success);
    }

    return (
        <UserContext.Provider
            value={{
                user,
                isPending,
                get,
                signIn,
                signUp,
                edit,
                logOut,
            }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;