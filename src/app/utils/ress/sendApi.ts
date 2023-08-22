import { TOrderServer } from '@/entity/server/orderan';
import { config } from '../../../../dataEnv';
import { redirect } from 'next/navigation';

export async function sendAPI(
  to: string,
  method: string,
  json: TOrderServer,
  id: string
) {
  const response = await fetch( config.url + `/api/${ to }/` + id, {
    method : method,
    body   : JSON.stringify( json ),
    headers: { "Content-Type": "application/json", }
  } )

  if( !response.ok ) {
    redirect( '/not-found' )
  }

  const data = await response.json()
  // console.log( data )
  return data
}

export async function sendData( to: string, method: string, id: string ) {
  const res = await fetch( config.url + `/api/${ to }?id=` + id, {
      method: method,
    }
  )
  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }

  const { data, msg } = await res.json()
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