import { Products } from "@prisma/client";

export type TProductDB = Products
export type TProductCreate = Omit<Products, 'id' | "created_at" | "updated_at">;
export type ProductSearch = { location?: string, type?: string, name?: string };

// export type TProductUpdate = Omit<Products, "created_at" | "updated_at">;
