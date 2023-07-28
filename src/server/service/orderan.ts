import { z }             from "zod";
import { newError }      from '@/server/exeption/errorHandler';
import { TOrderServer }  from '@/entity/server/orderan';
import { ZSchemaProduk } from '@/server/service/produk';

const ZSchemaOrderan: z.ZodType<TOrderServer> = z.object( {
  pesan     : z.string(),
  kirim     : z.string(),
  waktuKirim: z.string(),
  // data orang
  pengirim      : z.string(),
  hpPengirim    : z.string(),
  penerima      : z.string(),
  alamatPenerima: z.string(),
  hpPenerima    : z.string(),
  guna          : z.string(),
  lokasi        : z.string(),
  namaPengiriman: z.string(),
  ekspedisi     : z.string(),
  ongkir        : z.number().int().positive(),
  id            : z.string(),
  no            : z.string(),
  typePembayaran: z.string(),
  total         : z.number().int().positive(),
  totalBayar    : z.number().int().positive(),
  totalPenjualan: z.number().int().positive(),
  status        : z.string(),
  //total
  semuaHargaOrderan: z.number().int().positive(),
  semuaHargaItem   : z.number().int().positive(),
  semuaHargaProduct: z.number().int().positive(),
  totalHarga       : z.number().int().positive(),
  semuaProduct     : z.array( ZSchemaProduk )

} )
const ZValid                                  = ZSchemaOrderan
const ZFindById: z.ZodType<string>            = z.string()

export type zOrderanType = z.infer<typeof ZValid>
export type zOrderanError = z.ZodIssue[]

const create   = ( data: zOrderanType ) => {
  const response = ZValid.safeParse( data )
  if( !response.success ) {
    throw new newError( "Error Invalid Value", "Invalid Value" )
  }
  else {
    return data
  }
}
const findById = ( id: string ) => {
  const response = ZFindById.safeParse( id )
  console.log( response )
  if( !response.success ) {
    throw new newError( "Error Invalid Value", "Invalid Id" )
  }
  else {
    return id
  }
}
const Service  = { create, findById }
export default Service