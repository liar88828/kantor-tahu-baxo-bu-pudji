import { z } from "zod";
import { TTransactionCreate, TTransactionUpdate } from "@/entity/transaction.model";


export  const TransactionCreate: z.ZodType<TTransactionCreate> = z.object({
	id_order: z.string({ required_error: 'ID is required', }).min(1).max(100).max(100),
	id_product: z.string({ required_error: 'ID is required', }).min(1).max(100).max(100),
	
})

export  const TransactionUpdate: z.ZodType<TTransactionUpdate> = z.object({
	id: z.string({ required_error: 'Id is required', }).min(1).max(100),
	id_order: z.string({ required_error: 'ID is required', }).min(1).max(100).max(100),
	id_product: z.string({ required_error: 'ID is required', }).min(1).max(100).max(100),
	
})
