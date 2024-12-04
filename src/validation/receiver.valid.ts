import {z} from "zod"
import {Receiver} from "@prisma/client"

export type TReceiverDB = Receiver
export type TReceiverCreate = Omit<Receiver, "id">
export const ReceiverCreate: z.ZodType<TReceiverCreate> = z.object({
	// id: z.string().uuid(),
	name: z.string({required_error: "name is required"}).min(1).max(100),
	address: z.string({required_error: "address is required"}).min(1).max(100),
	phone: z.string({required_error: "phone is required"}).min(1).max(100),
})

