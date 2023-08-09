import { urlApi } from '@/app/utils/ress/product';

export async function getData() {
  const res = await fetch( urlApi + "api/orderan/",
    {
      // cache: 'default', next : { revalidate: 2 }
    }
  )

  if( !res.ok ) {
    throw new Error( 'Failed to fetch data' )
  }

  const data = await res.json()
  // console.log(data)
  return data
}