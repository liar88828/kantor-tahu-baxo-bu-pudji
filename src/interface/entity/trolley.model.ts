import { TProductDB } from "@/interface/entity/product.model";
import { Trolleys } from "@prisma/client";

export type TTrolleyDB = Trolleys

export type TTrolleyCreate = Omit<
	TTrolleyDB,
	"id" | "id_order"
>

export type TTrolleyUpdate = Omit<
	TTrolleyDB,
	"id" | "id_order" | "id_user"
>

export type TTrolleyCount = Omit<
	TTrolleyDB,
	"id" | "id_order" | "id_user" | 'qty_at_buy' | 'price_at_buy'
>

export type TrolleyId = Pick<TTrolleyDB, "id">

export type TOrderTrolleyTransaction = Omit<
	TTrolleyDB,
	"id" | "id_order"
>
export type TTrolleyProductDB = (TTrolleyDB & { Product: TProductDB })
export type TTrolleyProductUser = (TTrolleyCreate & { Product: TProductDB })