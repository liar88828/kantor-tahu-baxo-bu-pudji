import { TYPE }                   from '@/server/models/dataAccess/Produk';
import { newError }               from '@/server/exeption/errorHandler';
import { SafeParseReturnType, z } from "zod";

const create   = ( z: z.SafeParseReturnType<TYPE, TYPE>, data: TYPE ) => {
  if( !z.success ) {
    throw new newError( "Error Invalid Value", "Invalid Value" )
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
    throw new newError( "Error Invalid Value", "Invalid Id" )
  }
  else {
    return id
  }
}
const Service  = { create, findById }
export default Service