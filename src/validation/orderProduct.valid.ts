import { z } from "zod"
import {
	TOrderProductCount,
	TOrderProductCreate,
	TOrderProductCreateTransaction,
	TOrderProductUpdate
} from "@/entity/transaction.model"

export const OrderProductTransaction: z.ZodType<TOrderProductCreateTransaction[]> = z.array(
	z.object({
		// id_order: z.string().min(1).max(100).max(100),
		id_product: z.string().min(1).max(100),
		id_user: z.string().min(1).max(100),

	})
)

export const OrderProductUpdate: z.ZodType<TOrderProductUpdate> = z.object({
	id_product: z.string().min(1).max(100),
	qty: z.number().min(1).max(100),
})
export const OrderProductCreate: z.ZodType<TOrderProductCreate> = z.object({
	id_product: z.string().min(1).max(100),
	id_user: z.string().min(1).max(100),
	qty: z.number().positive(),

})

export const OrderProductCount: z.ZodType<TOrderProductCount> = z.object({
		id_product: z.string().min(1).max(100),
	})

// export  const TransactionUpdate: z.ZodType<TTransactionUpdate> = z.object({
// 	id: z.string({ required_error: 'Id is required', }).min(1).max(100),
// 	id_order: z.string({ required_error: 'ID is required', }).min(1).max(100).max(100),
// 	id_product: z.string({ required_error: 'ID is required', }).min(1).max(100).max(100),
//
// })
