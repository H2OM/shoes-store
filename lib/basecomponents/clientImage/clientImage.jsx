'use client';

import Image from "next/image";

export default function ClientImage ({src, alt, className, width, height, quality, sizes = null, priority = false}) {
    return (
        <Image
            src={src}
            alt={alt}
            className={className}
            width={width}
            height={height}
            sizes={sizes}
            quality={quality}
            priority={priority}
            onError={({target})=>target.remove()}
        />
    )
}