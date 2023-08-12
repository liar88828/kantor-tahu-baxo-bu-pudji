import type { TYPE } from '@/server/models/dataAccess/Produk';
import { newError }               from '@/server/exeption/errorHandler';
import { SafeParseReturnType, z } from "zod";

const create   = ( z: z.SafeParseReturnType<TYPE, TYPE>, data: TYPE ) => {
  if( !z.success ) {
    const error = z.error.message
    throw new newError( `Invalid Value ${ error }` )
  }
  else {
    return data
  }
}
const findById = (
  z: SafeParseReturnType<string, string>,
  id: string
) => {
  if( !z.success ) {
    const error = z.error.message
    throw new newError( `Invalid Id ${ error }` )
  }
  else {
    return id
  }
}
const Service  = { create, findById }
export default Service