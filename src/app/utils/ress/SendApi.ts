import { TOrderServer } from '@/entity/server/orderan';
import { redirect } from 'next/navigation';
import { nextPublicBaseUrl } from '../../../lib/config/nextPublicBaseUrl';

export async function SendApi(
  to: string,
  method: string,
  json: TOrderServer,
  id: string
) {
  // console.log( json )

  const response = await fetch( nextPublicBaseUrl + `/api/${ to }/` + id, {
    method: method,
    // cache: 'no-store',
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
  to: "bank" | "orderan" | "product" | "travel" | "dashboard",
  method: string,
  id: string,
  json: any = {}
) {

  let methods = {
    method : method,
    headers: { "Content-Type": "application/json" }
  }

  const option = {
    body: JSON.stringify( json ),
  }

  if( method !== "GET" ) {
    methods = Object.assign( option, methods )
  }

  if( id.length > 10 ) {

    methods = Object.assign( { cache: "no-cache" }, methods )

  }

  const res = await fetch( nextPublicBaseUrl + `/api/${ to }?id=` + id, methods )
  if( !res.ok ) {
    console.log( res )
    console.log( "error" )
  }

  const data: { data: T, msg: string } = await res.json()
  return data
}

export async function sendImage( apiEndPoint: string, id: string, method: string, formData: FormData ) {
  const response = await fetch( '/api/' + apiEndPoint + "?id=" + id, {
    method: method,
    body  : formData,
  } )
  return await response.json()
}