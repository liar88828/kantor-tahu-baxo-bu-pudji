import { TPOrderan } from '@/entity/server/produkOrderan';
import { TOrderanData } from '@/entity/orderan';

export type TOrderServer = {
  semuaProduct: TPOrderan[ ]
//waktu
  pesan: Date | string
  kirim: Date | string
  waktuKirim: Date | string

} & TOrderanData

