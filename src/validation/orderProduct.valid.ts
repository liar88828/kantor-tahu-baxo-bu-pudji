import { z } from "zod"
import { TOrderTrolleyTransaction, TTrolleyCount, TTrolleyCreate, TTrolleyUpdate } from "@/interface/entity/trolley.model";

export const OrderProductTransaction: z.ZodType<TOrderTrolleyTransaction[]> = z.array(
	z.object({
		// id_order: z.string().min(1).max(100).max(100),
		id_product: z.string().min(1).max(100),
		id_user: z.string().min(1).max(100),
		qty_at_buy: z.number(),
		price_at_buy: z.number(),
	})
)

export const OrderProductUpdate: z.ZodType<TTrolleyUpdate> = z.object({
	id_product: z.string().min(1).max(100),
	qty_at_buy: z.number().positive(),
	price_at_buy: z.number().positive(),
})
export const OrderProductCreate: z.ZodType<TTrolleyCreate> = z.object({
	id_product: z.string().min(1).max(100),
	id_user: z.string().min(1).max(100),
	qty_at_buy: z.number(),
	price_at_buy: z.number(),


})

export const OrderProductCount: z.ZodType<TTrolleyCount> = z.object({
		id_product: z.string().min(1).max(100),
	})

// export  const TransactionUpdate: z.ZodType<TTransactionUpdate> = z.object({
// 	id: z.string({ required_error: 'Id is required', }).min(1).max(100),
// 	id_order: z.string({ required_error: 'ID is required', }).min(1).max(100).max(100),
// 	id_product: z.string({ required_error: 'ID is required', }).min(1).max(100).max(100),
//
// })
