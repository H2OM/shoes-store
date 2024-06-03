'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientLink({activeRoutes = [], className, activeClassName, href, children}) {
    const pathname = usePathname();
    const [isActive, setActive] = useState(false);
    useEffect(()=>{
        setActive(false);
        if(activeRoutes.length !== 0) {
            activeRoutes.map((route) => {
                if(pathname == route) setActive(true);
            });
        } else {
            if(pathname == href) setActive(true);
        }
    }, [pathname]);
    return (
        <Link className={className + (isActive ? activeClassName : "")}  href={href}>
            {children}
        </Link>
    )

}