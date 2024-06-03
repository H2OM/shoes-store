'use client';
import { useContext } from "react";
import ClientContext from "@/lib/clientProvider";
import Loadscreen from "@/lib/basecomponents/loadScreen/loadscreen";

export default function PersonalContent ({children}) {
    const {isAuth} = useContext(ClientContext);
    return (
        <div className="Personal__split__content">
            <Loadscreen/>
            {isAuth == true ? children : <div className="title title_black title_small" style={{fontWeight: "200", textAlign: "start", marginTop: "20px"}}>Здесь должна быть заглушка</div>}
            {}
        </div>
    )
}