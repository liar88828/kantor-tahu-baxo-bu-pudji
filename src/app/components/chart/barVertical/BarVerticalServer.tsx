import React from 'react';
import DataEmpty from '@/app/components/template/handling/DataEmpty';
import { TAggregate } from '@/interface/Dashboard';
import BarVertical from '@/app/components/chart/barVertical/BarVertical';

function BarVerticalServer( { data }: { data: TAggregate[] } ) {
  // const data     = await BarVerticalChart()
  // const response = await fetch(
  //   'http://localhost:3000/api/dashboard?option=productPerMonth',
  //   {
  //     method: "GET",
  //   }
  // )
  // if( !response.ok ) {
  //   return <h1>Error</h1>
  // }
  // const data = await response.json()
  if( data.length === 0 ) {
    return <DataEmpty/>
  }
  return (
    // <h1>hello</h1>
    <BarVertical aggregate={ data }/>
  );
}

export default BarVerticalServer;