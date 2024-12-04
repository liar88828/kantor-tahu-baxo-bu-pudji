import { TPaymentCreate, TPaymentDB } from "@/entity/payment.model";

export const examplePayment: TPaymentCreate = {
	// id        : "kosong",
	type: "kosong",
	address: "kosong",
	desc: "kosong",
	accounting: "kosong",
	phone: "kosong",
	img: "kosong",
	name: "kosong",
}
export const formBank: Record<keyof TPaymentDB, any> = {
	phone: "No Telephone Perusahaan",
	name: "Nama Bank",
	accounting: "No Rekening",
	id: "123_bank",
	address: "Lokasi Bank",
	type: "Jenis Bank",
	desc: "Keterangan",
	img: "URL Gambar Logo perusahaan ",
	created_at: new Date(),
	updated_at: new Date(),
}

export const defaultFormBank: TPaymentDB = {
	phone: "0987654321",
	name: "Mandiri",
	accounting: "0987 12123 121 1312",
	id: " ",
	address: "Ungaran",
	type: "Kredit",
	desc: "Bisa Di cicil",
	img: "https://dummyimage.com/200x200/000/fff.jpg&text=not+found",
	created_at: new Date(),
	updated_at: new Date(),
}
// https://dummyimage.com/200x200/000/fff.jpg&text=not+found
