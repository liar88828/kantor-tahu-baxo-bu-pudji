import { Receivers } from "@prisma/client";

export type TReceiverDB = Receivers
export type TReceiverCreate = Omit<TReceiverDB, 'id' | "created_at" | "updated_at">;
export type ReceiverSearch = { name?: string, phone?: string, address?: string, };

// export type TProductUpdate = Omit<Products, "created_at" | "updated_at">;
