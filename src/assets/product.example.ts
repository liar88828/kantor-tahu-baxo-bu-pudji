import { TProductDB } from "@/entity/product.model";

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
	nama: "Tahu Baxo",
	harga: 20000,
	lokasi: "Ungaran",
	jumlah: 0,
	jenis: "Orderan",
	img: '',
	keterangan: "Pedas",
	created_at: new Date(),
	updated_at: new Date()
}

