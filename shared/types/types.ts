export interface Product {
    product_code: string;
    productName: string;
    product_url_image: string;
    price: number;
}


export interface ProductDetail {
    id: number | string;
    product_code: string;
    product_name: string;
    product_url_image: string;
    product_description: string;
    product_price: number;
    category_id: number | null;
    product_stock?: number;
}

export interface Category {
    id: string;
    category_name: string;
}
