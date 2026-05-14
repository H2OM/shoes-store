export interface Product {
    id: number;
    title: string;
    brand: string;
    type: string;
    article: string;
    price: number;
    price_old: number;
    image: string;
    slider_images: string;
    size: string;
    hit: "1" | "0";
    description: string;
    category_id: number;
    category: string
    sale?: 1 | 0;
}

export interface ProductBasket extends Product {
    count: number;
}

export interface ProductDetails extends Product {
    color: string;
    colors: ProductColorVariations[];
}

export interface ProductColorVariations {
    id: number;
    article: string;
    category: string;
    image: string;
}
