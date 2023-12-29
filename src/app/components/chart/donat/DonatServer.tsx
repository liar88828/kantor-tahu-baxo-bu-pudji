import React from 'react';
import DataEmpty from '@/app/components/template/handling/DataEmpty';
import { DonatChart } from '@/interface/prisma';
import Donat from '@/app/components/chart/donat/donat';

async function DonatServer( { data }: { data: DonatChart[] } ) {
  // const data = await DonatChart()
  // const response = await fetch( 'http://localhost:3000/api/dashboard?option=productLast', )
  // if( !response.ok ) {
  //   return <h1>Error</h1>
  // }
  // const data = await response.json()

  if( data.length === 0 ) {
    return <DataEmpty/>
  }
  else
    return (
      // <h1>hello</h1>
      <Donat dataKu={ data as any }/>
    );
}

export default DonatServer;