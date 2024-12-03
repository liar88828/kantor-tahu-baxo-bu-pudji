// // "use server"
//
// import { Fetch, Stores } from './SendApi';
// import { ValidationModel } from './ValidationModel';
// import { TMethod, ToModel } from '@/entity/Utils';
//
// import { errorData, errorEmptyData, errorEmptyID } from '@/lib/exeption/errorResponse';
// import { setIdModel } from '@/lib/utils/formatId';
// import { getId } from './setBank';
// import { _test_ } from '../../../config.dev';
//

//
// export async function GateWay<T>(
//   method: TMethod,
//   to: ToModel,
//   id: string | "all" = "",
//   data: any          = {},
//   option: string     = "",
//   stores: Stores     = "revalidate",
// ): Promise<{
//   data: any,
//   msg: string
// } | any> {
//   try {
//     if(
//       [ "PATCH", "PUT", "GET", "DELETE" ].includes( method ) &&
//       ( id !== "all" && id.length < 3 )
//     ) {
//       console.error( `${ method } Wrong Id GateWay` );
//       return errorEmptyID( method );
//     }
//     //
//
//     if( option === "file" ) {
//       console.log( `${ method } file GateWay` )
//       if( method === "POST" || method === "PUT" ) {
//         return await Fetch<T>( to, method, id, option, data )
//       }
//     }
//
//     if( ( method === "POST" || method === "PUT" ) && isObjectEmpty( data ) ) {
//       console.error( `${ method } is empty GateWay` );
//       return errorEmptyData( method );
//     }
//
//     if( method === "POST" || method === "PUT" ) {
//       console.log( "POST and PUT" )
//       if( typeof data === "object" ) {
//         if( method === "POST" ) {
//           if( typeof data.id === "string" ) {
//             if( data.id.length < 20 ) {
//               data.id = setIdModel( to, data )
//             }
//           }
//         }
//
//         const validData = ValidationModel( to, data, method );
//
//         console.info( "success client GateWay" )
//         if( _test_ ) {
//           console.info( "if test throw error" )
//           if( JSON.stringify( validData ).includes( "path" ) ) {
//             return validData
//           }
//         }
//         return await Fetch<T>( to, method, id, option, validData );
//
//       }
//     }
//     if( method === "GET" ) {
//       if( id.length > 10 && data === "only" ) {
//         console.info( "only" )
//         return await getId( to, id );
//       }
//       if( id.length > 3 || id === "all" || id === "" ) {
//         console.info( "all" )
//         return await Fetch<T>( to, "GET", id, option, {}, stores
//           //"noCache"
//         );
//       }
//     }
//     if( method === "DELETE" ) {
//       console.log( "test delete" )
//       return await Fetch<T>( to, "DELETE", id, "", data );
//     }
//
//     return errorData( method, data, )
//   }
//   catch ( e ) {
//     if( _test_ ) {
//       return errorData( method, e )
//     }
//     if( typeof e === "object" ) {
//       console.log( "error" )
//       console.log( e )
//       throw e
//     }
//
//   }
// }
//
