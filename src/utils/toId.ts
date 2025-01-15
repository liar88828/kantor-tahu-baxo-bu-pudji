import { TProductDB } from "@/interface/entity/product.model";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { TPaymentDB } from "@/interface/entity/payment.model";
import { ToModel } from "@/interface/Utils";

// Travel
export const setIdDelivery = (data: TDeliveryDB): string =>
    data.name.slice(0, 2) + "_" +
    data.phone.toString().slice(0, 2) + "_" +
    data.address.slice(0, 2) + "_" +
    data.type.slice(0, 2) + "_" +
    data.desc.slice(0, 2) + "_" +
    Date.now();

// product
export const setIdProduct = (data: TProductDB): string =>
    data.name.slice(0, 2) + "_" +
    data.price.toString().slice(0, 2) + "_" +
    data.location.slice(0, 2) + "_" +
    data.type.slice(0, 2) + "_" +
    data.desc.slice(0, 2) + "_" +
    Date.now();

// bank
export const setIdBank = (data: TPaymentDB): string =>
    data.name.slice(0, 2) + "_" +
    data.accounting.toString().slice(0, 2) + "_" +
    data.phone.toString().slice(0, 2) + "_" +
    data.address.slice(0, 2) + "_" +
    data.type.slice(0, 2) + "_" +
    data.desc.slice(0, 2) + "_" +
    Date.now();

// Orderan
function setIdOrderanString(
	dataBaru: {
        [x: string]: any;
		semuaProduct: TProductDB[]
    }) {
	function getNumbers(hpPenerima: string, hpPengirim: string, penerima: string) {
		return hpPenerima + hpPengirim + penerima.length;
	}

	return dataBaru.penerima.slice(0, 5)
		+ "_" +
		dataBaru.alamatPenerima.toString().slice(0, 4)
		+ "_" +
		dataBaru.pesan.toString().slice(2, 4) +
		dataBaru.pesan.toString().slice(5, 7) +
		dataBaru.pesan.toString().slice(8, 10)
		+ "_" +
		dataBaru.lokasi.toString().slice(0, 3)
		+ "_" +
		getNumbers(
			dataBaru.hpPenerima,
			dataBaru.hpPengirim,
			dataBaru.penerima
		).toString().slice(0, 5);
}

export const setIdOrderan = (dataBaru: { [x: string]: any; semuaProduct: TProductDB[]; }): string =>
	setIdOrderanString(dataBaru).replaceAll(" ", "_")

export function setIdModel(to: ToModel, data: any) {
	console.log("gateway/setIdModel")
	if (to === "payment") {
		if (to === "payment") {
			return setIdBank(data);
		}
		if (to === "product") {
			return setIdProduct(data);
		}
		if (to === "delivery") {
			return setIdDelivery(data);
		}
		if (to === "orderan") {
            // console.log(data)
			return setIdOrderan(data);
		}
		// if( to === "semuaProduk" ) {
		//   console.log( data )
		//   return setIdProduct( data );
		// }
	}
}

