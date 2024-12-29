import { z } from "zod"
import {
    TOrderTrolleyTransaction,
    TTrolleyCount,
    TTrolleyCreate,
    TTrolleyUpdate
} from "@/interface/entity/trolley.model";

import { zodInt } from "@/validation/zod.valid";

export const OrderProductTransaction: z.ZodType<TOrderTrolleyTransaction[]> = z.array(
	z.object({
        id: z.string(),
        id_product: z.string().min(1).max(100),
        id_user: z.string().min(1).max(100),
        price_at_buy: zodInt,
        qty_at_buy: zodInt,
    })
)

export const OrderProductUpdate: z.ZodType<TTrolleyUpdate> = z.object({
    id_product: z.string().min(1).max(100),
    price_at_buy: zodInt,
    qty_at_buy: zodInt,
})
export const OrderProductCreate: z.ZodType<TTrolleyCreate> = z.object({
    id_product: z.string().min(1).max(100),
    id_user: z.string().min(1).max(100),
    price_at_buy: zodInt,
    qty_at_buy: zodInt,
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
