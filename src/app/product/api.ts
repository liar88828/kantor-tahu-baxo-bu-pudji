import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

export const urlApi = "http://localhost:3000/"

export async function getDataById( id: string ) {

  const res = await fetch( urlApi + "api/product/" + id,
  )
  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }
  const { data } = await res.json()
  return data
}

export async function getData() {
  const res = await fetch( urlApi + "api/product/",
    {

      // next: { revalidate: 2 }
    }
  )

  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }

  return res.json()
}

export const deleteData = async ( id: string, router: AppRouterInstance ) => {
  const res = await fetch(
    urlApi + "api/product/" + id,
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