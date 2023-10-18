import { Fetch } from '@/lib/utils/ress/SendApi';
import { ToModel } from '@/entity/Utils';

export async function getId( to: ToModel, id: string ) {
  if( to === "bank" ) {
    const { data }: { data: TBank } = await Fetch( to, "GET", id );
    return setBank( data )
  }
  return "require"
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