import { z } from "zod";
import { TPProduk } from '@/server/repository/interface/prisma';
import { newError } from '@/server/exeption/errorHandler';

export const ZSchemaProduk: z.ZodType<TPProduk> = z.object( {
  id        : z.string(),
  nama      : z.string().min( 1 ),
  harga     : z.number().int().positive(),
  lokasi    : z.string().min( 1 ),
  jumlah    : z.number().int().positive(),
  img       : z.string(),
  keterangan: z.string(),
  jenis     : z.string(),
  // jenis: z.enum(["Orderan","Item"]),
} )
const ZValid                                    = ZSchemaProduk
const ZFindById: z.ZodType<string>              = z.string()

export
type zProdukType = z.infer<typeof ZValid>
export type zProdukError = z.ZodIssue[]

const create   = ( data: zProdukType ) => {
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