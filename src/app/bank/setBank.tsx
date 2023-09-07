import { sendData } from '@/app/utils/ress/SendApi';
import { ToModel } from '@/app/utils/ress/GateWay';

export async function getId( to: ToModel, id: string ) {
  if( to === "bank" ) {
    const { data: d }: { data: TBank, } = await sendData( to, "GET", id );
    return setBank( d )
  }
}

export async function setBank( d: TBank ) {
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