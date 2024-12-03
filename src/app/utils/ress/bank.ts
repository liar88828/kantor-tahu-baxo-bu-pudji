"use server"

import { sendData } from '@/app/utils/ress/SendApi';
import { TPaymentDB } from "@/entity/Bank.model";

function setBank(d: TPaymentDB) {
  return {
    nama      : d.nama,
    jenis     : d.jenis,
    lokasi    : d.lokasi,
    keterangan: d.keterangan,
    id        : d.id,
    img: d.img,
    no        : d.no,
    hp        : d.hp
  };
}

export async function getDataById(id: string) {
  const to                            = "bank"
  const { data: d }: { data: TPaymentDB, } = await sendData(to, "GET", id);
  return setBank( d )
}

