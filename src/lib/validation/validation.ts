import { SafeParseReturnType, z } from "zod";
import { IService } from '@/interface/Service/IService';

export default class Validation implements IService {// master
  validId<S>( valid: SafeParseReturnType<S, S>, id: S ): S {
    if( !valid.success ) {
      return JSON.parse( valid.error.message )
    }
    else {
      return id
    }
  }
  validModel<T>( valid: z.SafeParseReturnType<T, T>, data: T ): T {
    if( !valid.success ) {
      return JSON.parse( valid.error.message )
    }
    else {
      return data
    }
  }

}

