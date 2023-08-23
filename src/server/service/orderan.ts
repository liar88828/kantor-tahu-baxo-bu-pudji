import { SafeParseReturnType, z } from "zod";

async function create<T>( z: z.SafeParseReturnType<T, T>, data: T ) {
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