'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";
import {ReactNode, useEffect, useState} from "react";

export default function ClientLink({href, children = null, activeRoutes = [], className = '', activeClassName = ''}: {
    href: string;
    children?: ReactNode;
    activeRoutes?: string[];
    className?: string;
    activeClassName?: string;
}) {
    const pathname = usePathname();
    const [isActive, setActive] = useState(false);

    useEffect(() => {
        let status = false;

        if (activeRoutes.length !== 0) {
            status = Boolean(activeRoutes.find(route => route === pathname));

        } else {
            if (pathname === href) status = true;
        }

        setActive(status);
    }, [pathname]);

    return (
        <Link className={className + (isActive ? ` ${activeClassName}` : "")} href={href}>
            {children}
        </Link>
    );
}