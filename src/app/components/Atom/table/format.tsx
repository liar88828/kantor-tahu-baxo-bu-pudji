import { Rupiah } from '@/lib/utils/rupiah';
import React from 'react';
import { TOrder } from '@/interface/orderan';

export const getListData = (
  d: TOrder,
  jenis: "Item" | "Orderan",
  option: "nama" | "harga" | "jumlah"
) => {
  const filterData = d.semuaProduct.filter((d) => d.jenis.replaceAll(" ", "") === jenis)

  if (option === "nama") {
    return filterData.map((m: TProduct, i: number) => (
      <p key={m.nama} className={"whitespace-nowrap"}>{i + 1}. {m.nama}, </p>))
  }
  else if (option === "harga") {
    return filterData.map((m: TProduct) => (<p key={m.harga}>{Rupiah(m.harga)}</p>))
  }
  else if (option === "jumlah") {
    return filterData.map((m: TProduct) => (<p key={m.jumlah}>{m.jumlah}</p>))
  }
}
