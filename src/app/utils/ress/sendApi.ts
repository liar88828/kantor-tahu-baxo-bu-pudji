import { TOrderServer } from '@/entity/server/orderan';
import { redirect } from 'next/navigation';

export async function sendAPI(
  to: string,
  method: string,
  json: TOrderServer,
  id: string
) {
  console.log( json )

  const response = await fetch( process.env.NEXT_PUBLIC_BASE_URL + `/api/${ to }/` + id, {
    method : method,
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

export async function sendData( to: string, method: string, id: string, json: any = {} ) {

  let methods = {
    // cache  : "no-cache",
    method : method,
    headers: { "Content-Type": "application/json" }
  }

  const option = {
    body: JSON.stringify( json ),
  }

  if( method !== "GET" ) {
    methods = Object.assign( option, methods )
  }
  const res = await fetch( process.env.NEXT_PUBLIC_BASE_URL + `/api/${ to }?id=` + id, methods )
  if( !res.ok ) {

    console.log( "error" )
  }

  const response = await res.json()
  // console.log( "-----------" )
  // console.log( response )
  // console.log( "-----------" )
  const { data, msg } = response
  return { data, msg }
}

export async function sendImage( apiEndPoint: string, id: string, method: string, formData: FormData ) {
  const response = await fetch( '/api/' + apiEndPoint + "?id=" + id, {
    method: method,
    body  : formData,
  } )
  const data     = await response.json()
  return { response, data };
}