"use server"

import { TPaymentDB } from "@/entity/payment.model";

function setBank(d: TPaymentDB) {
  return {
    name: d.name,
    type: d.type,
    address: d.address,
    desc: d.desc,
    id: d.id,
    img: d.img,
    accounting: d.accounting,
    phone: d.phone
  };
}

// export async function getDataById(id: string) {
//   const to  = "bank"
//   const { data: d }: { data: TPaymentDB, } = await sendData(to, "GET", id);
//   return setBank( d )
// }
//
