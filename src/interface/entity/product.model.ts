import { Products } from "@prisma/client";
import { PRODUCT_FILTER_PRICE } from "@/store/product";

export type TProductDB = Products
export type TProductCreate = Omit<Products, 'id' | "created_at" | "updated_at" | 'sold' | 'update_stock'>;
export type ProductSearch = {
    location?: string,
    type?: string,
    name?: string,
    price?: PRODUCT_FILTER_PRICE,
    // related?:boolean,
    popular?: boolean,
    new?: boolean,

};

// export type TProductUpdate = Omit<Products, "created_at" | "updated_at">;
