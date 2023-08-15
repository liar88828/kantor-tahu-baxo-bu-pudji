import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { config } from '../../../../dataEnv';

export async function getDataById( id: string ) {

  const res = await fetch( "/api/product/" + id,
  )
  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }
  const { data } = await res.json()

  return data
}

export async function getData() {
  const res  = await fetch( config.url + "/api/product",
    {
      // cache: 'default',
      next: { revalidate: 3 }
    }
  )
  const data = await res.json()

  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }

  return data
}

export const deleteData = async ( id: string, router: AppRouterInstance ) => {
  const res = await fetch(
    process.env.URL + "/api/product/" + id,
    {
      method : "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    } )
  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }
  const { msg }: { msg: string } = await res.json()
  router.refresh()
  return msg
}