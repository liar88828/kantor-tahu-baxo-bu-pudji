import { z } from "zod";
import { TProductCreate, UpdateStock } from "@/interface/entity/product.model";

export const ProductCreate: z.ZodType<TProductCreate> = z.object({
	location: z.string().min(1).max(100),
	name: z.string().min(1).max(100),
	price: z.number().int().nonnegative(),
	img: z.string().min(1).max(100),
	type: z.string().min(1).max(100),
	qty: z.number().int().nonnegative(),
	desc: z.string().min(1).max(200),
})

export const ProductUpdateStock: z.ZodType<UpdateStock> = z.object({
    id: z.string(),
    qty: z.number()
})


// export const ProductUpdate: z.ZodType<TProductUpdate> = z.object({
// 	id: z.string({ required_error: 'ID is required', }).min(1).max(100),
// 	lokasi: z.string({ required_error: 'Lokasi is required', }).min(1).max(100),
// 	nama: z.string({ required_error: 'Nama is required', }).min(1).max(100),
// 	harga: z.number({ required_error: 'Harga is required', }).int().nonnegative(),
// 	img: z.string({ required_error: 'Img is required', }).min(1).max(100),
// 	jenis: z.string({ required_error: 'Jenis is required', }).min(1).max(100),
// 	jumlah: z.number({ required_error: 'Jumlah is required', }).int().nonnegative(),
// 	keterangan: z.string({ required_error: 'Keterangan is required', }).min(1).max(200),
// })
