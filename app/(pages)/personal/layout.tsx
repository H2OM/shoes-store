import {ReactNode} from "react";
import Personal from "@components/personal/server/Personal";
import "@components/personal/personal.scss";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <Personal>
            {children}
        </Personal>
    );
}