import {useContext} from "react";
import {ProviderUser} from "@_types/providers";
import UserContext from "@providers/UserProvider";

export default function useUser() {
    const context = useContext<ProviderUser | null>(UserContext);

    if (!context) {
        throw new Error('User provider is missing');
    }

    return context;
}