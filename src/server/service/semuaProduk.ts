import type { TYPE } from '@/server/models/dataAccess/semuaProduk';
import { newError }               from '@/server/exeption/errorHandler';
import { SafeParseReturnType, z } from "zod";

export default class Service {
  create( z: z.SafeParseReturnType<TYPE, TYPE>, data: TYPE ) {
    if( !z.success ) {
      throw new newError( "Error Invalid Value", )
    }
    else {
      return data
    }
  }

  findById( z: SafeParseReturnType<string, string>, id: string ) {
    if( !z.success ) {
      throw new newError( "Error Invalid Value", )
    }
    else {
      return id
    }
  }

}
