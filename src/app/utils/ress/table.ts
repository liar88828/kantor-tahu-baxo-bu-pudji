export const getDataByStatus = async ( slug: string ) => {
  const res = await fetch( "http://localhost:3000/api/orderan/table/" + slug, {
    method: "GET",
    next  : { revalidate: 20 }
  } )
  return res.json()
}

export async function getData() {
  const res = await fetch( "/api/orderan",
    {
      // cache: 'no-cache',
      // next: { revalidate: 10 }
      method: "GET"
    },
  )
  console.log( await res.json() )
  // if( !res.ok ) {
  //   throw new Error( 'Failed to fetch data' )
  // }
  // console.log(data)
  return await res.json()
}

export async function deleteData( id: string ) {
  const res = await fetch( "/api/orderan/" + id,
    {
      // cache: 'no-cache',
      next  : { revalidate: 10 },
      method: "DELETE",
    }
  )

  // if( !res.ok ) {
  //   throw new Error( 'Failed to fetch data' )
  // }
  // console.log(data)
  return await res.json()
}

export async function editData( id: string, json: any ) {
  const res = await fetch( "/api/orderan/" + id,
    {
      // cache: 'no-cache',
      next  : { revalidate: 10 },
      method: "PUT",
    }
  )

  // if( !res.ok ) {
  //   throw new Error( 'Failed to fetch data' )
  // }
  // console.log(data)
  return await res.json()
}

export async function updateOneData( id: string, value: string | number ) {

  const res = await fetch( `/api/orderan?id=${ id }&value=${ value }`,
    {
      // cache: 'no-cache',
      next  : { revalidate: 10 },
      method: "PUT",
    }
  )

  // if( !res.ok ) {
  //   throw new Error( 'Failed to fetch data' )
  // }
  // console.log(data)
  return await res.json()
}

