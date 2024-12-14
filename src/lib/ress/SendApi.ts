"use server"
import { _test_ } from '../../../config.dev';
import { TResponse } from '@/entity/server/TResponse';
import { revalidateTag } from 'next/cache';
import { TMethod, ToModel } from '@/interface/Utils';

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
  caches?: RequestCache,
  take?: number,
  page?: number,
  tags?: boolean,
  revalidate?: boolean,
  time?: number,
  value?: string
};

export async function Fetch<
  Method extends TMethod
>(
  {
    method, to, id,
    option,
    json = {},
    take,
    page,
    tags = true,
    revalidate = false,
    value,
    // store=true,
    caches = 'default',
    time = 0
  }: TFetch<Method>
) {
  const tag    = { tags: [ to ], }
  const header = { headers: { "Content-Type": "application/json" } }
  const jsons  = { body: JSON.stringify( json ), }

  let nextOption: NextFetchRequestConfig = {}
  if( tags ) {
    nextOption = Object.assign( tag, nextOption )
  }
  if( revalidate ) {
    nextOption = Object.assign( { revalidate: time }, nextOption )
  }

  let options: RequestInit = {
    method: method,
    next  : nextOption,
    // cache : caches,
  }

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

  const url: RequestInfo = "http://localhost:3000"
    + `/api/${ to }?`
    + param

  // console.log(json)
  // console.log( url )
  // console.log( options )

  const res = await fetch( url, options )

  if( !res.ok ) {
    console.error( res, "error" )
  }
  const data: TResponse<any> = await res.json()
  // console.log(data)
  if( !_test_ ) {
    if( method !== "GET" ) {
      revalidateTag( to )
    }
  }

  return data
}
