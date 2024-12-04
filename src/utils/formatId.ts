import { TOrder, } from '@/entity/client/orderan';
import { TProductDB } from "@/entity/product.model";
import { TDeliveryDB } from "@/entity/delivery.model";
import { TPaymentDB } from "@/entity/payment.model";
import { ToModel } from "@/interface/Utils";

// Travel
export const setIdDelivery = (dTravel: TDeliveryDB): string =>
  dTravel.name.slice(0, 2) + "_" +
  dTravel.phone.toString().slice(0, 2) + "_" +
  dTravel.address.slice(0, 2) + "_" +
  dTravel.type.slice(0, 2) + "_" +
  dTravel.desc.slice(0, 2) + "_" + Date.now();

// product
export const setIdProduct = (dProduct: TProductDB): string =>
  dProduct.name.slice(0, 2) + "_" +
  dProduct.price.toString().slice(0, 2) + "_" +
  dProduct.location.slice(0, 2) + "_" +
  dProduct.type.slice(0, 2) + "_" +
  dProduct.desc.slice(0, 2) + "_" + Date.now();

// product
export const setIdBank = (dBank: TPaymentDB): string =>
  dBank.name.slice(0, 2) + "_" +
  dBank.accounting.toString().slice(0, 2) + "_" +
  dBank.phone.toString().slice(0, 2) + "_" +
  dBank.address.slice(0, 2) + "_" +
  dBank.type.slice(0, 2) + "_" +
  dBank.desc.slice(0, 2) + "_" + Date.now();

// Orderan
function setIdOrderanString(
  dataBaru: {
    semuaProduct: TProductDB[]
  } & TOrder | TOrderServer ) {
  function getNumbers( hpPenerima: string, hpPengirim: string, penerima: string ) {
    return hpPenerima + hpPengirim + penerima.length;
  }

  return dataBaru.penerima.slice( 0, 5 )
    + "_" +
    dataBaru.alamatPenerima.toString().slice( 0, 4 )
    + "_" +
    dataBaru.pesan.toString().slice( 2, 4 ) +
    dataBaru.pesan.toString().slice( 5, 7 ) +
    dataBaru.pesan.toString().slice( 8, 10 )
    + "_" +
    dataBaru.lokasi.toString().slice( 0, 3 )
    + "_" +
    getNumbers(
      dataBaru.hpPenerima,
      dataBaru.hpPengirim,
      dataBaru.penerima
    ).toString().slice( 0, 5 );
}

export const setIdOrderan = ( dataBaru: TOrder | TOrderServer ): string =>
  setIdOrderanString( dataBaru ).replaceAll( " ", "_" )

export function setIdModel( to: ToModel, data: any ) {
  console.log( "gateway/setIdModel" )
  if (to === "payment") {
    return setIdBank( data );
  }
  if( to === "product" ) {
    return setIdProduct( data );
  }
  if (to === "delivery") {
    return setIdDelivery(data);
  }
  if( to === "orderan" ) {
    console.log( data )
    return setIdOrderan( data );
  }
  // if( to === "semuaProduk" ) {
  //   console.log( data )
  //   return setIdProduct( data );
  // }
}

