import { TProOrderan } from '@/entity/server/produkOrderan';
import { TOrderanData } from '@/entity/Orderan';

type TOrderServer = {
  semuaProduct: TProOrderan[ ]
//waktu
  pesan: Date | string
  kirim: Date | string
  waktuKirim: Date | string

} & TOrderanData

