// import { SafeParseError, SafeParseSuccess, z } from 'zod';
// import { errorDataZod, errorEmptyIDZod } from '@/lib/exception/errorResponse';
// import { ZodSchema } from '@/_interface/IService';
// import ValidationSchema from './validationSchema';
//
// export interface IValidationService<T> {
//   readonly Schema: ZodSchema<T>
//   zodIdNew( id: string ): string
//   zodModelNew( data: T ): T
//   zodIdManyNew( id: string[] ): string[]
// }
//
// type TZodFun<Z> = ( data: Z ) => { msg: string, data: any, success: boolean };
//
// export default class ValidationService<T> extends ValidationSchema implements IValidationService<T> {
//   constructor(
//     readonly Schema: ZodSchema<T>
//   ) {
//     super()
//   }
//
//   private valid<U, F extends TZodFun<U>>( valid: SafeParseSuccess<U> | SafeParseError<U>, fun: F ) {
//     if( valid.success ) {
//       return valid.data
//     }
//     else {
//       throw fun( JSON.parse( valid.error.message ) )
//     }
//   }
//
//   zodIdNew( id: string ) {
//     console.log( "zod api validation id new zod" )
//     const valid = z.string( { required_error: 'ID is required', } )
//                    .min( 5 )
//                    .safeParse( id )
//     return this.valid<string, TZodFun<string>>( valid, errorEmptyIDZod );
//   }
//
//   zodModelNew( data: T, ): T {
//     console.log( "zod api validation object new" )
//     const valid = this.Schema.safeParse( data )
//     return this.valid<T, TZodFun<T>>( valid, errorDataZod );
//   }
//
//   zodIdManyNew( id: string[] ) {
//     console.log( "zod api validation array" )
//     const valid = z.array(
//       z.string( { required_error: "Is Not Array of string" } )
//        .min( 20 )
//        .max( 45 ) )
//                    .safeParse( id )
//     return this.valid<string[], TZodFun<string[]>>( valid, errorEmptyIDZod );
//
//   }
//
// }
//
