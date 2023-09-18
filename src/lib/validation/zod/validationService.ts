import { SafeParseError, SafeParseSuccess, z } from 'zod';
import { SafeParseReturnType } from 'zod/lib/types';

export interface IValidationService<T> {
  readonly Schema: z.ZodType<T, z.ZodTypeDef, T>;
  zodId( id: string ): SafeParseSuccess<string> | SafeParseError<string>;
  zodIdMany( id: string[] ): z.SafeParseReturnType<string[], string[]>,
  zodModel( data: T, ): SafeParseReturnType<T, T>
}

export default class ValidationService<T> implements IValidationService<T> {
  constructor(
    readonly Schema: z.ZodType<T, z.ZodTypeDef, T>
  ) {
  }

  zodId( id: string ) {
    console.log( id )
    return z.string(
      { required_error: 'ID is required', }
    )
            .min( 5 )
            .safeParse( id )
  }
  zodIdMany( id: string[] ) {
    console.log( id )
    return z.array( z.string( { required_error: "Is Not Array of string" } ).min( 30 ).max( 45 ) )
            .min( 5 )
            .safeParse( id )
  }

  zodModel( data: T, ) {
    console.info( "zod api validation" )
    console.log( data )
    return this.Schema.safeParse( data )
  }
}