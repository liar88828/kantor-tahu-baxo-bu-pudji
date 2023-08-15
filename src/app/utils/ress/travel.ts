import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { config } from '../../../../dataEnv';



export async function getDataById( id: string ) {

  const res = await fetch( "/api/travel/" + id,
  )
  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }
  const { data } = await res.json()

  return data
}

export async function getData() {
  const res  = await fetch( config.url + "/api/travel",
    {
      // cache: 'default',
      next: { revalidate: 10 }
    }
  )
  const data = await res.json()

  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }

  // console.log( data )
  return data
}

export const deleteData = async ( id: string, router: AppRouterInstance ) => {
  const res = await fetch(
    "/api/travel/" + id,
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