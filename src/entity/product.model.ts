import { Products } from "@prisma/client";

export type TProductDB = Products
export type TProductCreate = Omit<Products, 'id' | "created_at" | "updated_at">;
export type TProductUpdate = Omit<Products, "created_at" | "updated_at">;
