'use client';

import Image from "next/image";

export default function ClientImage({
    src,
    alt,
    className,
    width,
    height,
    quality,
    sizes,
    priority = false
}: {
    src: string;
    alt: string;
    className: string;
    width: number;
    height: number;
    quality: number;
    sizes?: string;
    priority?: boolean;
}) {
    return (
        <Image
            src={src.trim()}
            alt={alt}
            className={className}
            width={width}
            height={height}
            sizes={sizes}
            quality={quality}
            priority={priority}
            onError={({currentTarget}) => currentTarget.remove()}
        />
    );
}