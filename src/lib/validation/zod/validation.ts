// import { IService, ZodSchema } from '@/_interface/IService';
// import { z } from 'zod';
// import ValidationSchema from './validationSchema';
// import { _test_ } from '../../../../config.dev';
//
// class Validation extends ValidationSchema implements IService {
//
//   validIdNew( id: string ): any {
//     const valid = z.string( { required_error: 'ID is required', } ).min( 5 ).safeParse( id )
//
//     if( !valid.success ) {
//
//       if( _test_ ) {
//         return JSON.parse( valid.error.message )
//       }
//       throw JSON.parse( valid.error.message )
//     }
//     else {
//       return id
//     }
//   }
//
//   validModelNew<T>( data: T, Schema: ZodSchema<T> ) {
//
//     const valid = Schema.safeParse( data )
//
//     if( !valid.success ) {
//
//       if( _test_ ) {
//         // console.table(JSON.parse( valid.error.message ))
//         return JSON.parse( valid.error.message )
//       }
//       throw JSON.parse( valid.error.message )
//     }
//     else {
//       return data
//     }
//   }
//
// }
//
// export const validation = new Validation()
