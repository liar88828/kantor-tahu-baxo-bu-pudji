"use server"
import { TMethod, ToModel } from '@/entity/Utils';
import { _test_, config } from '../../../../config.dev';
import { revalidateTag } from 'next/cache';
import { TResponse } from '@/entity/servers/service/TResponse';

export type Stores = "noCache" | "revalidate" | "cache" | "";

export async function sendData<T>(
  to: ToModel,
  method: TMethod,
  id: string | string[],
  option: string = "",
  json: any      = {},
  stores: Stores = ""
) {
  console.log( json )
  const noCache = {
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

  if( stores === "cache" ) {
    methods = Object.assign( {
      cache:
      // 'default'
        'force-cache'
    }, methods )
  }
  if( _test_ ) {
    if( method === "GET" ) {
      methods = Object.assign( revalidatingTag, methods )
    }
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
  console.log( methods )
  // console.log( methods )
  const res = await fetch(
    // "http://localhost:3000"
    config.url +
    `/api/${ to }?id=${ id }&option=${ option }`,
    methods
    // { }
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
