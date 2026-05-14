import {ReactNode} from "react";
import Authorization from "@components/authorization/client/Authorization";
import '@components/authorization/authorization.scss';

export default function Layout({children}: { children: ReactNode }) {
    return (
        <Authorization>
            {children}
        </Authorization>
    );
}