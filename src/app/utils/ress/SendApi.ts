import { TMethod, ToModel } from '@/entity/Utils';
import { _test_, config } from '../../../../config.dev';
import { revalidateTag } from 'next/cache';
import { TResponse } from '@/entity/service/TResponse';

export async function sendData<T>(
  to: ToModel,
  method: TMethod,
  id: string | string[],
  option: string                   = "",
  json: any                        = {},
  stores: "noCache" | "revalidate" = "revalidate",
) {

  const noCache       = {
    cache: "no-store"
  }
  let revalidatingTag = {
    next: { tags: [ to ] },
  }

  const header = {
    headers: { "Content-Type": "application/json" }
  }

  let methods = {
    method: method,
  }

  const jsons = {
    body: JSON.stringify( json ),
  }

  if( stores === "noCache" ) {
    methods = Object.assign( noCache, methods )
  }

  if( stores === "revalidate" && to !== "table" ) {
    methods = Object.assign( revalidatingTag, methods )
  }

  if( method !== "GET" ) {
    if( option !== "file" ) {
      methods = Object.assign( jsons, methods )
      methods = Object.assign( header, methods )
    }
    else {
      methods = Object.assign( { body: json }, methods )
    }

  }
  console.log( "send Data to Api " )
  console.log( revalidatingTag )
  const res = await fetch(
    // "http://localhost:3000"
    config.url + `/api/${ to }?id=${ id }&option=${ option }`,
    methods )
  if( !res.ok ) {
    console.error( res, "error" )
  }
  const data: TResponse<T> = await res.json()

  if( data.success && !_test_ && method !== "GET" ) {
    console.log( `revalidate ${ data.success && _test_ }` )
    console.log( to )
    if( to !== "table" ) {
      revalidateTag( to )
    }
  }
  return data
}

// export async function sendImage( to: string, id: string, method: string, formData: FormData ) {
//   const response = await fetch(
//     config.url + `/api/${ to }?id=${ id }&option=file`,
//     {
//       method: method,
//       body  : formData,
//       cache : "no-store"
//     } )
//   return await response.json()
// }
//
// export async function SendApi(
//   to: string,
//   method: string,
//   json: TOrderServer,
//   id: string
// ) {
//   // console.log( json )
//
//   const response = await fetch( config.url + `/api/${ to }/` + id, {
//     method: method,
//     cache : 'no-store',
//     // next   : { revalidate: 10,  },
//     body   : JSON.stringify( json ),
//     headers: { "Content-Type": "application/json" }
//   } )
//
//   if( !response.ok ) {
//     redirect( '/not-found' )
//   }
//
//   const data = await response.json()
//   console.log( data )
//   return data
// }
