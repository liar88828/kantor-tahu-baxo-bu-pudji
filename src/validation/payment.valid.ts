import { z } from "zod"
import { TPaymentCreate } from "@/interface/entity/payment.model"

export const PaymentCreate: z.ZodType<TPaymentCreate> = z.object({
  // id: z.string().uuid().optional(),
  phone: z.string().min(2).max(30),
  img: z.string().min(2).max(200),
  accounting: z.string().min(2).max(30),
  name: z.string().min(2).max(30),
  address: z.string().min(2).max(30),
  type: z.string().min(2).max(30),
  desc: z.string().min(2).max(300),
})

// export const BankUpdate: z.ZodType<TPaymentUpdate> = z.object({
// 	id: z.string({ required_error: 'ID is required', }).min(1).max(100),
// 	hp: z.string({ required_error: 'Hp is required', }).min(2).max(30),
// 	img: z.string({ required_error: 'Hp is required', }).min(2).max(200),
// 	no: z.string({ required_error: 'No is required', }).min(2).max(30),
// 	nama: z.string({ required_error: 'nama is required', }).min(2).max(30),
// 	lokasi: z.string({ required_error: 'Lokasi is required', }).min(2).max(30),
// 	jenis: z.string({ required_error: 'Jenis is required', }).min(2).max(30),
// 	keterangan: z.string({ required_error: 'Keterangan is required', }).min(2).max(300),
// })
