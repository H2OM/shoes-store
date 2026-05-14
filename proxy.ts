import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function proxy(request: NextRequest) {
    const {pathname} = request.nextUrl;

    if (pathname === '/authorization') {
        return NextResponse.redirect(new URL('/authorization/sign-in', request.url));
    }
}

export const config = {
    matcher: '/authorization',
};