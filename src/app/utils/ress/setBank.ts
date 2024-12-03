import { sendData } from '@/app/utils/ress/SendApi';
import { ToModel } from '@/entity/Utils';
import { TPaymentUpdate } from "@/entity/Bank.model";

export async function getId( to: ToModel, id: string ) {
  if( to === "bank" ) {
    const { data }: { data: TPaymentUpdate } = await sendData(to, "GET", id);
    return setBank( data )
  }
  return "require"
}

export function setBank(d: TPaymentUpdate) {
  return {
    nama      : d.nama,
    jenis     : d.jenis,
    lokasi    : d.lokasi,
    keterangan: d.keterangan,
    id        : d.id,
    no        : d.no,
    hp        : d.hp
  };
}