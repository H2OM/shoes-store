'use client';

import './loadScreen.scss';
import {ReactNode} from "react";

export default function LoadScreen({children = null}: { children?: ReactNode }) {
    return <div className="loadScreen">{children}</div>;
}