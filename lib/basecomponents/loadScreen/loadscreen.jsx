'use client';
import './loadscreen.scss';
import ClientContext from "@/lib/clientProvider";
import { useContext } from "react";

export default function Loadscreen() {
    const {loading} = useContext(ClientContext);
    return (loading ? <div className="loadScrin"></div> : null);
}