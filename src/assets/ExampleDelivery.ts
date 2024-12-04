import { TDeliveryCreate, TDeliveryDB } from "@/entity/delivery.model";

export const exampleDelivery: TDeliveryDB = {
	id: "kosong",
	name: "kosong",
	phone: "kosong",
	address: "kosong",
	type: "kosong",
	price: 0,
	img: "kosong",
	desc: "kosong",
	created_at: new Date(),
	updated_at: new Date(),
	
}
export const exampleDeliveryCreate: TDeliveryCreate = {
	name: "kosong",
	phone: "kosong",
	address: "kosong",
	type: "kosong",
	price: 0,
	img: "kosong",
	desc: "kosong",
	
}
export const formTravel: Record<keyof TTravel, any> = {
	id: "1231",
	nama: "Nama Travel",
	hp: "No Hp perusahaan",
	lokasi: "Lokasi ",
	jenis: "Jenis Pengiriman",
	harga: "Kisaran Biaya Pengiriman",
	img: "Logo Travel",
	keterangan: "Keterangan "
}

export const defaultFormTravel: TTravel = {
	id: " ",
	nama: "Tahu Baxo Bu Pudji",
	hp: "08123456789",
	lokasi: "Ungaran",
	harga: 200_000,
	jenis: "Box",
	img: "img",
	keterangan: "biasa perjalanan jauh"
}

