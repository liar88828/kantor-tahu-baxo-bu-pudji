import { SafeParseReturnType, z } from "zod";

function create<T>( valid: z.SafeParseReturnType<T, T>, data: T ): T {
  if( !valid.success ) {
    return JSON.parse( valid.error.message )
  }
  else {
    return data
  }
}

function findById<S>( valid: SafeParseReturnType<S, S>, id: S ): S {
  if( !valid.success ) {
    return JSON.parse( valid.error.message )
  }
  else {
    return id
  }
}

export interface IService {
  create: <T>( valid: SafeParseReturnType<T, T>, data: T ) => ( T );
  findById: <S>( valid: SafeParseReturnType<S, S>, id: S ) => ( S );
}

const Service: IService = { create, findById }
export default Service