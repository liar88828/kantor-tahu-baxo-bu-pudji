import { TOrderCreate } from "@/entity/order.model";
import { TOrderProductCreate } from "@/entity/transaction.model";
import { Receiver } from "@prisma/client";
import type { TOrder } from "@/entity/client/orderan";
import { defaultDate, getTime } from "@/lib/utils/formatDate";

export const exampleOrderCreate: TOrderCreate = {
	nameCs: "John Doe",
	sendTime: new Date("2024-12-05T10:00:00Z"), // ISO 8601 formatted date
	orderTime: new Date("2024-12-04T15:30:00Z"),
	desc: "Order of electronics including headphones and chargers.",
	address: "123 Main St, Springfield, USA",
	// travel
	id_delivery: "550e8400-e29b-41d4-a716-446655440000", // UUID format
	nameDelivery: "Express Logistics",
	phoneDelivery: "+1234567890",
	priceDelivery: 4999, // Example price in cents (4999 cents = 49.99 currency units)
	// payment
	id_payment: "660e8400-e29b-41d4-a716-556655440111", // UUID format
	totalPayment: 10499, // Total payment amount (e.g., in cents)
	totalAll: 15498, // Sum of total payment and delivery price
	//
	status: "Pending", // Example status
	// id_receiver: "770e8400-e29b-41d4-a716-666655440222", // UUID format
};

export const exampleOrderProductCreate: TOrderProductCreate[] = [
	{
		id_product: "prod-001",
	},
	{
		id_product: "prod-002",
	},
	{
		id_product: "prod-003",
	},
];
export const exampleReceiver: Receiver = {
	id: "123e4567-e89b-12d3-a456-426614174000", // Valid UUID
	name: "Alice Johnson",
	address: "456 Elm Street, Springfield, USA",
	phone: "+19876543210", // Valid phone string
};

export const defaultValues: TOrder = {
	//data orang
	pengirim: 'Kantor Tahu Baxo',
	hpPengirim: '0123456789',
	penerima: '',
	alamatPenerima: '',
	hpPenerima: '',
	// waktu
	pesan: defaultDate(),
	kirim: defaultDate(),
	waktuKirim: getTime(),
	// product
	listOrderan: [],
	listItem: [],
	semuaProduct: [],
	//keterangan
	// guna  : "Untuk apa ??",
	lokasi: "Semarang",
	//travel
	namaPengiriman: "Kantor Tahu Baxo ",
	ongkir: 0,
	//transaksi
	id: "",
	typePembayaran: "CASH",
	totalBayar: 0,
	totalPenjualan: 0,
	status: 'Di terima',
	guna: ""
	
}
