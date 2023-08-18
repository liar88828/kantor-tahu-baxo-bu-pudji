import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { config } from '../../../../dataEnv';

export const getDataByStatus = async ( slug: string ) => {
  const res = await fetch( config.url + "/api/orderan/table/" + slug, {
    method: "GET",
    next  : { revalidate: 20 }
  } )
  return res.json()
}

export async function getData() {
  const res = await fetch( config.url + "/api/orderan",
    {
      // cache: 'no-cache',
      next  : { revalidate: 10, tags: [ "table" ] },
      method: "GET"
    }
  )
  console.log( await res.json() )

  return await res.json()
}

export async function deleteDataMany( send: string [] ) {

  const formData = new FormData();
  formData.append( "data", JSON.stringify( send ) )
  const res = await fetch( config.url + "/api/orderan/", {
      method: "DELETE",
    body: formData,
    next: { tags: [ "table" ] }
    }
  )

  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }

  const data = await res.json()
  if( data.success === false ) {
    const arrays = JSON.parse( data.data )
  }
  return data
}

export async function deleteDataOne( send: string ) {
  const id  = send.replaceAll( "/", "_" )
  const res = await fetch( config.url + `/api/orderan/` + id, {
    method: "DELETE",
    next  : { tags: [ "table" ] }
    }
  )

  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }

  const data = await res.json()
  if( data.success === false ) {
    const arrays = JSON.parse( data.data )
  }
  return data
}

export async function editData( id: string, json: any ) {
  const res = await fetch( config.url + "/api/orderan/" + id,
    {
      // cache: 'no-cache',
      // next  : { revalidate: 10 },
      method: "PUT",
      next: { tags: [ "table" ] }

    }
  )

  return await res.json()
}

export async function updateOneData( id: string, value: string | number, router: AppRouterInstance ) {

  const res = await fetch( config.url + `/api/orderan?id=${ id }&value=${ value }`,
    {
      method: "PUT",
    }
  )

  return await res.json()
}

