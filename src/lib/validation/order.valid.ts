import { z } from "zod";
import { TOrderCreate, TOrderUpdate } from "@/entity/order.model";

export const OrderCreate: z.ZodType<TOrderCreate> = z.object({
	
	pesan: z.coerce.date({ required_error: 'Pesan is required', }),
	kirim: z.coerce.date({ required_error: 'kirim is required', }),
	pengirim: z.string({ required_error: 'pengirim is required', }).min(1).max(100),
	hpPengirim: z.string({ required_error: 'hpPengirim is required', }).min(1).max(100),
	penerima: z.string({ required_error: 'penerima is required', }).min(1).max(100),
	alamatPenerima: z.string({ required_error: 'alamatPenerima is required', }).min(1).max(100),
	hpPenerima: z.string({ required_error: 'hpPenerima is required', }).min(1).max(100),
	guna: z.string({ required_error: 'guna is required', }).min(1).max(300),
	lokasi: z.string({ required_error: 'lokasi is required', }).min(1).max(100),
	namaPengiriman: z.string({ required_error: 'namaPengiriman is required', }).min(1).max(100),
	id: z.string({ required_error: 'ID is required', }).min(1).max(100).max(100),
	typePembayaran: z.string({ required_error: 'typePembayaran is required', }).min(1).max(100),
	status: z.string({ required_error: 'status is required', }).min(1).max(100),
	//
	ongkir: z.number({ required_error: ' ongkir is required', }).int().nonnegative(),
	totalBayar: z.number({ required_error: ' totalBayar is required', }).int().nonnegative(),
	totalPenjualan: z.number({ required_error: ' totalPenjualan is required', }).int().nonnegative(),
	id_transaction: z.string().uuid(),
	id_payment: z.string().uuid(),
	id_delivery: z.string().uuid(),
	
})

export const OrderUpdate: z.ZodType<TOrderUpdate> = z.object({
	id: z.string({ required_error: 'Id is required', }).min(1).max(100),
	pesan: z.coerce.date({ required_error: 'Pesan is required', }),
	kirim: z.coerce.date({ required_error: 'kirim is required', }),
	pengirim: z.string({ required_error: 'pengirim is required', }).min(1).max(100),
	hpPengirim: z.string({ required_error: 'hpPengirim is required', }).min(1).max(100),
	penerima: z.string({ required_error: 'penerima is required', }).min(1).max(100),
	alamatPenerima: z.string({ required_error: 'alamatPenerima is required', }).min(1).max(100),
	hpPenerima: z.string({ required_error: 'hpPenerima is required', }).min(1).max(100),
	guna: z.string({ required_error: 'guna is required', }).min(1).max(300),
	lokasi: z.string({ required_error: 'lokasi is required', }).min(1).max(100),
	namaPengiriman: z.string({ required_error: 'namaPengiriman is required', }).min(1).max(100),
	typePembayaran: z.string({ required_error: 'typePembayaran is required', }).min(1).max(100),
	status: z.string({ required_error: 'status is required', }).min(1).max(100),
	ongkir: z.number({ required_error: ' ongkir is required', }).int().nonnegative(),
	totalBayar: z.number({ required_error: ' totalBayar is required', }).int().nonnegative(),
	totalPenjualan: z.number({ required_error: ' totalPenjualan is required', }).int().nonnegative(),
	id_transaction: z.string().uuid(),
	id_payment: z.string().uuid(),
	id_delivery: z.string().uuid(),
})
