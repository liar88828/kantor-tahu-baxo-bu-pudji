// import { config } from '../../../config.dev';
// import { TOrder } from '@/interface/orderan';
//
// const test = "test"
//
// export async function onCreate(
//   data: TOrder,
//   method: "POST" | "PUT",
//   id: string
// ) {
//
//   data.hpPengirim = "0" + data.hpPengirim.toString()
//   data.hpPenerima = "0" + data.hpPenerima.toString()
//
//   const newSemuaProduct: TProOrderan[] = data
//   .semuaProduct.map( ( d: TProOrderan ) => {
//     d.orderanId = data.id
//     return d
//   } )
//
//   const { listItem, listOrderan, semuaProduct, ...puts } = data
//   const ress                                             = Object.assign( { semuaProduct: newSemuaProduct }, puts )
//   if( confirm( "Apakah Data yang di isi sudah Benar ??" ) ) {
//     if( method === "POST" ) {
//       return await GateWay( "POST", "orderan", "", ress )
//     }
//     if( method === "PUT" ) {
//       // console.info( "true" )
//       return await GateWay( "PUT", "orderan", id, ress )
//
//     }
//   }
//   else {
//     // Do nothing!
//     // console.log( 'Thing was not saved to the database.' );
//   }
// }
//
// if( test !== "test" ) {
//   async function editData( id: string ) {
//     const res = await fetch( config.url + "/api/orderan/" + id, {
//         method: "PUT",
//       }
//     )
//     return await res.json()
//   }
//
//   console.log( editData( "test" ) )
//
//   async function updateOneData(
//     id: string,
//     value: string | number,
//     // router: AppRouterInstance
//   ) {
//     const res = await fetch( config.url + `/api/orderan?id=${ id }&value=${ value }`,
//       {
//         method: "PUT",
//       }
//     )
//     // router.refresh()
//     return await res.json()
//   }
//
//   console.log( updateOneData( "test", 12 ) )
// }
//
