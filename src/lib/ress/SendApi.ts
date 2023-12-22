"use server"
import { TMethod, ToModel } from '@/entity/Utils';
import { _test_, config } from '../../../config.dev';
import { revalidateTag } from 'next/cache';
import { TResponse } from '@/entity/client/ress/TResponse';

export type Stores = "noCache" | "revalidate" | "cache" | "";

export async function Fetch<T>(
  to: ToModel,
  method: TMethod,
  id: string | string[],
  option: string = "",
  json: any      = {},
  stores: Stores = ""
) {

  let options           = { method: method }
  const noCache         = { cache: "no-store" }
  const caching         = { cache: 'force-cache' }
  const revalidatingTag = { next: { tags: [ to ] }, }
  const header          = { headers: { "Content-Type": "application/json" } }
  const jsons           = { body: JSON.stringify( json ), }

  if( stores === "noCache" ) options = Object.assign( noCache, options )
  if( stores === "cache" ) options = Object.assign( caching, options )

  if( !_test_ ) {
    if( method === "GET" ) {
      options = Object.assign( revalidatingTag, options )
    }
  }

  if( method !== "GET" ) {
    if( option !== "file" ) {
      options = Object.assign( jsons, options )
      options = Object.assign( header, options )
    }
    else {
      options = Object.assign( { body: json }, options )
    }
  }
  console.log( method )

  console.log( "send Data to Api " )
  // console.log( options )
  const res = await fetch(
    // "http://localhost:3000"
    config.url +
    `/api/${ to }?id=${ id }&option=${ option }`,
    options
  )
  if( !res.ok ) {
    console.error( res, "error" )
  }
  const data: TResponse<T> = await res.json()

  if( !_test_ ) {
    if( method !== "GET" ) {
      console.log( to )
      revalidateTag( to )
    }
  }

  console.log( "get data from api" )
  return data
}
