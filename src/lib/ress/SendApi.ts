"use server"
import { TMethod, ToModel } from '@/entity/Utils';
import { _test_ } from '../../../config.dev';
import { TResponse } from '@/entity/client/ress/TResponse';
import { revalidateTag } from 'next/cache';

export type Stores = "noCache" | "revalidate" | "cache" | "";

// to: ToModel,
//   method: TMethod,
//   id: string | string[],
//   option: string = "",
//   json: any      = {},
//   stores: Stores = ""

type TFetch<
  Method extends TMethod> = {
  method: Method,
  to: ToModel,
  id?: Method extends 'POST' ? null : string | string[],
  option?: string,
  json?: any,
  stores?: Stores,
  take?: number,
  page?: number,
};

export async function Fetch<
  Method extends TMethod
>(
  { method, to, id, option, json = {}, take, page }: TFetch<Method>
) {

  let options: RequestInit = {
    method: method,
    next  : {
      // revalidate: false,
      tags: [ to ],
    },
    // cache: 'default'
  }
  const header             = { headers: { "Content-Type": "application/json" } }
  const jsons              = { body: JSON.stringify( json ), }

  if( method !== "GET" ) {
    options = Object.assign( jsons, options )
    options = Object.assign( header, options )
  }
  // console.log( page )
  let param = ''
  param     = id !== undefined ? `id=${ id }` : param
  param     = option !== undefined ? param.concat( '&', `option=${ option }` ) : param
  param     = page !== undefined ? param.concat( '&', `page=${ page }` ) : param
  param     = take !== undefined ? param.concat( '&', `take=${ take }` ) : param

  const url: RequestInfo = "http://localhost:3000" +
    `/api/${ to }?`
    + param
  console.log( url )
  console.log( param )

  const res = await fetch( url, options )

  if( !res.ok ) {
    console.error( res, "error" )
  }
  const data: TResponse<any> = await res.json()

  if( !_test_ ) {
    if( method !== "GET" ) {
      revalidateTag( to )
    }
  }

  return data
}
