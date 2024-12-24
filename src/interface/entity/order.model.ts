import { Orders } from "@prisma/client";

export type TOrderDB = Orders
export type TOrderCreate = Omit<Orders, 'id' | "created_at" | "updated_at">;
export type TOrderUpdate = Omit<Orders, "created_at" | "updated_at">;
