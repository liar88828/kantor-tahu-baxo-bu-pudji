import { TProductCreate, TProductDB } from "@/entity/product.model";
import { TKPerson } from "@/entity/client/person";

export const exampleProduct: TProductCreate = {
	price: 0,
	img: "kosong",
	type: "kosong",
	qty: 0,
	desc: "kosong",
	location: "kosong",
	name: "kosong",
	
}
const productOne = {
	id: "Se/Or/TBSp/42",
	nama: "Tahu Bakso Special",
	harga: 50_000,
	lokasi: "Semarang",
	jenis: "Orderan",
	jumlah: 1,
	keterangan: "Pedas",
	img: "https://img.kurio.network/xAbHWPE-jbNSWEWyRoCLxJM6sac=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/21/09/06/2c552606-f62f-475d-81db-e9a57e963a3f.jpe"
}
export const defaultFormProduct: TProductDB = {
	id: "",
	name: "Tahu Baxo",
	price: 20000,
	location: "Ungaran",
	qty: 0,
	type: "Orderan",
	img: '',
	desc: "Pedas",
	created_at: new Date(),
	updated_at: new Date()
}

export const formProduct: TKPerson = {
	id: "1231",
	nama: "Nama Produk",
	harga: "Harga Produk",
	lokasi: "Lokasi Produk",
	jumlah: "Masukan Jumlah",
	jenis: "Jenis Produk",
	img: "Gambar Produk",
	keterangan: "Keterangan Produk"
}

