import React from 'react';
import Lines from '@/app/components/organisme/chart/line/line';
import DataEmpty from '@/app/components/template/handling/DataEmpty';

async function LineServer() {
  // const data = await LineChart()
  const response = await fetch( 'http://localhost:3000/api/dashboard?option=orderTahun', { cache: 'no-store' } )
  if( !response.ok ) {
    return <h1>Error</h1>
  }
  const data = await response.json()
  // console.log(data)
  if( data.data.length === 0 ) {
    return <DataEmpty/>
  }
  return (
    // <h1>hello</h1>

    <Lines dataKu={ data.data }/>
  );
}

export default LineServer;