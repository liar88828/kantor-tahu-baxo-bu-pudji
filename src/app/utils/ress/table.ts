import { config } from '../../../../config.dev';

export async function getData() {
  const res = await fetch( config.url + "/api/dashboard",
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
