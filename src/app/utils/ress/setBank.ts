import { sendData } from '@/app/utils/ress/SendApi';
import { ToModel } from '@/entity/Utils';
import { TPaymentCreate } from "@/entity/payment.model";

export async function getId( to: ToModel, id: string ) {
  if (to === "payment") {
    const { data }: { data: TPaymentCreate } = await sendData(to, "GET", id);
    return setBank( data )
  }
  return "require"
}

export function setBank(d: TPaymentCreate) {
  return {
    name: d.name,
    type: d.type,
    address: d.address,
    desc: d.desc,
    // id        : d.id,
    accounting: d.accounting,
    phone: d.phone
  };
}