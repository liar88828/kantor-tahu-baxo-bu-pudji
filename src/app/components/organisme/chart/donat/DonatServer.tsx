import React from 'react';
import Donat from '@/app/components/organisme/chart/donat/donat';
import DataEmpty from '@/app/components/template/handling/DataEmpty';

async function DonatServer() {
  // const data = await DonatChart()
  const response = await fetch( 'http://localhost:3000/api/dashboard?option=productLast', )
  if( !response.ok ) {
    return <h1>Error</h1>
  }
  const data = await response.json()
  if( data.data.length === 0 ) {
    return <DataEmpty/>
  }
  else
    return (
      // <h1>hello</h1>
      <Donat dataKu={ data.data }/>
    );
}

export default DonatServer;