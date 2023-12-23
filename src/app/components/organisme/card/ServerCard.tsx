import React from 'react';
import DataEmpty from '@/app/components/template/handling/DataEmpty';
import CardDashboard from '@/app/components/organisme/card/Dashboard';

async function ServerCard() {
  const response = await fetch(
    'http://localhost:3000/api/dashboard?option=pesanan&value=Kirim',
    {
      method: "GET",
    }
  )
  if( !response.ok ) {
    return <h1>Error</h1>
  }

  const data = await response.json()

  console.log( data.data )
  if( data.data.length === 0 ) {
    return <DataEmpty/>
  }
  const notifyMonth = data.data
  // console.log(notifyMonth)
  return (
    <CardDashboard notifyMonth={ notifyMonth }/>
  );
}

export default ServerCard;