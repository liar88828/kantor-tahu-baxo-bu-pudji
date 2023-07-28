import { z }        from "zod";
import { newError } from '@/server/exeption/errorHandler';
import { TTravel }  from '@/entity/travel';

const ZSchemaTravel: z.ZodType<TTravel> = z.object( {
  id            : z.string(),
  namaPengiriman: z.string().min( 1 ),
  noHpPerusahaan: z.string().min( 1 ),
  lokasi        : z.string().min( 1 ),
  jenis         : z.string(),
  harga         : z.number().int().positive(),
  img           : z.string(),
  keterangan    : z.string(),
} )
const ZValid                            = ZSchemaTravel
const ZFindById: z.ZodType<string>      = z.string()

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
  if( !response.success ) {
    throw new newError( "Error Invalid Value", "Invalid Id" )
  }
  else {
    return id
  }
}
const Service  = { create, findById }
export default Service