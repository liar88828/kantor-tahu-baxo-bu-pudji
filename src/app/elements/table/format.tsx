import { TOrder } from '@/entity/client/orderan';
import { Rupiah } from '@/lib/utils/rupiah';
import React from 'react';
import { TProductDB } from "@/entity/product.model";

export const getListData = (
  d: TOrder,
  jenis: "Item" | "Orderan",
  option: "nama" | "harga" | "jumlah"
) => {
  const filterData = d.semuaProduct.filter( ( d ) => d.jenis.replaceAll( " ", "" ) === jenis )

  if( option === "nama" ) {
    return filterData.map( ( m: TProductDB, i: number ) => (
      <p key={ m.name } className={ "whitespace-nowrap" }>{ i + 1 }. { m.name }, </p>))
  }
  else if( option === "harga" ) {
    return filterData.map((m: TProductDB) => (<p key={ m.price }>{ Rupiah(m.price) }</p>))
  }
  else if( option === "jumlah" ) {
    return filterData.map((m: TProductDB) => (<p key={ m.qty }>{ m.qty }</p>))
  }
}
