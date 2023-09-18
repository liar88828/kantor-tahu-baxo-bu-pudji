import { redirect } from 'next/navigation';
import { TMethod, ToModel } from '@/entity/Utils';
import { config } from '../../../../config.dev';

export async function SendApi(
  to: string,
  method: string,
  json: TOrderServer,
  id: string
) {
  // console.log( json )

  const response = await fetch( config.url + `/api/${ to }/` + id, {
    method: method,
    cache: 'no-store',
    // next   : { revalidate: 10,  },
    body   : JSON.stringify( json ),
    headers: { "Content-Type": "application/json" }
  } )

  if( !response.ok ) {
    redirect( '/not-found' )
  }

  const data = await response.json()
  console.log( data )
  return data
}

export async function sendData<T>(
  to: ToModel,
  method: TMethod,
  id: string | string[],
  option: string = "",
  json: any      = {}
) {

  let methods = {
    method : method,
    headers: { "Content-Type": "application/json" }
  }

  const jsons = {
    body: JSON.stringify( json ),
  }

  if( method !== "GET" ) {
    methods = Object.assign( jsons, methods )
  }

  if( id.length > 10 ) {
    methods = Object.assign( {
        cache: "no-cache"
      },
      methods )
  }
  // console.log("---send api-------")
  // console.log(json)
  // console.log("---send api-------")

  const res = await fetch(
    config.url
    // "http://localhost:3000"
    +
    `/api/${ to }?id=` + id + "&option=" + option, methods )
  if( !res.ok ) {
    console.error( res, "error" )
  }

  const data: { data: T, msg: string } = await res.json()
  // console.log( data )
  return data
}

export async function sendImage( apiEndPoint: string, id: string, method: string, formData: FormData ) {
  // console.log( id )
  const response = await fetch( '/api/' + apiEndPoint + `?id=${ id }&option=file`, {
    method: method,
    body  : formData,
    cache: "no-store"
  } )
  return await response.json()
}