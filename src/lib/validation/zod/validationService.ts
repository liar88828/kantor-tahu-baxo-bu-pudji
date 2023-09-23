import { SafeParseError, SafeParseSuccess, z } from 'zod';
import { SafeParseReturnType } from 'zod/lib/types';
import { errorDataZod, errorEmptyIDZod } from '@/lib/utils/errorResponse';
import { ZodSchema } from '@/interface/Service/IService';

export interface IValidationService<T> {
  readonly Schema: ZodSchema<T>

  zodIdNew( id: string ): string
  zodModelNew( data: T ): T
  zodIdManyNew( id: string[] ): string[]

  zodId( id: string ): SafeParseSuccess<string> | SafeParseError<string>;
  zodIdMany( id: string[] ): z.SafeParseReturnType<string[], string[]>
  zodModel( data: T, ): SafeParseReturnType<T, T>
}

type TZodFun<Z> = ( data: Z ) => { msg: string, data: any, success: boolean };
export default class ValidationService<T> implements IValidationService<T> {
  constructor(
    readonly Schema: ZodSchema<T>
  ) {
  }

  private valid<U, F extends TZodFun<U>>( valid: SafeParseSuccess<U> | SafeParseError<U>, fun: F ) {
    if( valid.success ) {
      return valid.data
    }
    else {
      throw fun( JSON.parse( valid.error.message ) )
    }
  }

  zodIdNew( id: string ) {
    console.log( "zod api validation id new zod" )
    const valid = z.string( { required_error: 'ID is required', } )
                   .min( 5 )
                   .safeParse( id )
    return this.valid<string, TZodFun<string>>( valid, errorEmptyIDZod );
  }

  zodModelNew( data: T, ): T {
    console.log( "zod api validation object" )
    const valid = this.Schema.safeParse( data )
    return this.valid<T, TZodFun<T>>( valid, errorDataZod );
  }

  zodIdManyNew( id: string[] ) {
    console.log( "zod api validation array" )
    const valid = z.array(
      z.string( { required_error: "Is Not Array of string" } )
       .min( 20 )
       .max( 45 ) )
                   .safeParse( id )
    return this.valid<string[], TZodFun<string[]>>( valid, errorEmptyIDZod );

  }

  zodId( id: string ) {
    console.log( "zod api validation id" )
    return z.string(
      { required_error: 'ID is required', }
    )
            .min( 5 )
            .safeParse( id )
  }

  zodIdMany( id: string[] ) {
    console.log( "zod api validation array" )
    return z.array(
      z.string( { required_error: "Is Not Array of string" } ).min( 20 ).max( 45 )
    )
            .min( 2 )
            .safeParse( id )
  }

  zodModel( data: T, ) {
    console.log( "zod api validation object" )
    return this.Schema.safeParse( data )
  }
}