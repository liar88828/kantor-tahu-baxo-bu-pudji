import { sendData } from '@/app/utils/ress/SendApi';
import { ToModel } from '@/entity/Utils';

export async function getId( to: ToModel, id: string ) {
  if( to === "bank" ) {
    const { data }: { data: TBank } = await sendData( to, "GET", id );
    return setBank( data )
  }
}

export function setBank( d: TBank ) {
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