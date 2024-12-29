import { z } from "zod";
import { TProductCreate } from "@/interface/entity/product.model";
import { TUserCreate } from "@/interface/entity/user.model";

export const UserCreate: z.ZodType<TUserCreate> = z.object({
	name: z.string().min(1).max(100),
	phone: z.string().min(1).max(100),
	address: z.string().min(1).max(100),
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
