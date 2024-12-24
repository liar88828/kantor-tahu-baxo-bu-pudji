import { z } from "zod"
import { TReceiverCreate } from "@/interface/entity/receiver.model";

export const ReceiverCreate: z.ZodType<TReceiverCreate> = z.object({
    id: z.string().optional(),
	name: z.string({required_error: "name is required"}).min(1).max(100),
	address: z.string({required_error: "address is required"}).min(1).max(100),
	phone: z.string({required_error: "phone is required"}).min(1).max(100),
})

