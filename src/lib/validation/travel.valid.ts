import { z } from "zod";
import { TDeliveryCreate, TDeliveryUpdate } from "@/entity/travel.model";


export const TravelCreate: z.ZodType<TDeliveryCreate> = z.object({
	nama: z.string({ required_error: 'Nama is required', }).min(1).max(100),
	hp: z.string({ required_error: 'Hp is required', }).min(1).max(100),
	lokasi: z.string({ required_error: 'Lokasi is required', }).min(1).max(100),
	jenis: z.string({ required_error: 'Jenis is required', }).min(1).max(100),
	img: z.string({ required_error: 'Img is required', }).min(1).max(300),
	keterangan: z.string({ required_error: 'Keterangan is required', }).min(1),
	harga: z.number({ required_error: 'Harga is required', }).int().nonnegative(),
})

export  const TravelUpdate: z.ZodType<TDeliveryUpdate> = z.object({
	id: z.string({ required_error: 'Id is required', }).min(1).max(100),
	nama: z.string({ required_error: 'Nama is required', }).min(1).max(100),
	hp: z.string({ required_error: 'Hp is required', }).min(1).max(100),
	lokasi: z.string({ required_error: 'Lokasi is required', }).min(1).max(100),
	jenis: z.string({ required_error: 'Jenis is required', }).min(1).max(100),
	img: z.string({ required_error: 'Img is required', }).min(1).max(300),
	keterangan: z.string({ required_error: 'Keterangan is required', }).min(1),
	harga: z.number({ required_error: 'Harga is required', }).int().nonnegative(),
})
