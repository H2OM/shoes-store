'use client';

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function setQueryParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [params, initiate] = useState(new URLSearchParams(searchParams.toString()));

    useEffect(() => {
        initiate(new URLSearchParams(searchParams.toString()));
    }, [searchParams.get]);

    const confirm = () => {
        return router.push(pathname + '?' + params.toString());
    }

    const set = (name: string, value: string) => {
        params.set(name, value);
    }
    const unset = (name: string) => {
        params.delete(name);
    }
    const get = (name: string): string | null => {
        return params.get(name);
    }

    return {set, unset, confirm, params, get};
}