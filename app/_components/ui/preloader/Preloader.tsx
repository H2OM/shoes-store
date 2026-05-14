'use client';

import "./preloader.scss";
import {useEffect, useState} from "react";
import Spinner from "@ui/spinner/Spinner";

export default function Preloader() {
    const [isContentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'auto';

        setContentLoaded(true);
    }, []);

    return !isContentLoaded ? <div className="preloader"><Spinner/></div> : null;
}