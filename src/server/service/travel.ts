import { SafeParseReturnType, z } from "zod";
import { newError }               from '@/server/exeption/errorHandler';
import { TYPE }                   from '@/server/models/dataAccess/Travel';

const create   = ( z: z.SafeParseReturnType<TYPE, TYPE>, data: TYPE ) => {
  if( !z.success ) {
    throw new newError( "Invalid Value" )
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
    throw new newError( "Invalid Id" )
  }
  else {
    return id
  }
}
const Service  = { create, findById }
export default Service