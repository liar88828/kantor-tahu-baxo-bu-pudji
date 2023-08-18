import { newError } from '@/server/exeption/errorHandler';
import { SafeParseReturnType, z } from "zod";
import { TOrderServer as TYPE } from '@/entity/server/orderan';

const create = async ( z: z.SafeParseReturnType<TYPE, TYPE>, data: TYPE ) => {
  if( !z.success ) {
    // console.log(z.error.message)
    return z.error.message
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
    return z.error.message
  }
  else {
    return id
  }
}
const Service  = { create, findById }
export default Service