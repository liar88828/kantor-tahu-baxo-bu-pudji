import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { config } from '../../../../dataEnv';

async function sendData( method: string, id: string ) {
  const res = await fetch( config.url + "/api/product/" + id, {
      method: method,
      cache : "no-cache"
    }
  )
  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }
  const data = await res.json()
  console.log( data )
  return data
}

export async function getDataById( id: string ) {
  return await sendData( "GET", id );
}

export async function getData() {
  return await sendData( "GET", "" );
}

export const deleteData = async ( id: string, router: AppRouterInstance ) => {
  const data = await sendData( "DELETE", id );
  router.refresh()
  return data
}