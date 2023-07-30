import { newError }               from '@/server/exeption/errorHandler';
import { SafeParseReturnType, z } from "zod";
import { TOrderServer as TYPE }   from '@/entity/server/orderan';

const create   = ( z: z.SafeParseReturnType<TYPE, TYPE>, data: TYPE ) => {
  // console.log(z)

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