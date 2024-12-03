import { IService, ZodSchema } from '@/interface/Service/IService';
import Schema from '@/lib/validation/schema';

export default class Validation extends Schema implements IService {
  // validId<S>( valid: SafeParseReturnType<S, S>, id: S ): S {
  //
  //   if( !valid.success ) {
  //     return JSON.parse( valid.error.message )
  //   }
  //   else {
  //     return id
  //   }
  // }
  // validModel<T>( valid: z.SafeParseReturnType<T, T>, data: T ): T {
  //   if( !valid.success ) {
  //     return JSON.parse( valid.error.message )
  //   }
  //   else {
  //     return data
  //   }
  // }
  //
  validIdNew( id: string ): string {
    const valid = this.zodId( id )
    if( !valid.success ) {
      return JSON.parse( valid.error.message )
    }
    else {
      return id
    }
  }
  validModelNew<T>( data: T, Schema: ZodSchema<T> ): T {
    const valid = this.zodModel( data, Schema )
    if( !valid.success ) {
      return JSON.parse( valid.error.message )
    }
    else {
      return data
    }
  }

}

