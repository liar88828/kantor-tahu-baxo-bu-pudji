import React from 'react';
import { ListDashboard } from '@/app/(pages)/dashboard/ListDashboard';
import DataEmpty from '@/app/components/template/handling/DataEmpty';

async function ServerList() {
  const response = await fetch(
    'http://localhost:3000/api/dashboard?option=notify' )
  if( !response.ok ) {
    return <h1>Error</h1>
  }
  const data = await response.json()
  console.log( data )
  if( data.data.length === 0 ) {
    return <DataEmpty/>
  }
  return (
    <ListDashboard data={ data.data }/>
  );
}

export default ServerList;