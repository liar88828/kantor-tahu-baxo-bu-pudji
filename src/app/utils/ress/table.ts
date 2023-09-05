import { config } from '../../../../dataEnv';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { nextPublicBaseUrl } from '@/lib/config/nextPublicBaseUrl';

export async function getData() {
  const res = await fetch( nextPublicBaseUrl + "/api/dashboard",
    {
      next  : { revalidate: 10, },
      method: "GET"
    }
  )

  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }

  const data = await res.json()

  if( data.success === false ) {
    const arrays = JSON.parse( data.data )
    console.error( arrays )
    console.error( data )
  }

  return data
}

export async function deleteDataMany( send: string [] ) {

  const formData = new FormData();
  formData.append( "data", JSON.stringify( send ) )
  const res = await fetch( config.url + "/api/orderan/", {
      method: "DELETE",
      body  : formData,
    }
  )

  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }

  const data = await res.json()
  if( data.success === false ) {
    const arrays = JSON.parse( data.data )
    console.error( arrays )
  }
  return data
}

export async function deleteDataOne( id: string[] ) {
  const res = await fetch( config.url + `/api/orderan?id=` + id[ 0 ], {
      method: "DELETE",
    }
  )
  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }

  const data = await res.json()
  if( data.success === false ) {
    const arrays = JSON.parse( data.data )
    console.error( arrays )

  }
  return data
}

export async function editData( id: string, json: any ) {
  const res = await fetch( config.url + "/api/orderan/" + id, {
      method: "PUT",
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

