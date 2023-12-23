import React from 'react';
import BarVertical from '@/app/components/organisme/chart/barVertical/BarVertical';
import DataEmpty from '@/app/components/template/handling/DataEmpty';

async function BarVerticalServer() {
  // const data     = await BarVerticalChart()
  const response = await fetch(
    'http://localhost:3000/api/dashboard?option=productPerMonth',
    {
      method: "GET",
    }
  )
  if( !response.ok ) {
    return <h1>Error</h1>
  }
  const data = await response.json()
  if( data.data.length === 0 ) {
    return <DataEmpty/>
  }
  return (
    // <h1>hello</h1>
    <BarVertical aggregate={ data.data }/>
  );
}

export default BarVerticalServer;