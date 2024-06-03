'use client';
import './loadScreen.scss';
import ClientContext from "@/lib/clientProvider";
import { useContext } from "react";

export default function Loadscreen() {
    const {loading} = useContext(ClientContext);
    return (loading ? <div className="loadScrin"></div> : null);
}