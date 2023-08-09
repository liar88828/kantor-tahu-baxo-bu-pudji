import React          from 'react'
import { getData }    from '@/app/utils/ress/table';
import { TableOrder } from '@/app/table/Table';

// const getOrderan = async () => {
//   const res  = await fetch( "api/orderan" )
//   const data = await res.json()
//   console.log( data )
//
// }

export default async function Page() {
  const data = await getData()
  // console.log( data )
  return <>
    <TableOrder dataOrderan={ data }/>
  </>
}

