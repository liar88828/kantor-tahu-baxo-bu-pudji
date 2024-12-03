import { Transactions } from "@prisma/client";

export type TTransactionDB = Transactions
export type TTransactionCreate = Omit<Transactions, 'id' | "created_at" | "updated_at"|'id_order'>;
export type TTransactionUpdate = Omit<Transactions, "created_at" | "updated_at">;
